export function POST() {
    console.log("User POST");
    return new Response("User POST", { status: 200 });
}