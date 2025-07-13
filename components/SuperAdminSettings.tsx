"use client";
import { useState, useEffect } from "react";
import { Cog6ToothIcon, PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

// --- Types ---
type Rule = {
	id: number;
	title: string;
	description: string;
	type: string;
	active: boolean;
};
type Subject = {
	id: number;
	name: string;
	assessments: Assessment[];
};
type Assessment = {
	id: number;
	type: string;
	maxScore: number;
	start: string;
	end: string;
	penalty: string;
};

// --- Component ---
export default function SuperAdminSettings() {
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [rules, setRules] = useState<Rule[]>([]);
	const [showRuleForm, setShowRuleForm] = useState(false);
	const [ruleForm, setRuleForm] = useState<{ id: number | undefined; title: string; description: string; type: string; active: boolean }>({ id: undefined, title: "", description: "", type: "", active: true });
	const [isEditRule, setIsEditRule] = useState(false);
	const [editRuleId, setEditRuleId] = useState<number | undefined>(undefined);

	// Fetch subjects and rules from API
	useEffect(() => {
		fetch("/api/subjects")
			.then(res => res.json())
			.then(data => setSubjects(data));

		fetch("/api/rules")
			.then(res => res.json())
			.then(data => setRules(data));
	}, []);

	// --- Custom Rule Handlers ---
	const handleRuleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!ruleForm.title || !ruleForm.type || !ruleForm.description) return;
		if (isEditRule && editRuleId !== undefined) {
			// Edit rule
			const res = await fetch("/api/rules", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...ruleForm, id: editRuleId }),
			});
			const updated = await res.json();
			setRules(rules.map(r => r.id === editRuleId ? updated : r));
		} else {
			// Add rule
			const res = await fetch("/api/rules", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(ruleForm),
			});
			const newRule = await res.json();
			setRules([...rules, newRule]);
		}
		setShowRuleForm(false);
		setRuleForm({ id: undefined, title: "", description: "", type: "", active: true });
		setIsEditRule(false);
		setEditRuleId(undefined);
	};

	const handleEditRule = (rule: typeof ruleForm) => {
		setShowRuleForm(true);
		setIsEditRule(true);
		setRuleForm(rule);
		setEditRuleId(rule.id);
	};

	const handleDeleteRule = async (id: number) => {
		await fetch("/api/rules", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});
		setRules(rules.filter(r => r.id !== id));
	};

	// --- Subject Handlers ---
	const handleAddSubject = async (subject: Omit<Subject, "id">) => {
		const res = await fetch("/api/subjects", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(subject),
		});
		const newSubject = await res.json();
		setSubjects([...subjects, newSubject]);
	};

	const handleEditSubject = async (subject: Subject) => {
		const res = await fetch("/api/subjects", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(subject),
		});
		const updated = await res.json();
		setSubjects(subjects.map(s => s.id === updated.id ? updated : s));
	};

	const handleDeleteSubject = async (id: number) => {
		await fetch("/api/subjects", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});
		setSubjects(subjects.filter(s => s.id !== id));
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="flex items-center gap-2 mb-6">
				<Cog6ToothIcon className="w-7 h-7 text-purple-600" />
				<h2 className="text-2xl font-bold text-purple-800">
					Super Admin Settings
				</h2>
			</div>
			<div className="mb-8">
				<h3 className="text-lg font-semibold text-purple-700 mb-2">
					Assessment Structure
				</h3>
				{subjects.map((subject, idx) => (
					<div
						key={subject.name}
						className="mb-6 bg-gradient-to-br from-purple-50 via-white to-purple-100/80 rounded-2xl shadow p-4 border border-purple-100"
					>
						<h4 className="font-bold text-purple-700 mb-2">
							{subject.name}
						</h4>
						<table className="w-full text-sm mb-2">
							<thead>
								<tr className="bg-purple-100">
									<th className="p-2 text-left">Assessment Type</th>
									<th className="p-2 text-left">Max Score</th>
									<th className="p-2 text-left">Start</th>
									<th className="p-2 text-left">End</th>
									<th className="p-2 text-left">Late Penalty</th>
									<th className="p-2">Actions</th>
								</tr>
							</thead>
							<tbody>
								{subject.assessments.map((a) => (
									<tr key={a.id} className="border-b">
										<td className="p-2">{a.type}</td>
										<td className="p-2">{a.maxScore}</td>
										<td className="p-2">{a.start.replace("T", " ")}</td>
										<td className="p-2">{a.end.replace("T", " ")}</td>
										<td className="p-2">{a.penalty}</td>
										<td className="p-2 flex gap-2">
											<button className="text-purple-600 hover:underline">
												<PencilIcon className="w-4 h-4 inline" />
											</button>
											<button className="text-red-500 hover:underline">
												<TrashIcon className="w-4 h-4 inline" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<button className="flex items-center gap-1 text-xs text-purple-700 hover:underline mt-2">
							<PlusIcon className="w-4 h-4" /> Add Assessment
						</button>
					</div>
				))}
			</div>
			<div className="mb-8">
				<h3 className="text-lg font-semibold text-purple-700 mb-2">
					Custom Rules
				</h3>
				<ul className="mb-2">
					{rules.map((rule) => (
						<li key={rule.id} className="flex items-center gap-2 mb-1 bg-purple-50 rounded p-2 border border-purple-100">
							<span className="font-bold text-purple-800">{rule.title}</span>
							<span className="text-xs text-gray-500">({rule.type})</span>
							<span className="text-gray-700 flex-1">{rule.description}</span>
							<span
								className={`text-xs font-semibold px-2 py-1 rounded ${
									rule.active
										? "bg-green-100 text-green-700"
										: "bg-gray-200 text-gray-500"
								}`}
							>
								{rule.active ? "Active" : "Inactive"}
							</span>
							<button
								className="text-purple-600 hover:underline"
								onClick={() => handleEditRule(rule)}
							>
								<PencilIcon className="w-4 h-4 inline" />
							</button>
							<button
								className="text-red-500 hover:underline"
								onClick={() => handleDeleteRule(rule.id)}
							>
								<TrashIcon className="w-4 h-4 inline" />
							</button>
						</li>
					))}
				</ul>
				<button
					onClick={() => {
						setShowRuleForm(true);
						setIsEditRule(false);
						setRuleForm({
							id: undefined,
							title: "",
							description: "",
							type: "",
							active: true,
						});
						setEditRuleId(undefined);
					}}
					className="flex items-center gap-1 text-xs text-purple-700 hover:underline mt-2"
				>
					<PlusIcon className="w-4 h-4" /> Add Custom Rule
				</button>
			</div>
			{showRuleForm && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<form
						onSubmit={handleRuleFormSubmit}
						className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4 border border-gray-100"
					>
						<h4 className="text-lg font-bold mb-2 text-purple-700 flex items-center gap-2">
							{isEditRule ? "Edit Rule" : "Add Custom Rule"}
						</h4>
						<input
							name="title"
							value={ruleForm.title}
							onChange={(e) =>
								setRuleForm({ ...ruleForm, title: e.target.value })
							}
							placeholder="Rule Title"
							required
							className="px-3 py-2 border rounded-lg shadow-sm"
						/>
						<input
							name="type"
							value={ruleForm.type}
							onChange={(e) =>
								setRuleForm({ ...ruleForm, type: e.target.value })
							}
							placeholder="Rule Type (e.g. Attendance Policy)"
							required
							className="px-3 py-2 border rounded-lg shadow-sm"
						/>
						<textarea
							name="description"
							value={ruleForm.description}
							onChange={(e) =>
								setRuleForm({ ...ruleForm, description: e.target.value })
							}
							placeholder="Description"
							required
							className="px-3 py-2 border rounded-lg shadow-sm"
						/>
						<div className="flex gap-2 mt-2">
							<button
								type="submit"
								className="bg-purple-700 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-800 transition font-semibold"
							>
								{isEditRule ? "Update" : "Add"}
							</button>
							<button
								type="button"
								onClick={() => {
									setShowRuleForm(false);
									setIsEditRule(false);
									setEditRuleId(undefined);
								}}
								className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition font-semibold"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
