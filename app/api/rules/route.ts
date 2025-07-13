import { NextResponse } from 'next/server';

// In-memory rules for demonstration
let rules = [
  {
    id: 1,
    title: 'Minimum Attendance',
    description: 'Students must have at least 75% attendance to be eligible for exams.',
    type: 'Attendance Policy',
    active: true,
  },
  {
    id: 2,
    title: 'Bonus for Early Submission',
    description: '+5% bonus for assignments submitted 24h before deadline.',
    type: 'Bonus Points',
    active: true,
  },
];

export async function GET() {
  return NextResponse.json(rules);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newId = rules.length ? Math.max(...rules.map(r => r.id)) + 1 : 1;
  const newRule = { ...data, id: newId };
  rules.push(newRule);
  return NextResponse.json(newRule);
}

export async function PUT(request: Request) {
  const data = await request.json();
  rules = rules.map(r => r.id === data.id ? data : r);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  rules = rules.filter(r => r.id !== id);
  return NextResponse.json({ success: true });
}
