import { Params } from "next/dist/server/router";
import { HeroBanner } from "./hero-banner";

export function BlogHeader({ pageNumber, total }: Params) {
    
    const head = <div className="mx-5 md:mx-20 py-8 md:py-16 space-y-2 md:space-y-5">
        <HeroBanner title='博闻' abstract={`不积跬步，无以致千里；不积小流，无以成江海。`} />
    </div>

    return pageNumber < 2 ? head : null
}