"use client";

import { db_festival_with_image } from "@/libs/db/db.data";
import { Carousel } from "@/page_components/carousel";
import { FestivalPoster } from "@/page_components/poster/festival";
import { site_setting } from "@/site_settings";

type PageContentProps = {
    settings: site_setting;
    festivals: db_festival_with_image[];
}
export function PageContent({ settings, festivals }: PageContentProps) {
    const selectedFestival = festivals.findIndex((fes) => fes.id === settings.current_festival);
    


    return (
        <div>
            <h1>管理者ページ</h1>
            {
                <Carousel 
                    title="祭り一覧"
                    items={
                        festivals.map((festival, index) => (
                            <FestivalPoster
                                key={festival.id}
                                link={`/festival/${festival.id}/editor`}
                                data={festival} 
                                showDescription={false}
                                customAttributes={
                                    {style: {
                                        boxShadow: "none",
                                        borderColor: festival.is_archived ? "red" : "gray",
                                        backgroundColor: index === selectedFestival ? "lightblue" : "",
                                        // outline: index === selectedFestival ? "2px solid blue" : "none"
                                    }}
                                }
                            />
                        ))
                    }
                    moreLabel="作成"
                    moreLink="/festival/create"
                />
            }
            {
                Object.entries(settings).map(([key, value], index) => (
                    <div key={index}>
                        <strong>{key}:</strong> {String(value)}
                    </div>
                ))
            }
        </div>
    );
}