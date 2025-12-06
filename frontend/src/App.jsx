import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddSubject from "./pages/AddSubject";
import AddSession from "./pages/AddSession";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Login />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/add-subject" element={<PrivateRoute><AddSubject/></PrivateRoute>} />
        <Route path="/add-session" element={<PrivateRoute><AddSession/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
