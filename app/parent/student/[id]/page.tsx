"use client";
import { notFound, useParams } from "next/navigation";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { Bar, Line } from "react-chartjs-2";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// Dummy assessment structure (should match SuperAdminSettings)
const assessmentStructure = [
  {
    name: "Math",
    assessments: [
      { type: "Resumption Test", maxScore: 10 },
      { type: "Mid Term Test", maxScore: 20 },
      { type: "Project", maxScore: 20 },
      { type: "Exam", maxScore: 50 },
    ],
  },
  {
    name: "English",
    assessments: [
      { type: "Assignment", maxScore: 15 },
      { type: "Exam", maxScore: 85 },
    ],
  },
];

// Dummy student scores (simulate real data)
const students = [
  {
    id: 1,
    name: "Jane Johnson",
    class: "JSS1",
    scores: {
      Math: [8, 18, 17, 45],
      English: [13, 80],
    },
  },
  {
    id: 2,
    name: "Tom Johnson",
    class: "JSS2",
    scores: {
      Math: [7, 15, 19, 40],
      English: [10, 70],
    },
  },
];

export default function StudentPerformancePage() {
  const params = useParams();
  if (!params || !('id' in params)) return null;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const student = students.find(s => s.id === Number(id));
  if (!student) return notFound();

  const [selectedSubject, setSelectedSubject] = useState(assessmentStructure[0].name);
  const subject = assessmentStructure.find(s => s.name === selectedSubject);
  const subjectScores = student.scores[selectedSubject as keyof typeof student.scores] || [];
  const labels = subject ? subject.assessments.map(a => a.type) : [];
  const maxScores = subject ? subject.assessments.map(a => a.maxScore) : [];

  const data = {
    labels,
    datasets: [
      {
        label: "Score",
        data: subjectScores,
        backgroundColor: "#a78bfa",
        borderColor: "#a78bfa",
        borderRadius: 8,
        fill: false,
        tension: 0.4,
      },
      {
        label: "Max Score",
        data: maxScores,
        backgroundColor: "#e9d5ff",
        borderColor: "#e9d5ff",
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: `Performance Progress for ${student.name} - ${selectedSubject}` },
    },
    scales: {
      y: { beginAtZero: true, max: Math.max(...maxScores, 100) },
    },
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow border border-purple-100 flex gap-8">
      {/* Subject Selector */}
      <aside className="w-40 flex-shrink-0">
        <h4 className="font-bold text-purple-700 mb-4">Subjects</h4>
        <ul className="flex flex-col gap-2">
          {assessmentStructure.map(s => (
            <li key={s.name}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedSubject === s.name ? "bg-purple-600 text-white shadow" : "text-purple-700 hover:bg-purple-100"}`}
                onClick={() => setSelectedSubject(s.name)}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <AcademicCapIcon className="w-7 h-7 text-purple-500" />
          <h2 className="text-2xl font-bold text-purple-800">{student.name}</h2>
        </div>
        <div className="mb-2 text-gray-600">Class: <span className="font-semibold">{student.class}</span></div>
        <div className="mt-6">
          <Line data={data} options={lineOptions} />
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-purple-700 mb-2">Assessment Breakdown</h3>
          <table className="w-full text-sm border rounded shadow bg-purple-50">
            <thead>
              <tr className="bg-purple-100">
                <th className="p-2 text-left">Assessment</th>
                <th className="p-2 text-left">Score</th>
                <th className="p-2 text-left">Max Score</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {subject && subject.assessments.map((a, i) => (
                <tr key={a.type} className="border-b">
                  <td className="p-2">{a.type}</td>
                  <td className="p-2">{subjectScores[i]}</td>
                  <td className="p-2">{a.maxScore}</td>
                  <td className="p-2">{subjectScores[i] >= a.maxScore * 0.9 ? "Excellent" : subjectScores[i] >= a.maxScore * 0.7 ? "Good" : "Needs Improvement"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
