import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <h2 className="text-6xl font-semibold">Page Not Found</h2>
      <p className="text-lg mt-4 text-gray-500">
        Could not find requested resource
      </p>
      <Link href="/" className="mt-4">
        <Button className="rounded-sm bg-cyan-500 ">Return Home</Button>
      </Link>
    </div>
  );
}
