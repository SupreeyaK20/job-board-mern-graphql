import {
  convertToISO,
  notFoundError,
  unauthorizedError,
} from "./helpers/helper.js";
import { getCompany } from "./services/companies.js";
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  getJobsByCompany,
  updateJob,
} from "./services/jobs.js";

export const resolvers = {
  Query: {
    job: async (_, { id }) => {
      const job = await getJobById(id);
      if (!job) {
        throw notFoundError("No Job found with id " + id);
      }
      return job;
    },

    jobs: () => getJobs(),

    company: async (_, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError("No Company found with id " + id);
      }
      return company;
    },
  },

  Mutation: {
    createJob: (_arg, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError("Missing Authentication " + user);
      }
      return createJob({ companyId: user.companyId, title, description });
    },

    updateJob: async (
      _arg,
      { input: { id, title, description } },
      { user }
    ) => {
      if (!user) {
        throw unauthorizedError("Missing Authentication " + user);
      }

      const job = await updateJob({
        id,
        companyId: user.companyId,
        title,
        description,
      });
      if (!job) {
        throw notFoundError("No Job Found " + id);
      }
      return job;
    },

    deleteJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError("Missing authentication " + user);
      }

      const job = await deleteJob(id, user.companyId);
      if (!job) {
        throw notFoundError("No Job found with id " + id);
      }
      return job;
    },
  },

  Job: {
    company: (job, __, { companyLoader }) => {
      return companyLoader.load(job.companyId)
    },
    createdDate: (job) => convertToISO(job.createdAt),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },
};
