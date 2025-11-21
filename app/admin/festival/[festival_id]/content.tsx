import { db_festival_with_image } from "@/libs/db/db.data";
import { FestivalPoster } from "@/page_components/poster/festival";

type PageContentProps = {
    festival?: db_festival_with_image;
};

export function PageContent({ festival }: PageContentProps) {
    
    return (
        festival ? (
            <FestivalPoster data={festival} customAttributes={{style: {margin: "0 auto"}}}/>
        ) : null
    )
}