import { convertToISO, notFoundError, unauthorizedError } from "./helpers/helper.js";
import { getCompany } from "./services/companies.js";
import { createJob, getJobById, getJobs, getJobsByCompany } from "./services/jobs.js";

export const resolvers = {
  Query: {
    job: async(_, { id }) => {
      const job = await getJobById(id);
      if (!job) {
        throw notFoundError('No Job found with id ' + id);
      }
      return job;
    },

    jobs: () => getJobs(),

    company: async(_, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError('No Company found with id ' + id);
      }
      return company;
    },
  },

  Mutation:{
    createJob: (_arg, { input: { title, description } }, { user }) => {
      if(!user){
        throw unauthorizedError('Missing Authentication' + user);
      }
      return createJob({ companyId: user.companyId, title, description})
    }
  },
  
  Job: {
    company: (job) => getCompany(job.companyId),
    createdDate: (job) => convertToISO(job.createdAt),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  }
};

