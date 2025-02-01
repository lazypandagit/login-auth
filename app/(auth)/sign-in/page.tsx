import LoginForm from "@/components/LoginForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const SignIn = () => {
	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>
					Welcome back! Please sign in to continue
				</CardDescription>
			</CardHeader>
			<CardContent>
				<LoginForm />
			</CardContent>
			<CardFooter>
				<p>
					Don&apos;t have and account?
					<Link
						href='/sign-up'
						className='text-primary hover:underline mx-1'
					>
						Sign Up
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};
export default SignIn;
