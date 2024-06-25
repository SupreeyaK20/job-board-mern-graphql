import { Routes, Route } from "react-router";
import CreateJobPage from "./pages/createJobPage";
import HomePage from "./pages/homePage";
import JobPage from "./pages/jobPage";
import CompanyPage from "./pages/companyPage";
import NavBar from "./components/navBar";
import './App.css'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/companies/:companyId" element={<CompanyPage />} />
        <Route path="/jobs" element={<CreateJobPage />} />
        <Route path="/jobs/:jobId" element={<JobPage />} />
      </Routes>
    </>
  );
}

export default App;
