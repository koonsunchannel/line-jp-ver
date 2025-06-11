
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AccountDetailPage } from "./pages/AccountDetailPage";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="account/:id" element={<AccountDetailPage />} />
                <Route path="organizer" element={<OrganizerDashboard />} />
                <Route path="admin" element={<AdminDashboard />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
