import { connection } from "./connection.js";

const COMPANY = () => connection.table("company");

export async function getCompany(id) {
  return await COMPANY().first().where({ id });
}
