import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      select: {
        id: true,
        studentName: true,
        phoneNumber: true,
        programOfInterest: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });


    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { emailAddress, studentAge, ...rest } = body;


    if (!emailAddress) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    // 1. Check if email already exists
    const existingStudent = await prisma.student.findUnique({
      where: { emailAddress },
    });

    if (existingStudent) {
      return NextResponse.json(
        { message: "A student with this email already exists" },
        { status: 409 },
      );
    }

    // 2. Create the new student
    const newStudent = await prisma.student.create({
      data: {
        emailAddress,
        studentAge: Number(studentAge),
        ...rest,
      },
    });

    return NextResponse.json({ message: "Student created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
