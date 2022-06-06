import { Params } from 'next/dist/server/router'
import Head from 'next/head'

import Layout from '../components/layout'
import { getAllTags } from '../lib/posts'
import { BackToTop } from '../components/back-to-top'
import { HeroBanner } from '../components/hero-banner'
import Link from 'next/dist/client/link'
import { BsBoxArrowInUpRight } from 'react-icons/bs'

const Tags = ({ tags, tagsByFirstLetter }: Params) => {

    const list = tags.map((tag: any) => {
        return (
            <Link key={tag.name} href={{ pathname: `/tags/${tag.name}` }}>
                <div className='flex flex-col cursor-pointer p-4 transition-all rounded-md bg-slate-100 hover:bg-blue-500 hover:text-white dark:bg-slate-700 dark:hover:bg-slate-600 relative'>
                    <span className='flex flex-row justify-between'>
                        <span className='font-light leading-none opacity-60'>{tag.count}</span>
                        <span className='opacity-30'><BsBoxArrowInUpRight /></span>
                    </span>
                    <span className='opacity-100'>{tag.title}</span>

                </div>
            </Link>
        )
    })

    const listByLetter = tagsByFirstLetter.map((item: any) => {
        return <div key={item.title} className='pb-16'>
            <h3 className=' text-4xl  text-blue-500'>{item.title}</h3>
            <div className='mt-2'>
                {item.tags.map((tag: any) => {
                    return <Link key={tag.name} href={{ pathname: `/tags/${tag.name}` }}>
                        <a className='block mt-3'>
                            {tag.title} 
                            <span className='opacity-50 text-sm ml-2 align-top'>{tag.count}</span>
                        </a>
                    </Link>
                })}
            </div>
        </div>
    })

    return (
        <Layout>
            <Head>
                <title>Tags - Gauliang</title>
            </Head>

            <div className=" mx-20 space-y-2 py-16 md:space-y-5">
                <HeroBanner title='标签' abstract={`共 ${tags.length} 个标签`} />
            </div>

            <main className='mx-20 pb-20'>
                <div className='columns-5 gap-16 border-t pt-12 dark:border-slate-700'>
                    {listByLetter}
                    {/* {list} */}
                </div>
            </main>
            <BackToTop />
        </Layout>
    )
}

export default Tags

export async function getStaticProps({ params }: Params) {
    const tags = getAllTags()

    const _tagsByFirstLetter: any = {}

    tags.forEach(item => {
        let fl = item.title.substring(0, 1)
        if (/[a-zA-Z0-9]/.test(fl) === false) {
            fl = 'Zh'
        }
        if (_tagsByFirstLetter[fl]) {
            _tagsByFirstLetter[fl].tags.push(item)
        } else {
            _tagsByFirstLetter[fl] = { title: fl, tags: [item] }
        }
    })

    const tagsByFirstLetter = Array.from(Object.keys(_tagsByFirstLetter), k => {
        return _tagsByFirstLetter[k]
    }).sort((a: any, b: any) => { return a.title > b.title ? 0 : -1 })

    console.log(tagsByFirstLetter);


    return {
        props: {
            tags,
            tagsByFirstLetter
        }
    }
}
