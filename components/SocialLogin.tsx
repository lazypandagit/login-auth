"use client";

import { signIn } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SocialLogin = () => {
	const router = useRouter();
	const Implemented = false;
	const handleGithubSubmit = async () => {
		await signIn.social(
			{
				provider: "github",
			},
			{
				onRequest: () => {
					toast({
						title: "Redirecting to Github",
					});
				},
				onSuccess: async () => {
					router.push("/user");
					router.refresh();
				},
				onError: (ctx) => {
					toast({
						title: "Something went wrong",
						description: ctx.error.message ?? "Something went wrong.",
						variant: "destructive",
					});
				},
			}
		);
	};
	const handleGoogleSubmit = async () => {
		if (!Implemented) {
			toast({
				title: "Feature not implemented",
				description: "Sign-in with google feature has not been implemented yet",
				variant: "destructive",
			});
			return;
		}
		await signIn.social(
			{
				provider: "google",
			},
			{
				onRequest: () => {
					toast({
						title: "Redirecting to Google",
					});
				},
				onSuccess: async () => {
					router.push("/user");
					router.refresh();
				},
				onError: (ctx) => {
					toast({
						title: "Something went wrong",
						description: ctx.error.message ?? "Something went wrong.",
						variant: "destructive",
					});
				},
			}
		);
	};
	return (
		<>
			<Button
				onClick={handleGithubSubmit}
				className='w-full'
			>
				<Image
					src='/github_white.svg'
					alt='Login with Github'
					width={26}
					height={24}
					className='dark:invert mx-2'
				/>
				Continue using Github
			</Button>
			<Button
				onClick={handleGoogleSubmit}
				className='w-full'
			>
				<Image
					src='/google.svg'
					alt='Login with Google'
					width={24}
					height={24}
					className='mx-2'
				/>
				Continue using Google
			</Button>
		</>
	);
};
export default SocialLogin;
