export async function api_getUserContentsCount() {
    if (typeof window === "undefined") return 0;

    const url = new URL(`/api/user_contents/count`, origin);

    const result = await fetch(url, {
        method: "GET",
    });
    return result.ok ? (await result.json()).count as number : 0;
}