import { Params } from 'next/dist/server/router'
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../components/layout'
import { getAllFilesFrontMatter, getAllPostIds, getPostData } from '../../lib/posts'
import { BsInfoCircle, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import dayjs from 'dayjs'
import { PostContentToc } from '../../components/post-content-toc'
import { PostContentArticle } from '../../components/post-content-article'
import { BackToTop } from '../../components/back-to-top'

const Post = ({ post, prev, next }: Params) => {

    const tags = post.tags && post.tags.map((tag: string) => {
        return <Link key={tag} href={{ pathname: `/tags/${tag}` }}>
            <a key={tag} className='mx-2 hover:underline'>{tag.toUpperCase()}</a>
        </Link>
    })

    const prevLink = prev ? (
        <Link href={{ pathname: '/posts/' + prev.slug }}>
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
        <Link href={{ pathname: '/posts/' + next.slug }}>
            <a className="next-post">
                <div className="text">
                    <div className="caption">{dayjs(next.date).format('YYYY-MM-DD HH:mm:ss')}</div>
                    <div className="title">{next.title}</div>
                </div>
                <BsArrowRight />
            </a>
        </Link>
    ) : ''

    return (
        <Layout>
            <Head>
                <title>{post.title} - Gauliang</title>
            </Head>

            <div className='flex flex-row space-x-8'>
                <div className="basis-1/6 shrink-0 py-20">
                    <div className='sticky top-28'>
                        <div className='uppercase text-black dark:text-white font-bold'>Contents</div>
                        <PostContentToc toc={post.toc} />
                    </div>
                </div>
                <div className="basis-2/3 w-1">
                    <div className='mb-12  border-gray-200 py-20'>
                        <div className="flex space-x-2 items-center text-sm font-light text-gray-600 dark:text-gray-400">
                            <BsInfoCircle />
                            <div>阅读全文约需 3 分钟</div>
                            <div className="grow"></div>
                        </div>
                        <h1 className='text-5xl mt-8 mb-8 leading-tight subpixel-antialiased font-semibold'>{post.title}</h1>
                        <div className='text-sm text-gray-600 dark:text-gray-400 font-light flex items-center space-x-2'>
                            <time>{dayjs(post.date).format('YYYY-MM-DD HH:mm:ss')}</time>
                            <span>By</span>
                            <span> Gauliang</span>
                        </div>
                    </div>

                    <PostContentArticle contentHtml={post.contentHtml} />

                    <div className='flex items-center space-x-2 my-24 pt-8 border-t border-solid border-gray-100 dark:border-gray-600'>
                        <div className='font-bold text-black text-base dark:text-white'><strong>标签：</strong></div>
                        <div className='text-blue-600 dark:text-slate-400'>
                            {tags}
                        </div>
                    </div>

                    <div className="next-and-prev-post">
                        {prevLink}
                        {nextLink}
                    </div>
                </div>
                <div className="basis-1/6  shrink-0 relative"></div>
            </div>

            <BackToTop />


        </Layout>
    )
}

export default Post

export async function getStaticProps({ params }: Params) {
    const slug = params.id.join('/')

    const post = await getPostData(params)
    const allPosts = getAllFilesFrontMatter()
    const index = allPosts.findIndex(item => {
        return item.slug === slug
    })

    return {
        props: {
            post,
            prev: allPosts[index + 1] || null,
            next: allPosts[index - 1] || null,
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}