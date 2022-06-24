import dayjs from "dayjs";
import { Params } from "next/dist/server/router";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight, BsInfoCircle } from "react-icons/bs";
import { PostContentArticle } from "./post-content-article";
import { PostContentToc } from "./post-content-toc";

export function PostContent({ post, prev, next }: Params) {

    const tags = post.tags && post.tags.map((tag: string) => {
        return <Link key={tag} href={{ pathname: `/tags/${tag}` }}>
            <a key={tag} className='mr-4 hover:underline'>{tag.toUpperCase()}</a>
        </Link>
    })

    const prevLink = prev ? (
        <Link href={{ pathname: prev.path }}>
            <a className="prev-post">
                <BsArrowLeft />
                <div className="text">
                    <div className="caption">{dayjs(prev.date).format('YYYY-MM-DD HH:mm:ss')}</div>
                    <div className="title">{prev.title}</div>
                </div>
            </a>
        </Link>
    ) : <div></div>

    const nextLink = next ? (
        <Link href={{ pathname: next.path }}>
            <a className="next-post">
                <div className="text">
                    <div className="caption">{dayjs(next.date).format('YYYY-MM-DD HH:mm:ss')}</div>
                    <div className="title">{next.title}</div>
                </div>
                <BsArrowRight />
            </a>
        </Link>
    ) : ''

    return <div className='mx-5 xl:mx-10 flex flex-row md:space-x-8'>
        <div className="hidden md:block md:basis-1/6 shrink-0 py-20">
            <div className='sticky top-28'>
                <div className='uppercase text-black dark:text-white font-bold'>Contents</div>
                <PostContentToc toc={post.toc} />
            </div>
        </div>
        <div className="basis-3/3 w-full md:w-1 md:basis-5/6 xl:basis-4/6">
            <div className='md:mb-12 border-gray-200 py-8 md:py-20'>
                <div className="flex space-x-2 items-center text-sm font-light text-gray-600 dark:text-gray-400">
                    <BsInfoCircle />
                    <div>阅读全文约需 3 分钟</div>
                    <div className="grow"></div>
                </div>
                <h1 className='text-2xl md:text-5xl my-4 md:my-8 leading-tight subpixel-antialiased font-semibold'>{post.title}</h1>
                <div className='text-sm text-gray-600 dark:text-gray-400 font-light flex items-center space-x-2'>
                    <time>{dayjs(post.date).format('YYYY-MM-DD HH:mm:ss')}</time>
                    <span>By</span>
                    <span> Gauliang</span>
                </div>
            </div>

            <PostContentArticle contentHtml={post.contentHtml} />

            <div className='flex flex-wrap items-center md:space-x-2 my-24 pt-8 border-t border-solid border-gray-100 dark:border-gray-600'>
                <div className='font-bold text-black text-base dark:text-white '><strong>标签：</strong></div>
                <div className='text-blue-600 flex text-sm flex-wrap dark:text-slate-400'>
                    {tags}
                </div>
            </div>

            <div className="next-and-prev-post">
                {prevLink}
                {nextLink}
            </div>
        </div>
        <div className="hidden xl:block xl:basis-1/6 shrink-0 relative bg-slate-300"></div>
    </div>
}