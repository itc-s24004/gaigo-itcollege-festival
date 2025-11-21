"use client";

import { db_festival } from "@/libs/db/db.type";
import { FestivalPoster } from "@/page_components/poster/festival";
import { SelectView } from "@/page_components/tool/select_view";
import Link from "next/link";

type PageContentProps = {
    festivals: db_festival[];
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