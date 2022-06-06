import Head from 'next/head'
import Layout from '../components/layout'
import { BackToTop } from '../components/back-to-top'
import { HeroBanner } from '../components/hero-banner'
import { BsBrightnessAltHigh, BsHeartFill } from 'react-icons/bs'

const Series = () => {

    return (
        <Layout>
            <Head>
                <title>Series - Gauliang</title>
            </Head>

            <div className="mx-5 md:mx-20 py-8 md:py-16 space-y-2 md:space-y-5">
                <HeroBanner title='Series' abstract='不经一番寒彻骨，怎得梅花扑鼻香。' />
            </div>

            <main className='pt-16 md:pt-20 flex flex-row md:space-x-12 justify-center pb-20 md:pb-60 border-t dark:border-slate-700'>
                <div className="flex font-sans shadow-xl md:basis-1/2 rounded-md overflow-hidden dark:bg-slate-700">
                    <div className="hidden md:block w-56 relative">
                        <img src="/series/react.jpg" alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
                    </div>
                    <div className="flex-auto p-6">
                        <div className="flex flex-col">
                            <div className='flex flex-row justify-between'>
                                <div className="flex flex-row first-line space-x-2 leading-none bg-slate-100 dark:bg-slate-500 py-1 px-3 rounded-full text-slate-900">
                                    <BsBrightnessAltHigh />
                                    <span className='font-light text-xs '>准备中</span>
                                </div>
                                <div className="text-sm font-medium text-slate-400">
                                    36 Articles
                                </div>
                            </div>
                            <div className="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600 dark:text-white">
                                深入 React
                            </div>
                        </div>
                        <div className="flex items-baseline mb-6 pb-6 border-b border-slate-200 dark:border-slate-600"></div>
                        <div className="flex space-x-4 mb-5 text-sm font-medium">
                            <div className="flex-auto flex space-x-4">
                                <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white" type="submit">
                                    开始学习
                                </button>
                                <button className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900 dark:text-white" type="button">
                                    主题介绍
                                </button>
                            </div>
                            <button className="flex-none flex items-center justify-center w-9 h-9 rounded-full text-violet-600 bg-violet-50" type="button" aria-label="Like">
                                <BsHeartFill />
                            </button>
                        </div>
                        <p className="text-sm text-slate-500">
                            深入 React 系列之源码
                        </p>
                    </div>
                </div>                
            </main>
            <BackToTop />
        </Layout>
    )
}

export default Series

export async function getStaticProps() {

    return {
        props: {

        }
    }
}
