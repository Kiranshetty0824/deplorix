import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import TermsAndConditions from "./pages/TermsAndConditions.tsx";

import DivisionWork from "./pages/DivisionWork.tsx";
import AdminAuth from "./pages/AdminAuth.tsx";
import AdminCertificates from "./pages/AdminCertificates.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/work/:divisionId" element={<DivisionWork />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/admin/login" element={<AdminAuth />} />
          <Route path="/admin/certificates" element={<AdminCertificates />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
