import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import GroupDetails from "./pages/GroupDetails";
import GroupParticipants from "./pages/GroupParticipants";
import GroupExpenses from "./pages/GroupExpenses";
import GroupBalances from "./pages/GroupBalances";
import GroupSettlements from "./pages/GroupSettlements";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Group with nested routes */}
      <Route path="/groups/:groupId" element={<GroupDetails />}>
        <Route index element={<Navigate to="participants" replace />} />
        <Route path="participants" element={<GroupParticipants />} />
        <Route path="expenses" element={<GroupExpenses />} />
        <Route path="balances" element={<GroupBalances />} />
        <Route path="settlements" element={<GroupSettlements />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
