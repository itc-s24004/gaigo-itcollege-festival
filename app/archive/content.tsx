"use client";

import type { db_festival_with_image } from "@/libs/db/db.data";
import { FestivalPoster } from "@/page_components/poster/festival";
import { SelectView } from "@/page_components/tool/select_view";
import Link from "next/link";

type PageContentProps = {
    festivals: db_festival_with_image[];
}
export function PageContent({ festivals }: PageContentProps) {
    return (
        <SelectView 
            options={
                festivals.map((festival, index) => (
                    {
                        element: (
                            <Link key={index} href={`/festival/${festival.id}`}>
                                <FestivalPoster data={festival} customAttributes={{style: {border: "none", boxShadow: "none", maxWidth: "300px"}}}/>
                            </Link>
                        )
                    }
                ))
            }
            selected={[]}
        />
    );
}