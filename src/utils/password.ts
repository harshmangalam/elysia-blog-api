import { hash, compare } from "bcrypt";
async function hashPassword(password: string) {
  return hash(password, 12);
}

async function comparePassword(password: string, encryptedPassword: string) {
  return compare(password, encryptedPassword);
}

export { hashPassword, comparePassword };
