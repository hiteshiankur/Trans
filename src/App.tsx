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
import Employees from "@/pages/Employees";
import Events from "@/pages/Events";
import CreateEvent from "@/pages/CreateEvent";
import EventDetails from "@/pages/EventDetails";
import Invitations from "@/pages/Invitations";
import Contracts from "@/pages/Contracts";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/employees" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <Layout>
                  <Employees />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/events" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <Layout>
                  <Events />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/events/create" element={
              <ProtectedRoute requiredRoles={['admin']}>
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
            
            {/* Fallback routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
