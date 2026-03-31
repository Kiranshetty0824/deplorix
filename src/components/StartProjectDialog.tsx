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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StartProjectDialog = ({ open, onOpenChange }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = () => {
    const subject = encodeURIComponent("New Project Inquiry - DeploriX Technologies");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}`
    );
    window.location.href = `mailto:deplorixtechnologies@gmail.com?subject=${subject}&body=${body}`;
    onOpenChange(false);
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
          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={!form.name || !form.email || !form.phone}
          >
            Submit Inquiry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartProjectDialog;
