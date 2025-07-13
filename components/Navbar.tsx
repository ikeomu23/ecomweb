import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
      <div className="text-2xl font-extrabold tracking-tight text-blue-700 select-none">
        Student Progress Tracker
      </div>
      <div className="flex gap-2 md:gap-4">
        <Link href="/" className="rounded px-3 py-1.5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium">Home</Link>
        <Link href="/admin" className="rounded px-3 py-1.5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium">Admin</Link>
        <Link href="/teacher" className="rounded px-3 py-1.5 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors text-sm font-medium">Teacher</Link>
        <Link href="/parent" className="rounded px-3 py-1.5 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors text-sm font-medium">Parent</Link>
      </div>
    </nav>
  );
}
