import { gql } from "@apollo/client";

export const getJobById = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      id
      description
      title
      createdDate
      company {
        id
        name
      }
    }
  }
`;

export const getAllJobs = gql`
  query Jobs {
    jobs {
      id
      title
      company {
        name
      }
      description
      createdDate
    }
  }
`;

export const getCompanyById = gql`
  query CompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
        description
        createdDate
      }
    }
  }
`;
