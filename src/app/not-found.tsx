/**
 * NotFound page component.
 *
 * Renders a user-friendly 404 error page when a requested resource is not found.
 * Displays a message and provides a link to return to the home page.
 *
 * @returns {JSX.Element} The rendered NotFound page.
 */
import Link from "next/link";
import notFound from "../../public/404.svg";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  rounded-lg">
      <Image className="w-[30rem]"  src={notFound} alt="404 not found" />
      <p className="mb-6 text-xl">Could not find requested resource</p>
      <Link
        href="/"
        className="w-40 h-10 font-semibold text-white  flex justify-center items-center rounded-lg bg-primary hover:bg-primary/90"
      >
        Return Home
      </Link>
    </div>
  );
}
