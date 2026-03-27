import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ChatScreen from "./screens/ChatScreen/ChatScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { useChat } from "./context/ContactContext";


function App() {
  const { currentUser } = useChat();


  return (
    <Routes>
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" replace /> : <LoginScreen />}
      />
      <Route
        path="/"
        element={currentUser ? <ChatScreen /> : <Navigate to="/login" replace />}
/>
      <Route
        path="/profile/:userId"
        element={currentUser ? <ProfileScreen /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default App;