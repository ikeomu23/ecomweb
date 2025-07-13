"use client";
import { useState } from "react";

const tabs = [
  { label: "Students", value: "students" },
  { label: "Teachers", value: "teachers" },
  { label: "Parents", value: "parents" },
  { label: "Classes", value: "classes" },
  { label: "Subjects", value: "subjects" },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <div className="flex gap-2 border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 font-medium rounded-t transition-colors text-sm border-b-2 ${
              activeTab === tab.value
                ? "border-blue-600 text-blue-700 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white/90 rounded shadow p-6 min-h-[300px]">
        {/* Render children or tab content here */}
        {children}
      </div>
    </div>
  );
}
