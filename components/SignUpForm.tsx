"use client";

import { signUpFormSchema } from "@/lib/schema";
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
import { signUp } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";

function LoginForm() {
	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
		const { name, email, password } = values;
		const { data, error } = await signUp.email(
			{
				email,
				password,
				name,
				callbackURL: "/user",
			},
			{
				onRequest: () => {
					toast({
						title: "Signing Up",
						description: "Please wait...",
					});
				},
				onSuccess: () => {
					form.reset();
				},
				onError: () => {
					toast({
						title: "Error",
						description: error?.message,
						variant: "destructive",
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
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='John Doe'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
