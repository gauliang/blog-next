import dayjs from "dayjs"
import { Params } from "next/dist/server/router"
import Link from "next/link"

export function PostList({ posts }: Params) {

    return <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
        {posts.map((post: any) => {
            return (
                <li key={post.title} className="py-8 md:py-12 border-t border-gray-200 dark:border-gray-700">
                    <article>
                        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-base xl:space-y-0">
                            <dl>
                                <dt className="sr-only">Published on</dt>
                                <dd className="text-sm md:text-base font-light md:font-medium leading-6 text-gray-500 dark:text-gray-400">
                                    <time dateTime={post.date}>{dayjs(post.date).format('YYYY-MM-DD HH:mm:ss')}</time>
                                </dd>
                            </dl>
                            <div className="space-y-5 xl:col-span-3">
                                <div className="space-y-3 md:space-y-6">
                                    <div>
                                        <h2 className="text-lg md:text-3xl font-bold leading-8 tracking-tight">
                                            <Link href={{ pathname: `/posts/${post.slug}` }}>
                                                <a className="text-gray-900 dark:text-gray-100">
                                                    {post.title}
                                                </a>
                                            </Link>
                                        </h2>
                                        <div className="flex flex-wrap">
                                            {post.tags && post.tags.map((tag: string) => {
                                                return (
                                                    <Link key={tag} href={{ pathname: `/tags/${tag}` }}>
                                                        <a className="mr-3 mt-2 md:mt-3 text-sm font-light md:uppercase text-blue-500 dark:text-blue-500 dark:hover:underline hover:text-blue-900">
                                                            {tag}
                                                        </a>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="prose font-light max-w-none text-gray-500 dark:text-gray-400">
                                        {post.description}
                                    </div>
                                </div>
                                <div className="text-base font-light leading-6 ">
                                    <Link href={{ pathname: `/posts/${post.slug}` }}>
                                        <a className="text-primary-500 hover:text-primary-600 text-blue-500 hover:text-blue-900 dark:hover:text-blue-500 dark:hover:underline">Read more →</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                </li>
            )
        })}
    </ul>
}