import { Params } from 'next/dist/server/router'
import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllFrontMatterByType, getAllPostIdByType, getPostData } from '../../lib/posts'
import { BackToTop } from '../../components/back-to-top'
import { PostContent } from '../../components/post-content'

const Post = ({ post, prev, next }: Params) => {
    return (
        <Layout>
            <Head>
                <title>{post.title} - Gauliang</title>
            </Head>
            <PostContent post={post} prev={prev} next={next} />
            <BackToTop />
        </Layout>
    )
}

export default Post

export async function getStaticProps({ params }: Params) {
    const slug = params.id.join('/')
    const post = await getPostData(['posts', ...params.id])
    const allPosts = getAllFrontMatterByType('posts')
    const index = allPosts.findIndex(item => {
        return item.slug === slug
    })

    return {
        props: {
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