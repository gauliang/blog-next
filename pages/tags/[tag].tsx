import { Params } from 'next/dist/server/router'
import Head from 'next/head'

import Layout from '../../components/layout'
import { getAllTags } from '../../lib/posts'
import { BackToTop } from '../../components/back-to-top'
import { PostList } from '../../components/post-list'
import { HeroBanner } from '../../components/hero-banner'
import {upperCaseFirst} from 'upper-case-first'

const Page = ({ posts, total, tag }: Params) => {

    return (
        <Layout>
            <Head>
                <title>{upperCaseFirst(tag)} - Tags - Gauliang</title>
            </Head>

            <div className="mx-5 md:mx-20 py-8 md:py-16 space-y-2 md:space-y-5">
                <HeroBanner title={upperCaseFirst(tag)} abstract={`共 ${total} 个`} />
            </div>

            <main className='mx-5 md:mx-20 '>
                <PostList posts={posts} />
            </main>

            <BackToTop />

        </Layout>
    )
}

export default Page

export async function getStaticProps({ params }: Params) {

    const allTags = getAllTags()
    const posts = allTags.find(tag => {
        return tag.name.toLowerCase() === params.tag.toLowerCase()
    }).posts

    return {
        props: {
            tag: params.tag,
            total: posts.length,
            posts: posts.slice(0, 20)
        }
    }
}

export async function getStaticPaths() {
    const allTags = getAllTags()
    const paths = allTags.map(tag => {
        return {
            params: {
                tag: tag.name
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}
