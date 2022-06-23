import { Params } from 'next/dist/server/router'
import Head from 'next/head'

import Layout from '../../components/layout'
import { getAllSeries, getAllTags } from '../../lib/posts'
import { BackToTop } from '../../components/back-to-top'
import { PostList } from '../../components/post-list'
import { HeroBanner } from '../../components/hero-banner'
import {upperCaseFirst} from 'upper-case-first'

const Page = ({ series }: Params) => {

    return (
        <Layout>
            <Head>
                <title>{upperCaseFirst(series.title)} - Series - Gauliang</title>
            </Head>

            <div className="mx-5 md:mx-20 py-8 md:py-16 space-y-2 md:space-y-5">
                <HeroBanner title={upperCaseFirst(series.title)} abstract={series.description} tag={`${series.count} 篇`} />
            </div>

            <main className='mx-5 md:mx-20 '>
                <PostList posts={series.articles} />
            </main>

            <BackToTop />

        </Layout>
    )
}

export default Page

export async function getStaticProps({ params }: Params) {

    const allSeries = getAllSeries()
    
    const series = allSeries.find(series => {
        return series.name === params.series.toLowerCase()
    })

    return {
        props: {
            series
        }
    }
}

export async function getStaticPaths() {
    const allSeries = getAllSeries()
    const paths = allSeries.map(series => {
        return {
            params: {
                series: series.name
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}
