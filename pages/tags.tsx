import { Params } from 'next/dist/server/router'
import Head from 'next/head'

import Layout from '../components/layout'
import { getAllTags } from '../lib/posts'
import { BackToTop } from '../components/back-to-top'
import { HeroBanner } from '../components/hero-banner'
import Link from 'next/dist/client/link'

const Tags = ({ tags, tagsByFirstLetter }: Params) => {

    const listByLetter = tagsByFirstLetter.map((item: any) => {
        return <div key={item.title} className='pb-8 md:pb-16'>
            <h3 className='text-2xl md:text-4xl  text-blue-500'>{item.title}</h3>
            <div className='mt-2'>
                {item.tags.map((tag: any) => {
                    return <Link key={tag.name} href={{ pathname: `/tags/${tag.name}` }}>
                        <a className='block md:mt-3'>
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

            <div className="mx-5 md:mx-20 py-8 md:py-16 space-y-2 md:space-y-5">
                <HeroBanner title='标签' abstract={'海纳百川，有容乃大；壁立千仞，无欲则刚。'} tag={`${tags.length} 个`} />
            </div>

            <main className='mx-5 md:mx-20 pb-20'>
                <div className='columns-2 md:columns-5 gap-2 md:gap-16 border-t pt-12 dark:border-slate-700'>
                    {listByLetter}
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

    return {
        props: {
            tags,
            tagsByFirstLetter
        }
    }
}
