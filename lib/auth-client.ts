import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, useSession, signOut } = createAuthClient({
	baseURL: process.env.BASE_URL!, // the base url of your auth server
});
