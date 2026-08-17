import { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { divisions } from "@/data/divisions";

export const INQUIRY_EVENT = "deplorix:inquiry";

export const openInquiry = (divisionId: string) => {
  window.dispatchEvent(new CustomEvent(INQUIRY_EVENT, { detail: divisionId }));
};

const topicFor = (divisionId: string) => {
  const d = divisions.find((x) => x.id === divisionId);
  return d ? `${d.name} — ${d.tagline}` : "General enquiry";
};

const followUpFor = (divisionId: string) => {
  switch (divisionId) {
    case "tech":
      return "We'll reply with a scoping call slot and a rough build estimate.";
    case "digital":
      return "We'll reply with a strategy call slot and a sample content plan.";
    case "projects":
      return "We'll reply with project options matched to your syllabus and timeline.";
    case "bps":
      return "We'll reply with a process call slot and a staffing outline.";
    case "training":
      return "We'll reply with the next batch dates and the curriculum outline.";
    default:
      return "We'll reply within one working day.";
  }
};

const ServiceInquiryForm = () => {
  const [divisionId, setDivisionId] = useState(divisions[0].id);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (divisions.some((d) => d.id === id)) setDivisionId(id);
      document.getElementById("service-inquiry")?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener(INQUIRY_EVENT, handler);

    const param = new URLSearchParams(window.location.search).get("division");
    if (param && divisions.some((d) => d.id === param)) {
      setDivisionId(param);
      if (window.location.hash === "#service-inquiry") {
        setTimeout(
          () => document.getElementById("service-inquiry")?.scrollIntoView({ behavior: "smooth", block: "center" }),
          300
        );
      }
    }

    return () => window.removeEventListener(INQUIRY_EVENT, handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry — ${topicFor(divisionId)}`);
    const body = encodeURIComponent(
      [
        `Division: ${topicFor(divisionId)}`,
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        "",
        "Details:",
        form.message,
        "",
        `Expected follow-up: ${followUpFor(divisionId)}`,
      ].join("\n")
    );
    window.location.href = `mailto:deplorixtechnologies@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatedSection>
      <div
        id="service-inquiry"
        className="scroll-mt-28 mt-16 max-w-4xl mx-auto rounded-3xl bg-background border border-border/50 p-8 md:p-10"
      >
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Tell us what you need
        </h3>
        <p className="mt-3 text-base text-muted-foreground">
          Pick a division and we'll route your request to the right team.{" "}
          <span className="text-foreground font-medium">{followUpFor(divisionId)}</span>
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {divisions.map((d) => {
            const isActive = d.id === divisionId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDivisionId(d.id)}
                className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 border ${
                  isActive
                    ? "bg-foreground text-background border-transparent font-semibold"
                    : "text-muted-foreground hover:text-foreground border-border/60 font-medium"
                }`}
              >
                {d.short}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <Label htmlFor="inq-topic" className="text-sm font-medium">Inquiry topic</Label>
            <Input id="inq-topic" value={topicFor(divisionId)} readOnly className="mt-1.5 bg-secondary/60" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="inq-name" className="text-sm font-medium">Full name</Label>
              <Input
                id="inq-name"
                required
                className="mt-1.5"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="inq-email" className="text-sm font-medium">Email address</Label>
              <Input
                id="inq-email"
                type="email"
                required
                className="mt-1.5"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="inq-phone" className="text-sm font-medium">Phone number</Label>
            <Input
              id="inq-phone"
              type="tel"
              required
              className="mt-1.5"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="inq-message" className="text-sm font-medium">What do you need?</Label>
            <Textarea
              id="inq-message"
              required
              rows={4}
              className="mt-1.5"
              placeholder="A short description of your requirement, timeline and budget range."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <Button type="submit" size="lg" className="rounded-full gap-2 font-semibold">
            Send request <ArrowRight size={16} />
          </Button>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default ServiceInquiryForm;
