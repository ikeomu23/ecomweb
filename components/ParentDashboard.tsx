"use client";
import { AcademicCapIcon, UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

// Dummy data for demonstration
const students = [
  { id: 1, name: "Jane Johnson", class: "JSS1" },
  { id: 2, name: "Tom Johnson", class: "JSS2" },
];

const parent = {
  id: 1,
  name: "Mary Johnson",
  email: "mary@example.com",
  phone: "08012345678",
  studentIds: [1, 2],
};

const notifications = [
  "PTA meeting next week",
  "School fees due soon",
];

export default function ParentDashboard() {
  const [search, setSearch] = useState("");
  const filteredStudentIds = parent.studentIds.filter(sid => {
    const student = students.find(s => s.id === sid);
    return student && student.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-1">Welcome, {parent.name}!</h2>
        <div className="text-gray-500 text-sm">You have {parent.studentIds.length} {parent.studentIds.length === 1 ? "child" : "children"} enrolled.</div>
      </div>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="text-gray-700 text-sm flex items-center gap-2">
          <UserCircleIcon className="w-5 h-5 text-purple-400" />
          {parent.email} | {parent.phone}
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <MagnifyingGlassIcon className="w-5 h-5 text-purple-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search children..."
            className="px-2 py-1 border rounded-lg text-sm w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-purple-300"
            aria-label="Search children"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {filteredStudentIds.length === 0 && (
          <div className="col-span-2 text-center text-gray-400">No children found.</div>
        )}
        {filteredStudentIds.map(sid => {
          const student = students.find(s => s.id === sid);
          return student ? (
            <Link
              key={sid}
              href={`/parent/student/${student.id}`}
              className="block bg-gradient-to-br from-purple-50 via-white to-purple-100/80 rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition group focus:outline-none focus:ring-2 focus:ring-purple-400"
              tabIndex={0}
              aria-label={`View dashboard for ${student.name}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <AcademicCapIcon className="w-7 h-7 text-purple-500 group-hover:text-purple-700 transition" />
                <div>
                  <div className="font-bold text-purple-800 text-lg">{student.name}</div>
                  <div className="text-xs text-gray-500">Class: {student.class}</div>
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-purple-200/70 text-purple-900 px-3 py-1 rounded-lg text-xs font-semibold shadow-sm border border-purple-100">View Dashboard</span>
              </div>
            </Link>
          ) : null;
        })}
      </div>
      <div className="bg-white rounded-xl shadow p-4 border border-purple-50">
        <h4 className="font-semibold text-purple-700 mb-2">Notifications</h4>
        <ul className="text-sm text-gray-600 list-disc pl-5">
          {notifications.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
