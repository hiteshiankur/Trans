import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import VerifyOtp from "@/pages/VerifyOtp";
import Employees from "@/pages/Employees";
import Events from "@/pages/Events";
import CreateEvent from "@/pages/CreateEvent";
import EventDetails from "@/pages/EventDetails";
import Invitations from "@/pages/Invitations";
import InvitationDetails from "@/pages/InvitationDetails";
import Contracts from "@/pages/Contracts";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

// Landing Page Components
import LandingHome from "@/pages/landing/Home";
import LandingAbout from "@/pages/landing/AboutUs";
import LandingServices from "@/pages/landing/Services";
import LandingContact from "@/pages/landing/ContactUs";

// Admin Landing Page Components
import HeroSection from "@/pages/admin/landing/HeroSection";
import ServicesSection from "@/pages/admin/landing/ServicesSection";
import SafetySection from "@/pages/admin/landing/SafetySection";
import StatsSection from "@/pages/admin/landing/StatsSection";
import CTASection from "@/pages/admin/landing/CTASection";

// Admin About Page Components
import AboutHeroSection from "@/pages/admin/about/HeroSection";
import AboutFeaturesSection from "@/pages/admin/about/FeaturesSection";
import AboutMissionSection from "@/pages/admin/about/MissionSection";
import AboutVisionSection from "@/pages/admin/about/VisionSection";
import AboutObjectivesSection from "@/pages/admin/about/ObjectivesSection";

// Admin Services Page Components
import ServicesHeroSection from "@/pages/admin/services/HeroSection";
import ServicesTransportSolutions from "@/pages/admin/services/TransportSolutions";
import ServicesDataAnalysis from "@/pages/admin/services/DataAnalysis";
import ServicesHardwareLogistics from "@/pages/admin/services/HardwareLogistics";
import ServicesFleetManagement from "@/pages/admin/services/FleetManagement";

// Admin Contact Page Components
import ContactHeroSection from "@/pages/admin/contact/HeroSection";
import ContactInfo from "@/pages/admin/contact/ContactInfo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            
            {/* Landing Page routes */}
            <Route path="/about" element={<LandingAbout />} />
            <Route path="/services" element={<LandingServices />} />
            <Route path="/contact" element={<LandingContact />} />
            
            {/* Protected routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/employees" element={
              <ProtectedRoute requiredRoles={['admin', 'superAdmin']}>
                <Layout>
                  <Employees />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/events" element={
              <ProtectedRoute requiredRoles={['admin', 'superAdmin']}>
                <Layout>
                  <Events />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/events/create" element={
              <ProtectedRoute requiredRoles={['admin', 'superAdmin']}>
                <Layout>
                  <CreateEvent />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/events/edit/:id" element={
              <ProtectedRoute requiredRoles={['admin', 'superAdmin']}>
                <Layout>
                  <CreateEvent />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/events/:id" element={
              <ProtectedRoute>
                <Layout>
                  <EventDetails />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/invitations" element={
              <ProtectedRoute requiredRoles={['employee', 'hr']}>
                <Layout>
                  <Invitations />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/invitations/:id" element={
              <ProtectedRoute requiredRoles={['employee', 'hr']}>
                <Layout>
                  <InvitationDetails />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/contracts" element={
              <ProtectedRoute requiredRoles={['employee', 'hr']}>
                <Layout>
                  <Contracts />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Admin Landing Page Management Routes */}
            <Route path="/admin/landing/hero" element={
              <ProtectedRoute>
                <Layout>
                  <HeroSection />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/landing/services" element={
              <ProtectedRoute>
                <Layout>
                  <ServicesSection />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/landing/safety" element={
              <ProtectedRoute>
                <Layout>
                  <SafetySection />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/landing/stats" element={
              <ProtectedRoute>
                <Layout>
                  <StatsSection />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/landing/cta" element={
              <ProtectedRoute>
                <Layout>
                  <CTASection />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Admin About Page Management Routes */}
            <Route path="/admin/about/hero" element={
              <ProtectedRoute>
                <Layout>
                  <AboutHeroSection />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/about/features" element={
              <ProtectedRoute>
                <Layout>
                  <AboutFeaturesSection />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/about/mission" element={
              <ProtectedRoute>
                <Layout>
                  <AboutMissionSection />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/about/vision" element={
              <ProtectedRoute>
                <Layout>
                  <AboutVisionSection />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/about/objectives" element={
              <ProtectedRoute>
                <Layout>
                  <AboutObjectivesSection />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Admin Services Page Management Routes */}
            <Route path="/admin/services/hero" element={
              <ProtectedRoute>
                <Layout>
                  <ServicesHeroSection />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/services/transport-solutions" element={
              <ProtectedRoute>
                <Layout>
                  <ServicesTransportSolutions />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/services/data-analysis" element={
              <ProtectedRoute>
                <Layout>
                  <ServicesDataAnalysis />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/services/hardware-logistics" element={
              <ProtectedRoute>
                <Layout>
                  <ServicesHardwareLogistics />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/services/fleet-management" element={
              <ProtectedRoute>
                <Layout>
                  <ServicesFleetManagement />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Admin Contact Page Management Routes */}
            <Route path="/admin/contact/hero" element={
              <ProtectedRoute>
                <Layout>
                  <ContactHeroSection />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/contact/info" element={
              <ProtectedRoute>
                <Layout>
                  <ContactInfo />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Fallback routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
