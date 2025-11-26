"use client";

import { db_event_with_image } from "@/libs/db/db.data";
import { db_user_id } from "@/libs/db/db.type";
import { Carousel } from "@/page_components/carousel";
import { EventPoster } from "@/page_components/poster/event";

type PageContentProps = {
    owned_events: db_event_with_image[];
    joined_events: db_event_with_image[];
    user_id: db_user_id;
};

export function PageContent({ owned_events, joined_events, user_id }: PageContentProps) {
    
    return (
        <>
            <Carousel
                title="作成したイベント"
                items={
                    owned_events.map((event, index) => (
                        <EventPoster
                            key={index}
                            showDescription={false}
                            data={event}
                            link={`/festival/${event.festival_id}/event/${event.id}/editor`}
                        />
                    ))
                }
            />
            <Carousel
                title="参加中のイベント"
                items={
                    joined_events.map((event, index) => (
                        <EventPoster
                            key={index}
                            showDescription={false}
                            data={event}
                            link={`/festival/${event.festival_id}/event/${event.id}/editor`}
                        />
                    ))
                }
            />
        </>
    )
}