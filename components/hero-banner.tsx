import { Params } from "next/dist/server/router";

export function HeroBanner({ title, abstract }: Params) {
    return <>
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
        </h1>
        <p className="text-md font-light leading-7 text-gray-500 dark:text-gray-400">
            {abstract}
        </p>
    </>
}