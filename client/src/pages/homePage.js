import { useState } from "react";
import { Typography } from "antd";
import JobList from "../components/jobList";
import { useJobs } from "../graphql/hooks";
import Loader from "../components/loader";
// import PaginationBar from '../components/PaginationBar';
const { Title } = Typography;

const JOBS_PER_PAGE = 7;

function HomePage({ user }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, loading, error, refetch } = useJobs();

  //   const totalPages = Math.ceil(jobs.totalCount / JOBS_PER_PAGE);
  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <Title level={2} style={{ textAlign: "center" }}>
            Job Board
          </Title>
          {/* 
            Uncomment this when you're ready to use the PaginationBar
            <PaginationBar 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage}
            /> 
          */}
          <JobList jobs={jobs} user={user} refetch={refetch}/>
        </>
      )}
    </>
  );
}

export default HomePage;
