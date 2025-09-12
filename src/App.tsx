import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useYandexMetrika } from "./hooks/useYandexMetrika";
import DriverIntake from "./components/DriverIntake";

const queryClient = new QueryClient();

function RoutesWithAnalytics() {
  useYandexMetrika(); // <-- now safely inside <BrowserRouter>
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/driver-intake" element={<DriverIntake />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RoutesWithAnalytics />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
