import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col text-center items-center m-auto">
      <h2>Not Found</h2>
      <Link href="/">Return Home</Link>
    </div>
  );
}
