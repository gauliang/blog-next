import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'
import { BackToTop } from '../components/back-to-top'
import { HeroBanner } from '../components/hero-banner'
import Layout from '../components/layout'
import { PostList } from '../components/post-list'
import { PAGE_SIZE } from '../lib/config'
import { getAllFilesFrontMatter } from '../lib/posts'

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter().slice(0, PAGE_SIZE)

    return { props: { posts } }
}


const Home: NextPage = ({ posts }: any) => {
    return (
        <Layout>
            <Head>
                <title>Gauliang‘s blog</title>
            </Head>

            <div className="mx-5 md:mx-20 py-8 md:py-16 space-y-2 md:space-y-5">
                <HeroBanner title='大道至简' abstract='天地之所以能长且久者，以其不自生也，故能长生。' />
            </div>

            <main className='mx-5 md:mx-20'>
                <PostList posts={posts} />
                <Link href={{ pathname: '/posts/page/2' }}>
                    <button className='all-post transition-all border border-solid rounded-full px-8 flex flex-row items-center py-2 space-x-3 hover:px-12 mx-auto my-16 hover:border-blue-600 hover:text-blue-600 dark:border-gray-500 '>
                        <span>All Posts</span>
                        <BsArrowRight />
                    </button>
                </Link>
            </main>
            <BackToTop />
        </Layout>
    )
}

export default Home
