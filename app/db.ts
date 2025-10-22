'use server';
import { neon } from '@neondatabase/serverless';
import { generateReferralCode } from './utils';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function getUserByEmail(email: string) {
  const users = await sql`SELECT * FROM users WHERE email = ${email}`;
  return users.length > 0 ? users[0] : null;
}

export async function createUser(email: string, password: string) {
    const referralCode = generateReferralCode();
    const user = await sql`INSERT INTO users (email, password, referral_code) VALUES (${email}, ${password}, ${referralCode}) RETURNING *`;
    return user[0];
}
