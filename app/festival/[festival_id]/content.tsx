import { db_festival } from "@/libs/db/db.type";
import { FestivalPoster } from "@/page_components/poster/festival";


type PageContentProps = {
    festival: db_festival;
};

export function PageContent({ festival }: PageContentProps) {
    return (
        <div>
            <FestivalPoster key={festival.id} data={festival} customAttributes={{style: {maxWidth: "60%", margin: "0 auto", border: "none", boxShadow: "none"}}}/>
        </div>
    );
}