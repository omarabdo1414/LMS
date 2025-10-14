/**
 * NotFound page component.
 *
 * Renders a user-friendly 404 error page when a requested resource is not found.
 * Displays a message and provides a link to return to the home page.
 *
 * @returns {JSX.Element} The rendered NotFound page.
 */
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md text-center">
            <h2 className="text-3xl font-bold mb-4 text-red-600">Not Found</h2>
            <p className="mb-6 text-gray-700">Could not find requested resource</p>
            <Link
                href="/"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Return Home
            </Link>
            </div>
        </div>
    );
}