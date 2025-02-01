"use client";

import { loginFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";

function LoginForm() {
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		const { email, password } = values;
		const { data, error } = await signIn.email(
			{
				email,
				password,
				callbackURL: "/user",
			},
			{
				onRequest: () => {
					toast({
						title: "Logging In...",
						description: "Please wait...",
					});
				},
				onSuccess: () => {
					form.reset();
				},
				onError: () => {
					toast({
						title: "Invalid Email or Password",
						description: "Please try again",
					});
				},
			}
		);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4'
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='example@mail.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='Password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className='w-full'
					type='submit'
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}
export default LoginForm;
