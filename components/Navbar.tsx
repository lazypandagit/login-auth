import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { DarkToggle } from "./DarkTogle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Navbar = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<div className='absolute top-0 left-0 z-10 border-b px-4 w-screen'>
			<div className='flex items-center justify-between mx-auto max-w-4xl h-16'>
				<Link href='/'>
					<Image
						src={"/logo_text.svg"}
						alt='to-dooz logo'
						width={128}
						height={64}
						className='dark:invert'
						priority
					/>
				</Link>
				<div className='flex gap-4 items-center justify-center'>
					{session ? (
						<>
							<p className='text-sm text-end'>
								Logged in as <br />
								<span className='text-semibold'>{session?.user?.name}</span>
							</p>
							<form
								action={async () => {
									"use server";
									await auth.api.signOut({
										headers: await headers(),
									});
									redirect("/");
								}}
							>
								<Button>Sign Out</Button>
							</form>
						</>
					) : (
						<Link
							href='/sign-in'
							className={buttonVariants()}
						>
							Sign In
						</Link>
					)}
					<DarkToggle />
				</div>
			</div>
		</div>
	);
};
export default Navbar;
