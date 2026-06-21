import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, XCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VerificationCard from "@/components/VerificationCard";
import { supabase } from "@/integrations/supabase/client";
import type { Certificate } from "@/lib/certificate";

type State = "idle" | "loading" | "found" | "notfound";

const VerifyCertificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(id ?? "");
  const [state, setState] = useState<State>("idle");
  const [cert, setCert] = useState<Certificate | null>(null);

  const lookup = async (rawId: string) => {
    const trimmed = rawId.trim();
    if (!trimmed) return;
    setState("loading");
    setCert(null);
    const { data } = await supabase
      .from("internship_certificates")
      .select("certificate_id, student_name, domain, college_name, internship_start_date, internship_end_date, issue_date, certificate_status")
      .ilike("certificate_id", trimmed)
      .maybeSingle();
    if (data) {
      setCert(data as Certificate);
      setState("found");
    } else {
      setState("notfound");
    }
  };

  useEffect(() => {
    if (id) {
      setQuery(id);
      lookup(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const cid = query.trim();
    navigate(`/verify/${cid}`);
    lookup(cid);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              DeploriX Technologies
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Internship Certificate Verification
            </h1>
            <p className="mt-4 text-muted-foreground">
              Confirm the authenticity of any DeploriX internship certificate by entering its Certificate ID below.
            </p>
          </motion.div>

          <form
            onSubmit={onSubmit}
            className="bg-card border border-border rounded-2xl p-3 md:p-4 shadow-[var(--shadow-soft)] flex flex-col md:flex-row gap-3"
          >
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Certificate ID"
                className="border-0 shadow-none focus-visible:ring-0 px-0 text-base"
                aria-label="Certificate ID"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="md:w-auto">
              Verify Certificate
            </Button>
          </form>

          <div className="mt-8">
            {state === "loading" && (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin mr-2" /> Verifying…
              </div>
            )}

            {state === "found" && cert && <VerificationCard cert={cert} />}

            {state === "notfound" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] p-8 text-center"
              >
                <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-7 w-7" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Certificate Not Found</h2>
                <p className="mt-2 text-muted-foreground">
                  Please check the Certificate ID and try again.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyCertificate;
