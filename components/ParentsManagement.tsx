"use client";
import { useState } from "react";
import { UserGroupIcon, UserIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Dummy data for demonstration (backend-friendly, normalized)
const initialStudents = [
  { id: 1, name: "Jane Johnson", class: "JSS1" },
  { id: 2, name: "Tom Johnson", class: "JSS2" },
  { id: 3, name: "Anna Doe", class: "JSS1" },
];

const initialParents = [
  { id: 1, name: "Mary Johnson", email: "mary@example.com", phone: "08012345678", studentIds: [1, 2] },
  { id: 2, name: "John Doe", email: "john@example.com", phone: "08087654321", studentIds: [3] },
];

type Student = {
  id: number;
  name: string;
  class: string;
};

type Parent = {
  id: number;
  name: string;
  email: string;
  phone: string;
  studentIds: number[];
};

export default function ParentsManagement() {
  const [parents, setParents] = useState<Parent[]>(initialParents);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Parent, "id"> & { id?: number }>({ name: "", email: "", phone: "", studentIds: [] });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

  const handleInput = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    setForm({ name: "", email: "", phone: "", studentIds: [] });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEdit = (parent: Parent) => {
    setForm(parent);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setParents(parents.filter(p => p.id !== id));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isEdit && form.id !== undefined) {
      setParents(parents.map(p => (p.id === form.id ? { ...form, id: form.id } as Parent : p)));
    } else {
      setParents([...parents, { ...form, id: Date.now() } as Parent]);
    }
    setShowForm(false);
  };

  const handleStudentClick = (studentId: number, parent: Parent) => {
    setSelectedStudent(students.find(s => s.id === studentId) || null);
    setSelectedParent(parent);
  };

  const closeStudentModal = () => {
    setSelectedStudent(null);
    setSelectedParent(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-700">
          <UserGroupIcon className="w-6 h-6 text-purple-600" /> Parents
        </h3>
        <button onClick={handleAdd} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition font-semibold flex items-center gap-2">
          <UserIcon className="w-5 h-5" /> Add Parent
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parents.map(parent => (
          <div key={parent.id} className="bg-gradient-to-br from-purple-50 via-white to-purple-100/80 rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <UserGroupIcon className="w-6 h-6 text-purple-500" />
              <div>
                <div className="font-bold text-purple-800">{parent.name}</div>
                <div className="text-xs text-gray-500">{parent.email} | {parent.phone}</div>
              </div>
            </div>
            <div className="mt-2">
              <div className="font-semibold text-sm text-purple-700 mb-1">Kids:</div>
              <div className="flex flex-wrap gap-2">
                {parent.studentIds.length === 0 && <span className="text-xs text-gray-400">No kids assigned</span>}
                {parent.studentIds.map(sid => {
                  const student = students.find(s => s.id === sid);
                  return student ? (
                    <Link
                      key={sid}
                      href={`/admin/students/${sid}`}
                      className="bg-purple-200/70 hover:bg-purple-300 text-purple-900 px-3 py-1 rounded-lg text-xs font-semibold shadow-sm transition border border-purple-100 flex items-center"
                    >
                      <AcademicCapIcon className="w-4 h-4 inline mr-1" /> {student.name}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleEdit(parent)} className="text-purple-600 hover:underline font-semibold">Edit</button>
              <button onClick={() => handleDelete(parent.id)} className="text-red-500 hover:underline font-semibold">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4 border border-gray-100">
            <h4 className="text-lg font-bold mb-2 text-purple-700 flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-purple-600" /> {isEdit ? "Edit Parent" : "Add Parent"}
            </h4>
            <input name="name" value={form.name} onChange={handleInput} placeholder="Name" required className="px-3 py-2 border rounded-lg shadow-sm" />
            <input name="email" value={form.email} onChange={handleInput} placeholder="Email" required className="px-3 py-2 border rounded-lg shadow-sm" />
            <input name="phone" value={form.phone} onChange={handleInput} placeholder="Phone" required className="px-3 py-2 border rounded-lg shadow-sm" />
            {/* For demo, not editing studentIds here. In real app, add multi-select for students. */}
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-800 transition font-semibold">{isEdit ? "Update" : "Add"}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition font-semibold">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {selectedStudent && (
        null
      )}
    </div>
  );
}
