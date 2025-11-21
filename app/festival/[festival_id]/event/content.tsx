"use client";

import { db_event } from "@/libs/db/db.type";
import { EventPoster } from "@/page_components/poster/event";
import { SelectView } from "@/page_components/tool/select_view";
import Link from "next/link";

type PageContentProps = {
    events: db_event[];
    showEntryPage: boolean;
};

export function PageContent({ events, showEntryPage }: PageContentProps) {
    return (
        <div>
            <SelectView
                options={
                    events.map((event) => (
                        {
                            element: (
                                <Link href={`./event/${event.id}`}>
                                    <EventPoster data={event} showDescription={false} />
                                </Link>
                            )
                        }
                    ))
                }
                selected={[]}
            />
            {showEntryPage && <Link href="./event/entry">イベント参加申請ページへ</Link>}
        </div>
    );
}