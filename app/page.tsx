import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className='flex flex-col justify-center gap-2 items-center h-screen max-h-screen'>
			<Image
				className='dark:invert'
				src='./logo_text.svg'
				alt='logo'
				width={180}
				height={38}
				priority
			/>
			<h1 className={"text-xl sm:text-2xl lg:text-3xl font-semibold"}>
				Conquer Your Day, One Task at a Time.
			</h1>
			<h2 className='my-4 px-12 text-center text-sm w-full whitespace-pre-wrap sm:w-10/12 lg:w-1/2'>
				To-Dooz is a simple and intuitive to-do list app designed to help you
				stay organized and on top of your tasks. Perfect for managing your
				personal and work-related tasks all in one place.
			</h2>
			<p className='font-semibold'>
				Log-in or create an account to get started
			</p>
			<div className='flex justify-center items-center gap-x-8 top-4'>
				<Button className='py-3 px-8 rounded-full shadow-md'>
					<Link href={"/sign-in"}>Log-In</Link>
				</Button>
				<Button className='py-3 px-8 rounded-full shadow-md'>
					<Link href={"/sign-up"}>Sign-Up</Link>
				</Button>
			</div>
		</div>
	);
}
