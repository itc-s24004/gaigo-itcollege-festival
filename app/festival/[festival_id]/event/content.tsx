"use client";

import { db_event } from "@/libs/db/db.type";
import { Carousel } from "@/page_components/carousel";
import { EventPoster } from "@/page_components/poster/event";
import Link from "next/link";

type PageContentProps = {
    events: db_event[];
    showEntryPage: boolean;
};

export function PageContent({ events, showEntryPage }: PageContentProps) {
    return (
        <div>
            <Carousel
                title="イベント一覧"
                items={events.map((event) => (
                    <EventPoster key={event.id} data={event} showDescription={false} link={`./event/${event.id}`} />
                ))}
            />
            {showEntryPage && <Link href="./event/entry">イベント参加申請ページへ</Link>}
        </div>
    );
}