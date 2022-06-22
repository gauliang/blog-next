import Head from 'next/head'
import Layout from '../components/layout'
import { getAllTags } from '../lib/posts'
import { BackToTop } from '../components/back-to-top'
import { HeroBanner } from '../components/hero-banner'

const Tags = () => {

    return (
        <Layout>
            <Head>
                <title>About - Gauliang</title>
            </Head>

            <div className="mx-5 md:mx-20 py-8 md:py-16 space-y-2 md:space-y-5 border-b dark:border-slate-700">
                <HeroBanner title='About' abstract='修身、齐家、治国、平天下。' />
            </div>

            <div className="space-y-2 my-16 md:space-y-5 pr-10 py-20 md:py-52 text-center ">
                <HeroBanner title='' abstract='暂时，还没想好放什么。' />
            </div>
            
            <BackToTop />
        </Layout>
    )
}

export default Tags

export async function getStaticProps() {
    const tags = getAllTags()
    return {
        props: {
            tags
        }
    }
}
