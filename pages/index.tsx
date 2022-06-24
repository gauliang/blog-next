import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'
import { BackToTop } from '../components/back-to-top'
import { HeroBanner } from '../components/hero-banner'
import Layout from '../components/layout'
import { PostList } from '../components/post-list'
import { PAGE_SIZE } from '../lib/snippets'
import { getAllFrontMatterByType } from '../lib/posts'

export async function getStaticProps() {
    const posts = await getAllFrontMatterByType().slice(0, PAGE_SIZE)

    return { props: { posts } }
}

const Home: NextPage = ({ posts }: any) => {
    return (
        <Layout>
            <Head>
                <title>Gauliang‘s blog</title>
            </Head>

            <HeroBanner title='大道至简' abstract='天地之所以能长且久者，以其不自生也，故能长生。' />

            <main className='mx-5 md:mx-20'>
                <PostList posts={posts} />
            </main>
            <BackToTop />
        </Layout>
    )
}

export default Home
