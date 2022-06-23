import { Params } from 'next/dist/server/router'
import Head from 'next/head'

import Layout from '../components/layout'
import { getAllFilesFrontMatter } from '../lib/posts'
import { BackToTop } from '../components/back-to-top'
import { PostList } from '../components/post-list'
import { Pagination } from '../components/post-pagination'
import { PAGE_SIZE } from '../lib/snippets'
import { HeroBanner } from '../components/hero-banner'

const Post = ({ posts, pageSize, total, pageNumber }: Params) => {

    const blogHeader = pageNumber < 2 ? <div className="mx-5 md:mx-20 py-8 md:py-16 space-y-2 md:space-y-5">
        <HeroBanner title='博文' abstract={`操千曲⽽后晓声，观千剑⽽后识器。`} tag={`${total} 篇`} />
    </div> : null

    return (
        <Layout>
            <Head>
                <title>Articles - Gauliang</title>
            </Head>
            
            {blogHeader}

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
