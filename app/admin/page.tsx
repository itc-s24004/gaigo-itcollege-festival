import pusher from "@/libs/pusher";

export default function Page() {
    

    pusher.trigger("my-channel", "my-event", {
        message: "hello world"
    });

    
    return (
        <h1>管理者ページ</h1>
    );
}