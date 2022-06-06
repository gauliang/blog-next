import { Params } from 'next/dist/server/router'
import Head from 'next/head'

import Layout from '../components/layout'
import { getAllFilesFrontMatter } from '../lib/posts'
import { BackToTop } from '../components/back-to-top'
import { PostList } from '../components/post-list'
import { Pagination } from '../components/post-pagination'
import { BlogHeader } from '../components/blog-headr'
import { PAGE_SIZE } from '../lib/config'

const Post = ({ posts, pageSize, total, pageNumber }: Params) => {

    return (
        <Layout>
            <Head>
                <title>Articles - Gauliang</title>
            </Head>
            <BlogHeader {...{ pageNumber, total }} />
            <main className='mx-5 md:mx-20'>
                <PostList posts={posts} />
                <Pagination {...{ pageSize, total, pageNumber }} />
            </main>
            <BackToTop />
        </Layout>
    )
}

export default Post

export async function getStaticProps({ params }: Params) {
    const allPosts = getAllFilesFrontMatter()
    const pageSize = PAGE_SIZE;
    const pageNumber = 1;
    const total = allPosts.length;
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
