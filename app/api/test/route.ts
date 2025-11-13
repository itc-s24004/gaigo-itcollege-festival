import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const form = await req.formData();
    console.log(form);

    return NextResponse.redirect(new URL("/", new URL(req.url).origin));
}