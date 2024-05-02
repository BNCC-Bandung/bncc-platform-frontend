"use server";

import { z } from "zod";
import be from "./axios-instace";

interface UserData {
  email: string;
  password: string;
}

export async function loginTodo(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  console.log("hello");

  try {
    // await be.post("/users/login", data);
    console.log(formData.get("email"));
  } catch (err) {
    // await refreshToken();
  }
}

export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  console.log("hello");

  try {
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}
