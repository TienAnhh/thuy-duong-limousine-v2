import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE, SessionPayload } from "./auth";

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function requireSuperAdmin(): Promise<SessionPayload | null> {
  const session = await getSession();
  if (!session || session.role !== "superadmin") return null;
  return session;
}
