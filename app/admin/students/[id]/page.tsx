import Link from "next/link";
import { notFound } from "next/navigation";

// Dummy data for demonstration
const students = [
  { id: 1, name: "Jane Doe", admissionNo: "A001", gender: "Female", class: "JSS1", parent: "john@example.com", subjects: ["Math", "English"] },
  { id: 2, name: "John Smith", admissionNo: "A002", gender: "Male", class: "JSS2", parent: "mary@example.com", subjects: ["Science", "Civic"] },
];

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = students.find(s => s.id === Number(params.id));
  if (!student) return notFound();

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-800 mb-2">{student.name}</h2>
      <div className="text-gray-600 mb-4">Admission No: <span className="font-semibold">{student.admissionNo}</span></div>
      <div className="mb-2"><span className="font-semibold">Gender:</span> {student.gender}</div>
      <div className="mb-2"><span className="font-semibold">Class:</span> {student.class}</div>
      <div className="mb-2"><span className="font-semibold">Parent Email:</span> {student.parent}</div>
      <div className="mb-2"><span className="font-semibold">Subjects:</span> {student.subjects.join(", ")}</div>
      <div className="mt-6">
        <Link href={`/parent/student/${student.id}`} className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition font-semibold">View as Parent</Link>
      </div>
    </div>
  );
}
