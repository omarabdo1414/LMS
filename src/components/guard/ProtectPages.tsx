
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GetUser from "../GetUser/GetUser";
/*
protect all routes in application except auth and welcome page
 */
export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  return <GetUser>{children}</GetUser>;
}
