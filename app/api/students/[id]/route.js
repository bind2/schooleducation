import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// Fetch one student by ID
export async function GET(_req, { params }) {
  try {
    const id = params.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const student = await prisma.student.findUnique({ where: { id } });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Delete student by ID
export async function DELETE(_req, { params }) {
  try {
    const id = params.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const existingStudent = await prisma.student.findUnique({ where: { id } });

    if (!existingStudent) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    await prisma.student.delete({ where: { id } });

    return NextResponse.json(
      { message: "Student deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
