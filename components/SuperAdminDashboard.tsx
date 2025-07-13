"use client";
import { AcademicCapIcon, UsersIcon, UserGroupIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const metrics = [
  { label: "Teachers", value: 12, icon: AcademicCapIcon, accent: "bg-green-100 text-green-700" },
  { label: "Students", value: 120, icon: UsersIcon, accent: "bg-blue-100 text-blue-700" },
  { label: "Parents", value: 80, icon: UserGroupIcon, accent: "bg-purple-100 text-purple-700" },
  { label: "Subjects", value: 10, icon: BookOpenIcon, accent: "bg-pink-100 text-pink-700" },
];

const chartData = {
  labels: ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"],
  datasets: [
    {
      label: "Students per Class",
      data: [20, 18, 22, 15, 25, 20],
      backgroundColor: "#2563eb",
      borderRadius: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: "#e5e7eb" }, beginAtZero: true },
  },
};

export default function SuperAdminDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-2 md:px-0">
      {/* Filters/Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label="Search"
        />
        <select className="px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" aria-label="Filter">
          <option>All Classes</option>
          <option>JSS1</option>
          <option>JSS2</option>
          <option>JSS3</option>
        </select>
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map(({ label, value, icon: Icon, accent }) => (
          <div
            key={label}
            className={`rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center bg-white/80 border border-gray-100 hover:shadow-2xl transition group focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer`}
            tabIndex={0}
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-3 text-2xl ${accent}`}>
              <Icon className="w-7 h-7" />
            </div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">{value}</div>
            <div className="text-base font-medium text-gray-500">{label}</div>
          </div>
        ))}
      </div>
      {/* Chart Card */}
      <div className="rounded-2xl shadow-xl p-6 bg-white/80 border border-gray-100">
        <h4 className="text-lg font-semibold mb-4 text-blue-700">Students per Class</h4>
        <Bar data={chartData} options={chartOptions} height={220} />
      </div>
    </div>
  );
}
