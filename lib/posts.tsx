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
import config from '../lib/config.json'

import { upperCaseFirst } from 'upper-case-first'

const BASE_URL = path.join(process.cwd(), '_contents')

export function getAllPostIdByType(type = 'posts') {
    const fileNames = glob.sync(`**/*.md`, { cwd: BASE_URL + `/${type}` });

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

export async function getPostData(id: any) {

    const fullPath = path.join(BASE_URL, `${id.join('/')}.md`)
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
        words: matterResult.content.replace(/\s/gm,'').length,
        toc: processedContent.data.toc,
        ...JSON.parse(JSON.stringify(matterResult.data)),
    };
}

export function getAllFrontMatterByType(type = 'all'): any[] {
    const filter = type === 'all' ? ['posts', 'series'] : [type]
    const fileNames = glob.sync(`**/*.md`, { cwd: BASE_URL, absolute: true });

    const allFrontMatter: any[] = []

    fileNames.forEach((file) => {
        if (path.extname(file) !== '.md') {
            return
        }
        const source = fs.readFileSync(file, 'utf8')
        const { data: frontmatter } = matter(source)
        const isDraft = process.env.NODE_ENV === 'development' ? false : frontmatter.draft === true

        if (isDraft === false && filter.includes(frontmatter.type)) {
            allFrontMatter.push({
                ...frontmatter,
                path: (frontmatter.type === 'posts' ? '/blogs/' : '/') + path.relative(frontmatter.series ? BASE_URL : BASE_URL + '/posts', file).replace(/\.(mdx|md)/, ''),
                slug: path.relative(frontmatter.series ? BASE_URL : BASE_URL + '/posts', file).replace(/\.(mdx|md)/, ''),
                date: frontmatter.date ? new Date(frontmatter.date).getTime() : null,
            })
        }
    })
    return allFrontMatter.sort((x, y) => y.date - x.date)
}

export function getAllTags() {
    const allPosts = getAllFrontMatterByType('all')
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

export function getAllSeriesWithPost() {
    const allPosts = getAllFrontMatterByType('series')
    const data: any = {}

    config.series.forEach((s: any) => {
        data[s.name] = {
            ...s,
            count: 0,
            articles: []
        }
    });

    allPosts.reverse()
    allPosts.forEach(post => {
        if (post.type === 'series') {
            data[post.series].count++
            data[post.series].articles.push(post)
        }
    })

    const list = Array.from(Object.keys(data), k => {
        return data[k]
    })

    return list
}

// Write an Amis schema to generate a form
export function getSchemaFromFrontMatter(frontMatter: any) {
    const schema = {
        type: 'page',
        title: 'Edit Post',
        body: {
            type: 'form',
            api: {
                method: 'post',
                url: '/api/save-post'
            },
            controls: [
                {
                    type: 'text',
                    name: 'title',
                    label: 'Title',
                    required: true,
                    validations: {
                        minLength: 2,
                        maxLength: 100
                    },
                    value: frontMatter.title
                },
                {
                    type: 'text',
                    name: 'slug',
                    label: 'Slug',
                    required: true,
                    validations: {
                        minLength: 2,
                        maxLength: 100
                    },
                    value: frontMatter.slug
                },
                {
                    type: 'text',
                    name: 'date',
                    label: 'Date',
                    required: true,
                    value: frontMatter.date
                },
                {
                    type: 'text',
                    name: 'tags',
                    label: 'Tags',
                    required: true,
                    value: frontMatter.tags.join(',')
                },
                {
                    type: 'text',
                    name: 'series',
                    label: 'Series',
                    required: false,
                    value: frontMatter.series
                },
                {
                    type: 'checkbox',
                    name: 'draft',
                    label: 'Draft',
                    value: frontMatter.draft
                },
                {
                    type: 'textarea',
                    name: 'content',
                    label: 'Content',
                    required: true,
                    validations: {
                        minLength: 2,
                        maxLength: 100000
                    },
                    value: frontMatter.content
                }
            ]
        }
    }

    return schema
}

// q: What is ChatGPT?
// a: ChatGPT is a chatbot trained on 117M+ Reddit comments. It is a smaller version of GPT-2 trained on a single GPU. It is a 774M parameter model, compared to GPT-2's 1.5B parameters. It is trained on a single GPU, compared to GPT-2's 8 GPU's. It is trained on 117M comments, compared to GPT-2's 40GB of text. It is trained on Reddit comments, compared to GPT-2's WebText dataset. It is trained on 1.5B tokens, compared to GPT-2's 8B tokens.

// q: What is GPT-2?
// a: GPT-2 is a large transformer-based language model with 1.5 billion parameters, trained on a dataset of 8 million web pages. GPT-2 is trained with a simple objective: predict the next word, given all of the previous words within some text. The diversity of the dataset causes this simple goal to contain naturally occurring demonstrations of many tasks across diverse domains. GPT-2 is a direct scale-up of GPT, with more than 10X the parameters and trained on more than 10X the amount of data.

// q: What is GPT-3?
// a: GPT-3 is a large transformer-based language model with 175 billion parameters, trained on a dataset of 570GB of text from the internet. GPT-3 is trained with a simple objective: predict the next word, given all of the previous words within some text. The diversity of the dataset causes this simple goal to contain naturally occurring demonstrations of many tasks across diverse domains. GPT-3 is a direct scale-up of GPT-2, with more than 100X the parameters and trained on more than 100X the amount of data.

// q: What is GPT-Neo?
// a: GPT-Neo is a transformer-based language model with 2.7 billion parameters, trained on a dataset of 45GB of text from the internet. GPT-Neo is trained with a simple objective: predict the next word, given all of the previous words within some text. The diversity of the dataset causes this simple goal to contain naturally occurring demonstrations of many tasks across diverse domains. GPT-Neo is a direct scale-up of GPT-2, with more than 100X the parameters and trained on more than 100X the amount of data.

// q: What is GitHub Copilot?
// a: GitHub Copilot is a new AI pair programmer that helps you write better code. GitHub Copilot draws context from the code you’re working on, suggesting whole lines or entire functions. GitHub Copilot is powered by OpenAI Codex, a new AI system created by OpenAI. OpenAI Codex has been trained on a selection of English language and source code from publicly available sources, including code in public repositories on GitHub. GitHub Copilot works with a broad set of frameworks and languages, including Python, JavaScript, TypeScript, Ruby, and Go.

// q: What is OpenAI Codex?
// a: OpenAI Codex is a new AI system created by OpenAI. OpenAI Codex has been trained on a selection of English language and source code from publicly available sources, including code in public repositories on GitHub. OpenAI Codex is a descendant of GPT-3, the language model that OpenAI trained on 175 billion parameters. OpenAI Codex is a descendant of GPT-2, the language model that OpenAI trained on 1.5 billion parameters. OpenAI Codex is a descendant of GPT, the language model that OpenAI trained on 117 million parameters.

