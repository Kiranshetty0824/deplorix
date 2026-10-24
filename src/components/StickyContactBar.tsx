import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDivision } from "@/data/divisions";
import { useServiceContext } from "@/lib/service-context";
import { openInquiry } from "./ServiceInquiryForm";
import { trackEvent } from "@/lib/analytics";
import { type } from "@/lib/typography";

/**
 * Persistent contact CTA. Appears after the hero and carries whichever service
 * or division the visitor last engaged with into the enquiry form.
 */
const StickyContactBar = () => {
  const ctx = useServiceContext();
  const [visible, setVisible] = useState(false);
  const division = getDivision(ctx.divisionId);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        y + window.innerHeight > document.documentElement.scrollHeight - 700;
      const form = document.getElementById("service-inquiry");
      const formVisible = form
        ? form.getBoundingClientRect().top < window.innerHeight * 0.9 &&
          form.getBoundingClientRect().bottom > 0
        : false;
      setVisible(y > window.innerHeight * 0.8 && !nearBottom && !formVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!division) return null;

  const handleClick = () => {
    trackEvent("sticky_cta_click", { division: division.id, service: ctx.service });
    openInquiry(division.id, { service: ctx.service ?? division.name });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-24 left-4 right-4 md:bottom-6 md:left-0 md:right-0 z-40 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto flex max-w-xl items-center gap-3 md:gap-5 rounded-full border border-border/60 bg-background/90 backdrop-blur-md shadow-lg px-4 py-2.5 md:px-6 md:py-3">
            <div className="min-w-0 flex-1">
              <p className={`${type.caption} hidden sm:block`}>Talking about</p>
              <p className="truncate text-sm font-semibold text-foreground">
                {division.short}
                {ctx.service ? ` — ${ctx.service}` : ""}
              </p>
            </div>
            <Button
              size="sm"
              onClick={handleClick}
              className="rounded-full gap-1.5 font-semibold shrink-0"
            >
              Get a proposal <ArrowRight size={14} />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyContactBar;
