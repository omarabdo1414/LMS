import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  return <>{children}</>;
}
