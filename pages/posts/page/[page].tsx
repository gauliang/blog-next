import { Params } from 'next/dist/server/router'
import Head from 'next/head'

import Layout from '../../../components/layout'
import { getAllFilesFrontMatter, getAllPostIds } from '../../../lib/posts'
import { BackToTop } from '../../../components/back-to-top'
import { PostList } from '../../../components/post-list'
import { PAGE_SIZE } from '../../../lib/config'
import { Pagination } from '../../../components/post-pagination'
import { HeroBanner } from '../../../components/hero-banner'
import { BlogHeader } from '../../../components/blog-headr'

const Page = ({ posts, pageSize, total, pageNumber }: Params) => {

    return (
        <Layout>
            <Head>
                <title>Articles - Gauliang</title>
            </Head>

            <BlogHeader {...{ pageNumber, total }} />
            <main className='mx-5 md:mx-20 '>
                <PostList posts={posts} />
                <Pagination {...{ pageSize, total, pageNumber }} />
            </main>

            <BackToTop />

        </Layout>
    )
}

export default Page

export async function getStaticProps({ params }: Params) {

    const allPosts = getAllFilesFrontMatter()
    const pageSize = PAGE_SIZE;
    const total = allPosts.length;
    const pageNumber = params.page
    const start = (pageNumber - 1) * pageSize
    const posts = allPosts.slice(start, start + pageSize)

    return {
        props: {
            posts,
            pageSize,
            total,
            pageNumber
        }
    }
}

export async function getStaticPaths() {
    const totalPosts = getAllPostIds()
    const totalPages = Math.ceil(totalPosts.length / PAGE_SIZE)
    const paths = Array.from({ length: totalPages }, (_, i) => {
        return {
            params: {
                page: (i + 1).toString()
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}
