import RootLayout from "@/page_components/_layout/layout";


export default async function Layout({children, params}: Readonly<{children: React.ReactNode; params: Promise<{festival_id: string}>}>) {
    return (
        <RootLayout params={params} >
            {children}
        </RootLayout>
    );
}