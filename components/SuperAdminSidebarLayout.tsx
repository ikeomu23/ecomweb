"use client";
import { useState } from "react";
import { UserGroupIcon, AcademicCapIcon, UsersIcon, BookOpenIcon, ClipboardIcon, ChartBarIcon, AdjustmentsHorizontalIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const sections = [
  { label: "Students", value: "students", icon: UsersIcon },
  { label: "Teachers", value: "teachers", icon: AcademicCapIcon },
  { label: "Parents", value: "parents", icon: UserGroupIcon },
  { label: "Classes", value: "classes", icon: ClipboardIcon },
  { label: "Subjects", value: "subjects", icon: BookOpenIcon },
  { label: "Assign Subjects", value: "assignSubjects", icon: AdjustmentsHorizontalIcon },
  { label: "Class Dashboard", value: "classDashboard", icon: ChartBarIcon },
  { label: "Settings", value: "settings", icon: Cog6ToothIcon },
];

export default function SuperAdminSidebarLayout({ children, activeSection, setActiveSection }: {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-white/90 border-r border-gray-100 shadow-lg flex flex-col py-8 px-4">
        <div className="text-2xl font-extrabold text-blue-700 mb-8 select-none">Admin Panel</div>
        <nav className="flex flex-col gap-2">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.value}
                onClick={() => setActiveSection(section.value)}
                className={`flex items-center gap-3 text-left px-4 py-2 rounded-lg font-medium transition-colors text-base ${activeSection === section.value ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-blue-50"}`}
              >
                <Icon className="w-5 h-5" />
                {section.label}
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
