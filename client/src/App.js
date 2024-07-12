import { Routes, Route, useNavigate } from "react-router";
import CreateJobPage from "./pages/createJobPage";
import HomePage from "./pages/homePage";
import JobPage from "./pages/jobPage";
import CompanyPage from "./pages/companyPage";
import NavBar from "./components/navBar";
import './App.css'
import LoginPage from "./pages/loginPage";
import { useState } from "react";
import { getUser } from "./graphql/auth/auth";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser)

  const handleLogin = (user) => {
    setUser(user);
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <NavBar user={user} onLogout={handleLogout}/>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
        <Route index path="/" element={<HomePage user={user}/>} />
        <Route path="/companies/:companyId" element={<CompanyPage user={user}/>} />
        <Route path="/jobs" element={<CreateJobPage />} />
        <Route path="/jobs/:jobId" element={<JobPage />} />

      </Routes>
    </>
  );
}

export default App;
