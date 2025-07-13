import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const subjects = await prisma.subject.findMany({
    include: { assessments: true }
  });
  return NextResponse.json(subjects);
}

export async function POST(request: Request) {
  const data = await request.json();
  // expects: { name, assessments: [{...}] }
  const subject = await prisma.subject.create({
    data: {
      name: data.name,
      assessments: {
        create: data.assessments,
      },
    },
    include: { assessments: true },
  });
  return NextResponse.json(subject);
}

export async function PUT(request: Request) {
  const data = await request.json();
  // expects: { id, name, assessments }
  const subject = await prisma.subject.update({
    where: { id: data.id },
    data: {
      name: data.name,
      // For simplicity, delete all assessments and recreate
      assessments: {
        deleteMany: {},
        create: data.assessments,
      },
    },
    include: { assessments: true },
  });
  return NextResponse.json(subject);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.subject.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
