import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./domain/contexts";

import LoginPage from "./pages/LoginPage";
import ClassGroupPage from "./pages/ClassGroupPage.jsx";
import AccueilParent from "./components/parents/accueilParent.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/parent"
            element={
              <ProtectedRoute>
                <AccueilParent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/classes/:studentId"
            element={
              <ProtectedRoute>
                <ClassGroupPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

