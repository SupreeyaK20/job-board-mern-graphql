import { useState } from "react";
import { Typography } from "antd";
import JobList from "../components/jobList";
import { useJobs } from "../graphql/hooks";
// import PaginationBar from '../components/PaginationBar';
const { Title } = Typography;

const JOBS_PER_PAGE = 7;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }

  //   const totalPages = Math.ceil(jobs.totalCount / JOBS_PER_PAGE);
  return (
    <div style={{ margin: 20 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Job Board
      </Title>
      {/* <PaginationBar currentPage={currentPage} totalPages={totalPages}
        onPageChange={setCurrentPage}
      /> */}
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
