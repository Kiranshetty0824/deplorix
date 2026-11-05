import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { submitEnquiry } from "@/lib/enquiries";
import { getServiceContext } from "@/lib/service-context";
import { getDivision } from "@/data/divisions";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StartProjectDialog = ({ open, onOpenChange }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setSending(true);
    setError(null);
    const ctx = getServiceContext();
    const division = getDivision(ctx.divisionId);
    try {
      await submitEnquiry({
        divisionId: division?.id ?? "general",
        topic: division ? `${division.name} — ${division.tagline}` : "New project",
        service: ctx.service ?? null,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: null,
        source: "start_project_dialog",
      });
      onOpenChange(false);
      navigate("/proposal");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start a Project</DialogTitle>
          <DialogDescription>
            Tell us about yourself and we'll reach out to discuss your project.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="proj-name">Full Name</Label>
            <Input
              id="proj-name"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="proj-email">Email Address</Label>
            <Input
              id="proj-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="proj-phone">Phone Number</Label>
            <Input
              id="proj-phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={sending || form.name.trim().length < 2 || !form.email.includes("@") || form.phone.trim().length < 8}
          >
            {sending ? "Sending…" : "Submit Inquiry"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartProjectDialog;
