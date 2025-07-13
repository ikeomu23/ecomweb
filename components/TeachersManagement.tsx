"use client";
import { useState } from "react";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

// Dummy data for demonstration
const initialTeachers = [
	{ id: 1, name: "Mr. Adams", email: "adams@school.com", gender: "Male", class: "JSS1" },
	{ id: 2, name: "Ms. Rose", email: "rose@school.com", gender: "Female", class: "JSS2" },
];

type Teacher = {
	id: number;
	name: string;
	email: string;
	gender: string;
	class: string;
};

export default function TeachersManagement() {
	const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState<Omit<Teacher, "id"> & { id?: number }>({ name: "", email: "", gender: "", class: "" });
	const [isEdit, setIsEdit] = useState(false);

	const handleInput = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

	const handleAdd = () => {
		setForm({ name: "", email: "", gender: "", class: "" });
		setIsEdit(false);
		setShowForm(true);
	};

	const handleEdit = (teacher: Teacher) => {
		setForm(teacher);
		setIsEdit(true);
		setShowForm(true);
	};

	const handleDelete = (id: number) => {
		setTeachers(teachers.filter(t => t.id !== id));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (isEdit && form.id !== undefined) {
			setTeachers(teachers.map(t => (t.id === form.id ? { ...form, id: form.id } as Teacher : t)));
		} else {
			setTeachers([...teachers, { ...form, id: Date.now() } as Teacher]);
		}
		setShowForm(false);
	};

	return (
		<div className="">
			<div className="flex justify-between items-center mb-4">
				<h3 className="flex items-center gap-2 text-lg font-semibold text-green-700">
					<AcademicCapIcon className="w-6 h-6 text-green-600" /> Teachers
				</h3>
				<button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition font-semibold flex items-center gap-2">
					<AcademicCapIcon className="w-5 h-5" /> Add Teacher
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-sm border rounded-2xl shadow-md bg-gradient-to-br from-green-50 via-white to-green-100/80 backdrop-blur-md">
					<thead className="bg-green-100/80">
						<tr>
							<th className="p-3 text-left font-semibold">Name</th>
							<th className="p-3 text-left font-semibold">Email</th>
							<th className="p-3 text-left font-semibold">Gender</th>
							<th className="p-3 text-left font-semibold">Class</th>
							<th className="p-3 font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody>
						{teachers.map(teacher => (
							<tr key={teacher.id} className="border-b hover:bg-green-100/60 transition">
								<td className="p-3 font-medium">{teacher.name}</td>
								<td className="p-3">{teacher.email}</td>
								<td className="p-3">{teacher.gender}</td>
								<td className="p-3">{teacher.class}</td>
								<td className="p-3 flex gap-2">
									<button onClick={() => handleEdit(teacher)} className="text-green-600 hover:underline font-semibold">Edit</button>
									<button onClick={() => handleDelete(teacher.id)} className="text-red-500 hover:underline font-semibold">Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{showForm && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<form onSubmit={handleSubmit} className="bg-gradient-to-br from-green-50 via-white to-green-100/80 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4 border border-gray-100 backdrop-blur-md">
						<h4 className="text-lg font-bold mb-2 text-green-700 flex items-center gap-2">
							<AcademicCapIcon className="w-6 h-6 text-green-600" /> {isEdit ? "Edit Teacher" : "Add Teacher"}
						</h4>
						<input name="name" value={form.name} onChange={handleInput} placeholder="Name" required className="px-3 py-2 border rounded-lg shadow-sm" />
						<input name="email" value={form.email} onChange={handleInput} placeholder="Email" required className="px-3 py-2 border rounded-lg shadow-sm" />
						<select name="gender" value={form.gender} onChange={handleInput} required className="px-3 py-2 border rounded-lg shadow-sm">
							<option value="">Select Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
						<input name="class" value={form.class} onChange={handleInput} placeholder="Class" required className="px-3 py-2 border rounded-lg shadow-sm" />
						<div className="flex gap-2 mt-2">
							<button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-lg shadow hover:bg-green-800 transition font-semibold">{isEdit ? "Update" : "Add"}</button>
							<button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition font-semibold">Cancel</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
