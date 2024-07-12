import { useQuery, useMutation } from "@apollo/client";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getCompanyById,
  getJobById,
} from "./operations";

export const useJobs = () => {
  const { data, error, loading, refetch } = useQuery(getAllJobs);
  return { jobs: data?.jobs, loading, error: Boolean(error), refetch };
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

export const useCreateJob = () => {
  const [createJobMutation, { loading }] = useMutation(createJob);

  const createNewJob = (title, description) => {
    return createJobMutation({ variables: { input: { title, description } } });
  };

  return { createNewJob, loading };
};

export const useDeleteJob = () => {
  const [deleteJobMutation, { loading }] = useMutation(deleteJob);
  const deleteJobById = (id) => {
    return deleteJobMutation({ variables: { id } });
  };
  return { deleteJobById, loading };
};