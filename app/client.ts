'use client';

console.log("Pusher client initializing");

import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent,
} from '@pusher/pusher-websocket-react-native';

const pusher = Pusher.getInstance();

await pusher.init({
    apiKey: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
});
    
await pusher.connect();
await pusher.subscribe({
    channelName: "my-channel", 
    onEvent: (event: PusherEvent) => {
    console.log(`Event received: ${event}`);
    }
});