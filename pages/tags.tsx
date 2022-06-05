import { Params } from 'next/dist/server/router'
import Head from 'next/head'

import Layout from '../components/layout'
import { getAllTags } from '../lib/posts'
import { BackToTop } from '../components/back-to-top'
import { HeroBanner } from '../components/hero-banner'
import Link from 'next/dist/client/link'
import { BsBoxArrowInUpRight } from 'react-icons/bs'

const Tags = ({ tags }: Params) => {

    const list = tags.map((tag: any) => {
        return (
            <li
                key={tag.name}
                className=''
            >
                <Link href={{ pathname: `/tags/${tag.name}` }}>
                    <div className='flex flex-col cursor-pointer p-4 transition-all rounded-md bg-slate-100 hover:bg-blue-500 hover:text-white dark:bg-slate-700 dark:hover:bg-slate-600 relative'>
                        <span className='flex flex-row justify-between'>
                            <span className='font-light leading-none opacity-60'>{tag.count}</span>
                            <span className='opacity-30'><BsBoxArrowInUpRight /></span>
                        </span>
                        <span className='opacity-100'>{tag.title}</span>

                    </div>
                </Link>
            </li>
        )
    })

    return (
        <Layout>
            <Head>
                <title>Tags - Gauliang</title>
            </Head>

            <div className="mx-20 space-y-2 py-16 md:space-y-5">
                <HeroBanner title='标签' abstract={`共 ${tags.length} 个标签`} />
            </div>

            <main className='mx-20 pb-60'>
                <ul className='flex flex-wrap gap-4 border-t pt-16 dark:border-slate-700'>
                    {list}
                </ul>
            </main>
            <BackToTop />
        </Layout>
    )
}

export default Tags

export async function getStaticProps({ params }: Params) {
    const tags = getAllTags()

    return {
        props: {
            tags
        }
    }
}
