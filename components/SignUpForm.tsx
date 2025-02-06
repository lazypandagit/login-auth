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
import { signUp } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { Separator } from "./ui/separator";
import SocialLogin from "./SocialLogin";
import { useRouter } from "next/navigation";

function LoginForm() {
	const router = useRouter();
	const [pending, setPending] = useState(false);
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
		await signUp.email(
			{
				email,
				password,
				name,
			},
			{
				onRequest: () => {
					setPending(true);
				},
				onSuccess: () => {
					setPending(false);
					form.reset();
					router.push("/user");
					router.refresh();
				},
				onError: (ctx) => {
					setPending(false);
					toast({
						title: ctx.error.error,
						description: ctx.error.message,
						variant: "destructive",
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
					<LoadingButton pending={pending}>Sign up</LoadingButton>
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
