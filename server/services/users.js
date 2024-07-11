import { connection } from "./connection.js";
import DataLoader from 'dataloader'

const USER = () => connection.table("user");

export async function getUser(id) {
  return await USER().first().where({ id });
}

export async function getUserByEmail(email) {
  return await USER().first().where({ email });
}

export function createUserLoader() {
  return new DataLoader(async (ids) => {
    const users = await USER().select().whereIn('id', ids);
    return ids.map((id) => users.find((company) => company.id === id));
  });
}