import Head from 'next/head'
import Layout from '../components/layout'
import { BackToTop } from '../components/back-to-top'
import { HeroBanner } from '../components/hero-banner'
import { BsBrightnessAltHigh, BsHeartFill } from 'react-icons/bs'
import Link from 'next/link'
import { getAllSeriesWithPost } from '../lib/posts'

const Series = ({ series }: { series: any[] }) => {

    const seriesElements = series.map((item: any) => {
        return <div className="w-full sm:w-1/2 px-4 " key={item.name}>
            <div className="flex-initial shadow-xl flex font-sans rounded-xl overflow-hidden dark:bg-slate-700">
                <div className="hidden md:block w-56 relative">
                    <img src={item.image} alt={item.title} className="absolute inset-0 w-full rounded-xl h-full object-cover " loading="lazy" />
                </div>
                <div className="flex-auto p-6">
                    <div className="flex flex-col">
                        <div className='flex flex-row justify-between'>
                            <div className="flex flex-row first-line space-x-2 leading-none bg-slate-100 dark:bg-slate-500 py-1 px-3 rounded-full text-slate-900">
                                <BsBrightnessAltHigh />
                                <span className='font-light text-xs '>{item.status}</span>
                            </div>
                            <div className="text-sm font-medium text-slate-400">
                                {item.count} Articles
                            </div>
                        </div>
                        <div className="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600 dark:text-white">
                            <Link key={item.name} href={`/series/${item.name}`}>{item.title}</Link>
                        </div>
                    </div>
                    <div className="flex items-baseline mb-6 pb-6 border-b border-slate-200 dark:border-slate-600"></div>
                    <div className="flex space-x-4 mb-5 text-sm font-medium">
                        <div className="flex-auto flex space-x-4">
                            <Link key={item.name} href={`/series/${item.name}`} className="inline-block h-10 px-6 font-semibold rounded-full bg-violet-600 text-white leading-10">
                                    开始学习
                                </Link>
                            <button className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900 dark:text-white" type="button">
                                主题介绍
                            </button>
                        </div>
                        <button className="flex-none flex items-center justify-center w-9 h-9 rounded-full text-violet-600 bg-violet-50" type="button" aria-label="Like">
                            <BsHeartFill />
                        </button>
                    </div>
                    <p className="text-sm text-slate-500">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    })

    return (
        <Layout>
            <Head>
                <title>Series - Gauliang</title>
            </Head>

            <HeroBanner title='Series' tag={`${series.length} 个`} abstract='纸上得来终觉浅，绝知此事要躬行。' center />

            <main className='flex flex-wrap justify-center my-16 -mx-4 '>
                {seriesElements}
            </main>

            <BackToTop />
        </Layout>
    )
}

export default Series

export async function getStaticProps() {

    const series = getAllSeriesWithPost()
    return {
        props: {
            series
        }
    }
}
