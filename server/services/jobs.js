import { connection } from "./connection.js";
import { v4 as uniqueId } from 'uuid'

const JOB = () => connection.table("job");

export async function getJobs() {
  return await JOB().select();
}

export async function getJobById(id) {
  return await JOB().first().where({ id });
}

export async function getJobsByCompany(companyId) {
  return await JOB().select().where({ companyId });
}

export async function createJob({companyId, title, description}) {
  const job= {
    id: uniqueId(),
    companyId,
    title,
    description,
    createdAt: new Date().toISOString(),
  }

  await JOB().insert(job);
  return job;
}

export async function updateJob({ id, companyId, title, description }) {
  const job = await JOB().first().where({ id, companyId });
  if (!job) {
    return null
  }

  const updatedJobData = {
    title,
    description,
    createdAt: new Date().toISOString()
  };

  await JOB().update(updatedJobData).where({ id });
  return { ...job, ...updatedJobData };
}

export async function deleteJob(id, companyId) {
  const job = await JOB().first().where({ id, companyId });
  if (!job) {
    return null
  }
  
  await JOB().delete().where({ id });
  return job;
}

