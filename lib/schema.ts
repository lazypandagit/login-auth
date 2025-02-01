import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email("Email should be a valid email"),
	password: z.string().min(8, "Password must be 8 characters long"),
});

export const signUpFormSchema = z.object({
	name: z.string().min(3, "Name must be more than 3 characters"),
	email: z.string().email("Email should be a valid email"),
	password: z.string().min(8, "Password must be 8 characters long"),
});
