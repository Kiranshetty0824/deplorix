import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { enquiryRef } from "@/lib/enquiries";
import type { Tables } from "@/integrations/supabase/types";

type Enquiry = Tables<"enquiries">;
const statuses = ["all", "new", "replied", "closed"] as const;

const AdminEnquiries = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState<(typeof statuses)[number]>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const load = async () => {
    const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return navigate("/admin/login", { replace: true });
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      if (admin) load();
      else setLoading(false);
    })();
  }, [navigate]);

  const visible = useMemo(() => rows.filter((r) => filter === "all" || r.status === filter), [rows, filter]);
  const selected = rows.find((r) => r.id === selectedId) ?? null;

  useEffect(() => setNotes(selected?.admin_notes ?? ""), [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = async (id: string, patch: Partial<Enquiry>) => {
    const { error } = await supabase.from("enquiries").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    toast.success("Saved");
  };

  const reply = (e: Enquiry) => {
    const subject = encodeURIComponent(`Re: ${e.topic} (${enquiryRef(e.id)})`);
    const body = encodeURIComponent(`Hi ${e.name.split(" ")[0]},\n\nThanks for reaching out to DeploriX.\n\n\n\n---\nYour message:\n${e.message ?? ""}`);
    window.location.href = `mailto:${e.email}?subject=${subject}&body=${body}`;
    update(e.id, { status: "replied", replied_at: new Date().toISOString() });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="pill-label">Client portal</span>
              <h1 className="mt-4 text-3xl md:text-4xl font-semibold">Enquiries</h1>
            </div>
            <Link to="/admin/certificates" className="text-sm text-muted-foreground hover:text-foreground">Certificates →</Link>
          </div>

          {loading ? (
            <Loader2 className="mt-10 animate-spin" />
          ) : !isAdmin ? (
            <p className="mt-10 text-muted-foreground">This account doesn't have admin access.</p>
          ) : (
            <>
              <div className="mt-6 flex gap-2">
                {statuses.map((s) => (
                  <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-1.5 text-sm border ${filter === s ? "bg-primary text-primary-foreground border-transparent" : "border-border text-muted-foreground"}`}>
                    {s[0].toUpperCase() + s.slice(1)} ({s === "all" ? rows.length : rows.filter((r) => r.status === s).length})
                  </button>
                ))}
              </div>
              <div className="mt-6 grid lg:grid-cols-[1fr_1.2fr] gap-5">
                <ul className="space-y-2">
                  {visible.length === 0 && <li className="text-muted-foreground">No enquiries yet.</li>}
                  {visible.map((e) => (
                    <li key={e.id}>
                      <button onClick={() => setSelectedId(e.id)} className={`w-full text-left card-soft p-4 ${selectedId === e.id ? "ring-2 ring-brand" : ""}`}>
                        <div className="flex justify-between gap-2">
                          <p className="font-semibold truncate">{e.name}</p>
                          <span className={`text-xs rounded-full px-2 py-0.5 ${e.status === "new" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>{e.status}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{e.topic}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(e.created_at).toLocaleString()}</p>
                      </button>
                    </li>
                  ))}
                </ul>
                {selected ? (
                  <div className="card-soft p-6 h-fit">
                    <p className="text-xs text-muted-foreground">{enquiryRef(selected.id)} · {selected.source}</p>
                    <h2 className="mt-1 text-2xl font-semibold">{selected.name}</h2>
                    <p className="text-sm text-muted-foreground">{selected.topic}{selected.service ? ` — ${selected.service}` : ""}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1"><Mail size={14} />{selected.email}</span>
                      {selected.phone && <span className="flex items-center gap-1"><Phone size={14} />{selected.phone}</span>}
                    </div>
                    <p className="mt-5 whitespace-pre-wrap text-foreground/90">{selected.message || "No message."}</p>
                    <Textarea className="mt-5" rows={3} placeholder="Private notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="hero" onClick={() => reply(selected)} className="gap-2"><Mail size={16} />Reply</Button>
                      <Button variant="hero-outline" onClick={() => update(selected.id, { admin_notes: notes || null })}>Save notes</Button>
                      <Button variant="hero-outline" onClick={() => update(selected.id, { status: selected.status === "closed" ? "new" : "closed" })}>
                        {selected.status === "closed" ? "Reopen" : "Close"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Select an enquiry to read and reply.</p>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminEnquiries;
