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
import { signIn } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { Separator } from "./ui/separator";
import SocialLogin from "./SocialLogin";

function LoginForm() {
	const [pending, setPending] = useState(false);
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
		await signIn.email(
			{
				email,
				password,
				callbackURL: "/user",
			},
			{
				onRequest: () => {
					setPending(true);
					toast({
						title: "Logging In...",
						description: "Please wait...",
					});
				},
				onSuccess: () => {
					setPending(false);
					form.reset();
				},
				onError: () => {
					setPending(false);
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
			<div>
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
					<LoadingButton pending={pending}>Login</LoadingButton>
				</form>
			</div>
			<Separator className='my-3' />
			<div className='space-y-2'>
				<SocialLogin />
			</div>
		</Form>
	);
}
export default LoginForm;
