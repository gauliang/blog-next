import path from "path";
import fs from "fs"
import matter from 'gray-matter'
import html from 'remark-html';
import remarkGfm from 'remark-gfm'
import glob from "glob"
import prism from 'remark-prism';
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import { generateHeadingId, generateToc, remarkCodepen, remarkImage } from './remark-plugins'


import { upperCaseFirst } from 'upper-case-first'

const postDirectory = path.join(process.cwd(), '_posts');

export function getAllPostIds() {
    const fileNames = glob.sync(`**/*.md`, { cwd: postDirectory });
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '').split('/')
            }
        }
    })
}


function htmlTransform(html: string): string {
    html = html.replace(/<table>([\s\S]+?)<\/table>/igm, "<div class=\"table-responsive\"><table>$1</table></div>")
    html = html.replace(/<a/img, '<a target="_blank" target="_blank" class="ext-link"')
    return html
}

export async function getPostData(params: any) {

    const { id } = params
    const fullPath = path.join(postDirectory, `${id.join('/')}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(html, { allowDangerousHtml: true, sanitize: false })
        .use(prism)
        .use(remarkImage, { perfix: id })
        .use(remarkCodepen as any)
        .use(generateHeadingId as any)
        .use(generateToc as any)
        .process(matterResult.content);

    const contentHtml = htmlTransform(processedContent.toString())

    return {
        id,
        contentHtml,
        toc: processedContent.data.toc,
        ...JSON.parse(JSON.stringify(matterResult.data)),
    };
}

export function getAllFilesFrontMatter(): any[] {
    const fileNames = glob.sync(`**/*.md`, { cwd: postDirectory, absolute: true });

    const allFrontMatter: any[] = []

    fileNames.forEach((file) => {
        if (path.extname(file) !== '.md') {
            return
        }
        const source = fs.readFileSync(file, 'utf8')
        const { data: frontmatter } = matter(source)
        if (frontmatter.draft !== true) {
            allFrontMatter.push({
                ...frontmatter,
                slug: path.relative(postDirectory, file).replace(/\.(mdx|md)/, ''),
                date: frontmatter.date ? new Date(frontmatter.date).getTime() : null,
            })
        }
    })
    return allFrontMatter.sort((x, y) => y.date - x.date)
}

export function getAllTags() {
    const allPosts = getAllFilesFrontMatter()
    const data: any = {}

    allPosts.forEach(post => {
        const { tags = [] } = post
        tags.forEach((tag: string) => {
            const key = tag.toLowerCase()
            if (data[key]) {
                data[key].count++
                data[key].posts.push(post)
            } else {
                data[key] = { name: tag, title: upperCaseFirst(tag), count: 1, posts: [post] }
            }
        });
    })

    const list = Array.from(Object.keys(data), k => {
        return data[k]
    })

    list.sort((a, b) => b.count - a.count)

    return list
}