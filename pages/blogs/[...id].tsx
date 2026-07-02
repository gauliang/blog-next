import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllFrontMatterByType, getAllPostIdByType, getPostData } from '../../lib/posts'
import { BackToTop } from '../../components/back-to-top'
import { PostContent } from '../../components/post-content'
import { useEffect, useState } from 'react'
import { HotLoad } from '../../components/hot-load'


const Post = ({ id, post, prev, next }: { id: any; post: any; prev: any; next: any }) => {
    const [postData, setPostData] = useState(post)
    
    useEffect(()=>{
        setPostData(post)
    },[post])

    return (
        <Layout>
            <Head>
                <title>{`${postData.title} - Gauliang`}</title>
            </Head>
            <PostContent post={postData} prev={prev} next={next} />
            <BackToTop />
            <HotLoad setPost={setPostData} id={id} />
        </Layout>
    )
}

export default Post

export async function getStaticProps({ params }: { params: any }) {
    const slug = params.id.join('/')
    const id = ['posts', ...params.id]
    const post = await getPostData(id)
    const allPosts = getAllFrontMatterByType('posts')
    const index = allPosts.findIndex(item => {
        return item.slug === slug
    })

    return {
        props: {
            id,
            post,
            prev: allPosts[index + 1] || null,
            next: allPosts[index - 1] || null,
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIdByType()
    return {
        paths,
        fallback: false
    }
}