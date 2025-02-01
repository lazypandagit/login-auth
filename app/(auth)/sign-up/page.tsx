import SignUpForm from "@/components/SignUpForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const SignUp = () => {
	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create your account to get started.</CardDescription>
			</CardHeader>
			<CardContent>
				<SignUpForm />
			</CardContent>
			<CardFooter>
				<p>
					Already have an account?
					<Link
						href='/sign-in'
						className='text-primary hover:underline mx-4'
					>
						Log in
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};
export default SignUp;
