"use client";
import { useState } from "react";

// Dummy data for demonstration
const initialSubjects = [
  { id: 1, name: "Mathematics", code: "MATH101" },
  { id: 2, name: "English", code: "ENG101" },
];

type Subject = {
  id: number;
  name: string;
  code: string;
};

export default function SubjectsManagement() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Subject, "id"> & { id?: number }>({ name: "", code: "" });
  const [isEdit, setIsEdit] = useState(false);

  const handleInput = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    setForm({ name: "", code: "" });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEdit = (subject: Subject) => {
    setForm(subject);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isEdit && form.id !== undefined) {
      setSubjects(subjects.map(s => (s.id === form.id ? { ...form, id: form.id } as Subject : s)));
    } else {
      setSubjects([...subjects, { ...form, id: Date.now() } as Subject]);
    }
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-pink-700">Subjects</h3>
        <button onClick={handleAdd} className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">Add Subject</button>
      </div>
      <table className="w-full text-sm border rounded overflow-hidden">
        <thead className="bg-pink-50">
          <tr>
            <th className="p-2 text-left">Subject Name</th>
            <th className="p-2 text-left">Code</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject.id} className="border-b hover:bg-pink-50/50">
              <td className="p-2">{subject.name}</td>
              <td className="p-2">{subject.code}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(subject)} className="text-pink-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(subject.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-6 w-full max-w-md flex flex-col gap-4 border border-gray-100">
            <h4 className="text-lg font-bold mb-2 text-pink-700">{isEdit ? "Edit Subject" : "Add Subject"}</h4>
            <input name="name" value={form.name} onChange={handleInput} placeholder="Subject Name" required className="px-3 py-2 border rounded" />
            <input name="code" value={form.code} onChange={handleInput} placeholder="Code" required className="px-3 py-2 border rounded" />
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-800 transition">{isEdit ? "Update" : "Add"}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
