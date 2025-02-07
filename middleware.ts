import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/lib/auth";

const protectedRoutes = ["/sign-in", "/sign-up"];

export default async function authMiddleware(request: NextRequest) {
	const pathName = request.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(pathName);

	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: process.env.BETTER_AUTH_URL,
			headers: {
				// get the cookie from the request
				cookie: request.headers.get("cookie") || "",
			},
		}
	);

	// If the user is not logged in and trying to access a protected route, allow the request to proceed
	if (!session && isProtectedRoute) {
		return NextResponse.next();
	}

	// If the user is not logged in and trying to access the /user page, redirect to home page
	if (!session && pathName === "/user") {
		return NextResponse.redirect(new URL("/", request.url));
	}

	// If the user is logged in and trying to access the /user page, allow the request to proceed
	if (session && pathName === "/user") {
		return NextResponse.next();
	}

	// If the user is logged in and trying to access the home page, redirect to /user page
	if (session && pathName === "/") {
		return NextResponse.redirect(new URL("/user", request.url));
	}

	// If the user is logged in and trying to access a protected route, redirect to /user page
	if (session && isProtectedRoute) {
		return NextResponse.redirect(new URL("/user", request.url));
	}

	// For all other cases, allow the request to proceed
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$).*)"],
};
