import { signIn } from "@/auth";

export async function POST(req: Request) {
    await signIn("google");
}