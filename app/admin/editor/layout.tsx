export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h2>エディター用レイアウト</h2>
            <div>{children}</div>
        </div>
    );
}