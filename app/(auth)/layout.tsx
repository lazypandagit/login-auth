export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<div className='h-screen flex flex-col items-center justify-center pt-16'>
				{children}
			</div>
		</main>
	);
}
