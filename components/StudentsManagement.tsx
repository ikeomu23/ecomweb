"use client";
import { useState } from "react";
import Link from "next/link";

// Dummy data for demonstration
const initialStudents = [
	{
		id: 1,
		name: "Jane Doe",
		admissionNo: "A001",
		gender: "Female",
		class: "JSS1",
		parent: "john@example.com",
	},
	{
		id: 2,
		name: "John Smith",
		admissionNo: "A002",
		gender: "Male",
		class: "JSS2",
		parent: "mary@example.com",
	},
];

type Student = {
	id: number;
	name: string;
	admissionNo: string;
	gender: string;
	class: string;
	parent: string;
};

export default function StudentsManagement() {
	const [students, setStudents] = useState<Student[]>(initialStudents);
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState<
		Omit<Student, "id"> & { id?: number }
	>({ name: "", admissionNo: "", gender: "", class: "", parent: "" });
	const [isEdit, setIsEdit] = useState(false);

	const handleInput = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

	const handleAdd = () => {
		setForm({ name: "", admissionNo: "", gender: "", class: "", parent: "" });
		setIsEdit(false);
		setShowForm(true);
	};

	const handleEdit = (student: Student) => {
		setForm(student);
		setIsEdit(true);
		setShowForm(true);
	};

	const handleDelete = (id: number) => {
		setStudents(students.filter(s => s.id !== id));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (isEdit && form.id !== undefined) {
			setStudents(students.map(s => (s.id === form.id ? { ...form, id: form.id } as Student : s)));
		} else {
			setStudents([...students, { ...form, id: Date.now() } as Student]);
		}
		setShowForm(false);
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold text-blue-700">Students</h3>
				<button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
					Add Student
				</button>
			</div>
			<table className="w-full text-sm border rounded overflow-hidden">
				<thead className="bg-blue-50">
					<tr>
						<th className="p-2 text-left">Name</th>
						<th className="p-2 text-left">Admission No</th>
						<th className="p-2 text-left">Gender</th>
						<th className="p-2 text-left">Class</th>
						<th className="p-2 text-left">Parent Email</th>
						<th className="p-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{students.map(student => (
						<tr key={student.id} className="border-b hover:bg-blue-50/50">
							<td className="p-2">
								<Link href={`/admin/students/${student.id}`} className="text-blue-700 hover:underline font-semibold">
									{student.name}
								</Link>
							</td>
							<td className="p-2">{student.admissionNo}</td>
							<td className="p-2">{student.gender}</td>
							<td className="p-2">{student.class}</td>
							<td className="p-2">{student.parent}</td>
							<td className="p-2 flex gap-2">
								<button onClick={() => handleEdit(student)} className="text-blue-600 hover:underline">
									Edit
								</button>
								<Link href={`/admin/students/${student.id}`} className="text-purple-600 hover:underline">
									Dashboard
								</Link>
								<button onClick={() => handleDelete(student.id)} className="text-red-500 hover:underline">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{showForm && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-6 w-full max-w-md flex flex-col gap-4 border border-gray-100">
						<h4 className="text-lg font-bold mb-2 text-blue-700">{isEdit ? "Edit Student" : "Add Student"}</h4>
						<input name="name" value={form.name} onChange={handleInput} placeholder="Name" required className="px-3 py-2 border rounded" />
						<input name="admissionNo" value={form.admissionNo} onChange={handleInput} placeholder="Admission No" required className="px-3 py-2 border rounded" />
						<select name="gender" value={form.gender} onChange={handleInput} required className="px-3 py-2 border rounded">
							<option value="">Select Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
						<input name="class" value={form.class} onChange={handleInput} placeholder="Class" required className="px-3 py-2 border rounded" />
						<input name="parent" value={form.parent} onChange={handleInput} placeholder="Parent Email" required className="px-3 py-2 border rounded" />
						<div className="flex gap-2 mt-2">
							<button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
								{isEdit ? "Update" : "Add"}
							</button>
							<button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
