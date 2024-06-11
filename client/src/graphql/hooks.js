import { useQuery, useMutation } from "@apollo/client";
import { getAllJobs, getCompanyById, getJobById } from "./operations";

export const useJobs = () => {
  const { data, error, loading } = useQuery(getAllJobs);
  return { jobs: data?.jobs, loading, error: Boolean(error) };
};

export const useJob = (id) => {
  const { data, error, loading } = useQuery(getJobById, {
    variables: { id },
  });
  return { job: data?.job, loading, error: Boolean(error) };
};

export const useCompany = (id) => {
  const { data, error, loading } = useQuery(getCompanyById, {
    variables: { id },
  });
  return { company: data?.company, loading, error: Boolean(error) };
};
