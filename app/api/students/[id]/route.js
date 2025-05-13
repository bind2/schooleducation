import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req, {params}) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.error("GET /students/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params?.id;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const deletedStudent = await prisma.student.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Student deleted successfully' },
      { status: 200 }
    );
  } catch (error) {

    if (error.code === 'P2025') {
      // Prisma error when record not found
      return NextResponse.json(
        { message: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
