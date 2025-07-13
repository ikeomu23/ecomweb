"use client";
import { useState } from "react";
import { ClipboardIcon, UsersIcon } from "@heroicons/react/24/outline";

// Dummy data for demonstration
const initialClasses = [
  { id: 1, name: "JSS1", teacher: "Mr. Adams" },
  { id: 2, name: "JSS2", teacher: "Ms. Rose" },
];

const students = [
  { id: 1, name: "Jane Doe", classId: 1 },
  { id: 2, name: "John Smith", classId: 1 },
  { id: 3, name: "Mary Ann", classId: 2 },
];

type ClassType = {
  id: number;
  name: string;
  teacher: string;
};

export default function ClassesManagement() {
  const [classes, setClasses] = useState<ClassType[]>(initialClasses);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<ClassType, "id"> & { id?: number }>({ name: "", teacher: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  const handleInput = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    setForm({ name: "", teacher: "" });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEdit = (classObj: ClassType) => {
    setForm(classObj);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isEdit && form.id !== undefined) {
      setClasses(classes.map(c => (c.id === form.id ? { ...form, id: form.id } as ClassType : c)));
    } else {
      setClasses([...classes, { ...form, id: Date.now() } as ClassType]);
    }
    setShowForm(false);
  };

  const handleClassClick = (id: number) => {
    setSelectedClass(selectedClass === id ? null : id);
  };

  return (
    <div className="w-full">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-900 mb-4">
        <ClipboardIcon className="w-6 h-6 text-blue-800" /> Classes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {initialClasses.map(cls => (
          <div
            key={cls.id}
            className={`rounded-2xl shadow-xl p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100/80 border border-gray-100 cursor-pointer transition hover:shadow-2xl ${selectedClass === cls.id ? "ring-2 ring-blue-400" : ""}`}
            onClick={() => handleClassClick(cls.id)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedClass === cls.id}
          >
            <div className="flex items-center gap-3 mb-2">
              <ClipboardIcon className="w-6 h-6 text-blue-800" />
              <span className="text-xl font-bold text-blue-900">{cls.name}</span>
            </div>
            <div className="text-gray-500 text-sm">{students.filter(s => s.classId === cls.id).length} students</div>
            {selectedClass === cls.id && (
              <div className="mt-4">
                <h4 className="flex items-center gap-2 text-base font-semibold text-blue-700 mb-2">
                  <UsersIcon className="w-5 h-5 text-blue-600" /> Students in {cls.name}
                </h4>
                <ul className="space-y-2">
                  {students.filter(s => s.classId === cls.id).map(student => (
                    <li key={student.id} className="bg-white/80 rounded-lg px-4 py-2 shadow border border-gray-100 text-gray-800 font-medium">
                      {student.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4 mt-6">
        <h3 className="text-lg font-semibold text-blue-900">Manage Classes</h3>
        <button onClick={handleAdd} className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950 transition">Add Class</button>
      </div>
      <table className="w-full text-sm border rounded overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 text-left">Class Name</th>
            <th className="p-2 text-left">Teacher</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(classObj => (
            <tr key={classObj.id} className="border-b hover:bg-blue-100/50">
              <td className="p-2">{classObj.name}</td>
              <td className="p-2">{classObj.teacher}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(classObj)} className="text-blue-900 hover:underline">Edit</button>
                <button onClick={() => handleDelete(classObj.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-6 w-full max-w-md flex flex-col gap-4 border border-gray-100">
            <h4 className="text-lg font-bold mb-2 text-blue-900">{isEdit ? "Edit Class" : "Add Class"}</h4>
            <input name="name" value={form.name} onChange={handleInput} placeholder="Class Name" required className="px-3 py-2 border rounded" />
            <input name="teacher" value={form.teacher} onChange={handleInput} placeholder="Teacher" required className="px-3 py-2 border rounded" />
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950 transition">{isEdit ? "Update" : "Add"}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
