import { getCompany } from "./db/companies.js";
import { getJobById, getJobs, getJobsByCompany } from "./db/jobs.js";

export const resolvers = {
  Query: {
    job: (_, { id }) => getJobById(id),
    jobs: () => getJobs(),
    company: (_, { id }) => getCompany(id),
  },
  
  Job: {
    company: (job) => getCompany(job.companyId),
    createdDate: (job) => convertToISO(job.createdAt),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  }
};

function convertToISO(date) {
  return date.slice(0, "YYYY-MM-DD".length);
}
