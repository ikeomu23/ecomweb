"use client";
import { useState } from "react";

// Dummy data
const classes = [
  { id: 1, name: "JSS1" },
  { id: 2, name: "JSS2" },
];
const students = [
  { id: 1, name: "Jane Doe", classId: 1 },
  { id: 2, name: "John Smith", classId: 1 },
  { id: 3, name: "Mary Ann", classId: 2 },
];
const subjects = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "English" },
];
const scores = [
  { studentId: 1, subjectId: 1, score: 85 },
  { studentId: 2, subjectId: 1, score: 90 },
  { studentId: 1, subjectId: 2, score: 78 },
  { studentId: 2, subjectId: 2, score: 88 },
  { studentId: 3, subjectId: 1, score: 92 },
  { studentId: 3, subjectId: 2, score: 80 },
];

export default function ClassDashboard() {
  const [selectedClass, setSelectedClass] = useState(classes[0].id);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);

  const classStudents = students.filter(s => s.classId === selectedClass);

  return (
    <div className="flex gap-6 mt-8 max-w-6xl mx-auto">
      {/* Sidebar: Classes */}
      <aside className="w-40 shrink-0">
        <h4 className="font-semibold text-gray-700 mb-2">Classes</h4>
        <ul className="space-y-1">
          {classes.map(cls => (
            <li
              key={cls.id}
              className={`px-3 py-2 rounded cursor-pointer transition font-medium ${selectedClass === cls.id ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50 text-gray-600"}`}
              onClick={() => setSelectedClass(cls.id)}
            >
              {cls.name}
            </li>
          ))}
        </ul>
      </aside>
      {/* Main Content */}
      <main className="flex-1">
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h2 className="text-xl font-bold text-blue-700">{classes.find(c => c.id === selectedClass)?.name} Dashboard</h2>
        </div>
        <div className="flex gap-6">
          {/* Students List */}
          <section className="w-1/2">
            <h4 className="font-medium mb-2 text-gray-700">Students</h4>
            <ul className="divide-y rounded border">
              {classStudents.map(student => (
                <li key={student.id} className="p-2">
                  <a href={`/admin/students/${student.id}`} className="text-blue-700 hover:underline font-semibold">{student.name}</a>
                </li>
              ))}
            </ul>
          </section>
          {/* Subjects and Chart */}
          <section className="w-1/2">
            <div className="mb-2 flex gap-2">
              {subjects.map(subject => (
                <button
                  key={subject.id}
                  className={`px-3 py-1.5 rounded font-medium transition-colors text-sm ${selectedSubject === subject.id ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"}`}
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  {subject.name}
                </button>
              ))}
            </div>
            <div className="bg-white rounded shadow p-4 mt-2">
              {/* Chart placeholder - will add Chart.js next */}
              <div className="text-gray-400 text-center py-8">[Performance Chart Here]</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
