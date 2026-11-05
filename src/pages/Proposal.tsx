import { Link } from "react-router-dom";
import { ArrowLeft, Check, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getDivision } from "@/data/divisions";
import { enquiryRef, readLastEnquiry } from "@/lib/enquiries";

const models = [
  { title: "Fixed-scope project", text: "One clear quote for an agreed scope, paid by milestone." },
  { title: "Monthly retainer", text: "A set monthly fee for ongoing marketing, support or development." },
  { title: "Student plans", text: "Basic, Popular and Advance plans for final-year and academic projects." },
];

const Proposal = () => {
  const last = readLastEnquiry();
  const division = last ? getDivision(last.divisionId) : undefined;
  const process = division?.process ?? [
    "Discovery call to understand your requirement",
    "Scoped proposal with milestones and timelines",
    "Build in short, reviewable sprints",
    "Testing, handover and post-launch support",
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-glow opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-grid" aria-hidden />
      <Navbar />
      <main className="relative pt-28 md:pt-36 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="pill-label">{last ? `Request ${enquiryRef(last.id)}` : "Your proposal"}</span>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.08]">
            {last ? `Thanks, ${last.name.split(" ")[0]}.` : "How we work."}
            <br />
            <span className="text-ghost">Here's what happens next.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            {last
              ? `We've received your ${division?.name ?? "project"} request and will reply to ${last.email} within one working day.`
              : "Send us your requirement and we'll reply within one working day with a scoped proposal."}
          </p>

          <section className="mt-14">
            <h2 className="text-2xl font-semibold">Our process</h2>
            <ol className="mt-6 grid md:grid-cols-2 gap-4">
              {process.map((step, i) => (
                <li key={step} className="card-soft p-6">
                  <span className="pill-label">Step {String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-semibold">Pricing</h2>
            <p className="mt-2 text-muted-foreground">
              Every quote is tailored to your scope — no hidden fees, and you approve the price before work starts.
            </p>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {models.map((m) => (
                <div key={m.title} className="card-soft p-6">
                  <Check size={18} className="text-brand" />
                  <p className="mt-3 font-semibold">{m.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-14 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="hero" className="h-12 px-7 gap-2">
              <Link to="/"><ArrowLeft size={16} /> Back to home</Link>
            </Button>
            <Button asChild variant="hero-outline" className="h-12 px-7 gap-2">
              <a href="mailto:deplorixtechnologies@gmail.com"><Mail size={16} /> Email us</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Proposal;
