"use client";

import type { db_festival_with_image } from "@/libs/db/db.data";
import { Carousel } from "@/page_components/carousel";
import { FestivalPoster } from "@/page_components/poster/festival";

type PageContentProps = {
    festivals: db_festival_with_image[];
}
export function PageContent({ festivals }: PageContentProps) {
    return (
        <Carousel 
            items={
                festivals.map((festival) => (
                    <FestivalPoster
                        key={festival.id}
                        link={`/festival/${festival.id}`}
                        data={festival} 
                        showDescription={false}
                    />
                ))
            }
            title="過去の祭り"
        />
    );
}