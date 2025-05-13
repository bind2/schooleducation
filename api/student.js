export async function getStudents() {
  const res = await fetch("/api/students");
  return handleResponse(res);
}

export async function getStudentById(id) {
  const res = await fetch(`/api/students/${id}`);
  return handleResponse(res);
}

export async function deleteStudentById(id) {
  const res = await fetch(`/api/students/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

export async function createStudent(formData) {
  const res = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  return handleResponse(res);
}

async function handleResponse(res) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = errorData?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.json();
}
