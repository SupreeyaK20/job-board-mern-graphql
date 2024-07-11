import { connection } from "./connection.js";
import DataLoader from 'dataloader'

const COMPANY = () => connection.table("company");

export async function getCompany(id) {
  return await COMPANY().first().where({ id });
}

export function createCompanyLoader() {
  return new DataLoader(async (ids) => {
    const companies = await COMPANY().select().whereIn('id', ids);
    return ids.map((id) => companies.find((company) => company.id === id));
  });
}
