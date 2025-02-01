import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { DarkToggle } from "./DarkTogle";

const Navbar = () => {
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
					/>
				</Link>
				<div className='flex gap-4 items-center justify-center'>
					<Link
						href='/sign-in'
						className={buttonVariants()}
					>
						Sign In
					</Link>
					<DarkToggle />
				</div>
			</div>
		</div>
	);
};
export default Navbar;
