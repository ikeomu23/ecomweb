"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SuperAdminSidebarLayout from "../../components/SuperAdminSidebarLayout";
import StudentsManagement from "../../components/StudentsManagement";
import TeachersManagement from "../../components/TeachersManagement";
import ParentsManagement from "../../components/ParentsManagement";
import ClassesManagement from "../../components/ClassesManagement";
import SubjectsManagement from "../../components/SubjectsManagement";
import AssignSubjects from "../../components/AssignSubjects";
import ClassDashboard from "../../components/ClassDashboard";
import SuperAdminDashboard from "../../components/SuperAdminDashboard";
import SuperAdminSettings from "../../components/SuperAdminSettings";

const sectionComponents: Record<string, React.ReactNode> = {
  students: <StudentsManagement />,
  teachers: <TeachersManagement />,
  parents: <ParentsManagement />,
  classes: <ClassesManagement />,
  subjects: <SubjectsManagement />,
  assignSubjects: <AssignSubjects />,
  classDashboard: <ClassDashboard />,
  settings: <SuperAdminSettings />,
};

export default function AdminPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("students");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("superadmin-auth");
      if (isAuth !== "true") {
        router.replace("/admin/login");
      }
    }
  }, [router]);

  return (
    <SuperAdminSidebarLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      <div className="w-full max-w-5xl mx-auto">
        {activeSection === "dashboard" || activeSection === undefined ? (
          <SuperAdminDashboard />
        ) : (
          <div className="bg-white/90 rounded-2xl shadow-2xl p-8 min-h-[400px] flex flex-col items-center justify-center border border-gray-100">
            {sectionComponents[activeSection]}
          </div>
        )}
      </div>
    </SuperAdminSidebarLayout>
  );
}
