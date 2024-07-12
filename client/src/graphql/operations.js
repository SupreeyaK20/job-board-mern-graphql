import { gql } from "@apollo/client";

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    createdDate
    description
    title
    company {
      id
      name
    }
  }
`;

export const getJobById = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const getAllJobs = gql`
  query Jobs {
    jobs {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const getCompanyById = gql`
  query CompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        ...JobDetail
      }
    }
  }
  ${jobDetailFragment}
`;

export const createJob = gql`
  mutation createJob($input: CreateJobInput!) {
    createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const deleteJob = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id) {
      title
    }
  }
`;