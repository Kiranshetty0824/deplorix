import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute inset-0 bg-glow" aria-hidden />
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="relative text-center">
        <span className="pill-label">Error 404</span>
        <h1 className="mt-5 text-6xl md:text-8xl font-semibold tracking-tight text-foreground">
          Lost<span className="text-brand">.</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">This page doesn't exist — let's get you back.</p>
        <Button asChild variant="hero" className="mt-8 h-12 px-7 gap-2">
          <Link to="/">
            <ArrowLeft size={16} /> Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
