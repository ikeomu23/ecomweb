import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-blue-700">
        Welcome to the Student Progress Tracker
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        A modern platform for Super Admins, Teachers, and Parents to manage
        students, classes, and track academic performance with ease.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="/admin"
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        >
          Super Admin
        </a>
        <a
          href="/teacher"
          className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition"
        >
          Teacher
        </a>
        <a
          href="/parent"
          className="bg-purple-600 text-white px-6 py-3 rounded shadow hover:bg-purple-700 transition"
        >
          Parent
        </a>
      </div>
    </main>
  );
}
