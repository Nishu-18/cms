// NO "use client" here — this is a server component
import { getAuthSession } from "../../lib/auth";
import AuthProviderClient from "./AuthProviderClient";

export default async function ServerAuthProvider({ children }) {
  const session = await getAuthSession(); // ✅ Server-only call

  return <AuthProviderClient session={session}>{children}</AuthProviderClient>;
}
