import { connection } from "./connection.js";

const USER = () => connection.table("user");

export async function getUser(id) {
  return await USER().first().where({ id });
}

export async function getUserByEmail(email) {
  return await USER().first().where({ email });
}