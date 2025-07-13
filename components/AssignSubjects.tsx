"use client";
import { useState } from "react";

// Dummy data for demonstration
const students = [
  { id: 1, name: "Jane Doe", admissionNo: "A001" },
  { id: 2, name: "John Smith", admissionNo: "A002" },
];
const subjects = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "English" },
  { id: 3, name: "Biology" },
];

// For demo, store assignments in local state
export default function AssignSubjects() {
  const [assignments, setAssignments] = useState<{ [studentId: number]: number[] }>({});
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const handleStudentSelect = (id: number) => setSelectedStudent(id);

  const handleSubjectToggle = (subjectId: number) => {
    if (selectedStudent === null) return;
    setAssignments(prev => {
      const current = prev[selectedStudent] || [];
      return {
        ...prev,
        [selectedStudent]: current.includes(subjectId)
          ? current.filter(sid => sid !== subjectId)
          : [...current, subjectId],
      };
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/90 rounded shadow p-6 mt-8">
      <h3 className="text-lg font-semibold text-indigo-700 mb-4">Assign Subjects to Students</h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <h4 className="font-medium mb-2 text-gray-700">Students</h4>
          <ul className="divide-y rounded border">
            {students.map(student => (
              <li
                key={student.id}
                className={`p-2 cursor-pointer hover:bg-indigo-50 transition ${selectedStudent === student.id ? "bg-indigo-100 font-bold" : ""}`}
                onClick={() => handleStudentSelect(student.id)}
              >
                {student.name} <span className="text-xs text-gray-400">({student.admissionNo})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <h4 className="font-medium mb-2 text-gray-700">Subjects</h4>
          {selectedStudent === null ? (
            <div className="text-gray-400 italic">Select a student to assign subjects</div>
          ) : (
            <ul className="space-y-2">
              {subjects.map(subject => (
                <li key={subject.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={assignments[selectedStudent]?.includes(subject.id) || false}
                    onChange={() => handleSubjectToggle(subject.id)}
                    className="accent-indigo-600"
                  />
                  <span>{subject.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
