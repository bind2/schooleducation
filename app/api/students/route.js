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
          programOfInterest: true
        },
        orderBy: {
          createdAt: 'desc', // Optional: latest entries first
        },
      })
  
      return NextResponse.json(students, { status: 200 })
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
  }
  

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      studentName,
      emailAddress,
      phoneNumber,
      parentName,
      studentAge,
      programOfInterest,
      message,
    } = body;

    const newStudent = await prisma.student.create({
      data: {
        studentName,
        emailAddress,
        phoneNumber,
        parentName,
        studentAge: Number(studentAge),
        programOfInterest,
        message,
      },
    });
    return NextResponse.json({ message: "create" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
