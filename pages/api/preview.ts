// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPostData } from '../../lib/posts'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (process.env.NODE_ENV === 'development') {
        const id = req.body
        const post = await getPostData([...id])
        return res.status(200).json(post)
    } else {
        return res.status(200)
    }
}