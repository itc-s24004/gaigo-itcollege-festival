"use client";

import { db_festival_with_image } from "@/libs/db/db.data";
import { FestivalPoster } from "@/page_components/poster/festival";
import { SelectView } from "@/page_components/tool/select_view";
import { site_setting } from "@/site_settings";
import Link from "next/link";

type PageContentProps = {
    settings: site_setting;
    festivals: db_festival_with_image[];
}
export function PageContent({ settings, festivals }: PageContentProps) {
    const selectedFestival = festivals.findIndex((fes) => fes.id === settings.festival);
    


    return (
        <div>
            <h1>管理者ページ</h1>
            {
                <SelectView 
                    options={
                        festivals.map((festival, index) => (
                            {
                                element: (
                                    <Link href={`/admin/${festival.id}`}>
                                        <FestivalPoster key={index} data={festival} customAttributes={{style: { boxShadow: "none"}}}/>
                                    </Link>
                                ),
                                // onSelect: () => {
                                //     setSelectedFestival(selectedFestival === index ? null : index);
                                // }
                            }
                        ))
                    }
                    optionGenerator={(i) => {
                        const isSelected = selectedFestival === i;
                        const defaultStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
                            width: "300px"
                        };
                        if (isSelected) {
                            return {
                                style: {
                                    ...defaultStyle
                                }
                            };
                        } else {
                            return {
                                style: defaultStyle
                            };
                        }
                    }}
                    selected={selectedFestival === null ? [] : [selectedFestival]}
                >

                </SelectView>
                
            }
            {/* {
                selectedFestival !== null && (
                    <Image 
                        src={
                            festivals[selectedFestival].image ? festivals[selectedFestival].image : "/no_image.png"
                        }
                        alt={""} 
                        width={400} 
                        height={400}
                    />
                )
            } */}
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