import { connection } from "./connection.js";

const JOB = () => connection.table("job");

export async function getJobs() {
  return await JOB().select();
}

export async function getJobById(id) {
  return await JOB().first().where({ id });
}
