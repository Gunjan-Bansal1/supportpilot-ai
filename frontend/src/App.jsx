import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RoleProvider } from "./context/RoleContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Layout from "./components/layout/Layout";

import ChatPage from "./pages/ChatPage";
import UploadPage from "./pages/UploadPage";
import AdminDashboard from "./pages/AdminDashboard";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
            },
          }}
        />
        <Routes>
          {/* Main Layout */}
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<ChatPage />}
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute redirect={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}

export default App;