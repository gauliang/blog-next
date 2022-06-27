import { visitParents } from 'unist-util-visit-parents'
import { visit } from 'unist-util-visit'
import { parseUrl } from "query-string";

export function remarkImage(options: any) {
    return function transformer(tree: any, file: any) {

        const prefix = '/' + options.perfix.join('/')

        visitParents(tree, 'image', image);
        function image(node: any, parents: any) {
            let parent = parents[parents.length - 1];
            const image = parent.children[0]

            const figcaption = image.alt ? [{
                type: 'element',
                data: {
                    hProperties: {
                        className: 'figcaption'
                    }
                },
                children: [
                    { type: 'text', value: image.alt }
                ]
            }] : []

            parent.type = 'element';
            parent.tagName = 'figure';
            parent.data = {
                hProperties: {
                    className: 'image-widget'
                }
            }
            parent.children = [
                {
                    ...image,
                    url: image.url.startsWith('//') ? image.url :'/attachments' + prefix + '.files/' + image.url
                },
                ...figcaption
            ]
        }
    }
}

export function remarkCodepen(options: any) {
    options = {
        user: 'gauliang',
        height: '500',
        theme: 'dark', // light | dark
        tab: 'result', // html|css|js|result
        ...options
    }
    return function transformer(tree: any, file: any) {

        visit(tree, 'text', codepen);
        function codepen(node: any) {
            const { value } = node;
            const isCopePen = value.match(/\{\{codepen:\/\/(.+?)\}\}/)
            if (isCopePen) {
                const params = parseUrl(isCopePen[1])

                const [penUser, penId] = params.url.split('/')
                const optison = {
                    ...options,
                    ...params
                }

                node.type = 'html';
                node.value = `<figure class="codepen-widget"><iframe 
                height='${optison.height}' 
                scrolling='no' 
                src='//codepen.io/${penUser}/embed/preview/${penId}/?height=${optison.height}&theme-id=${optison.theme}&default-tab=${optison.tab || 'html,result'}' 
                frameborder='no' 
                title='codepen embed'
                allowtransparency='true' 
                allowfullscreen='true' 
                style='width: 100%;'></iframe></figure>`;
            }

        }
    }
}

export function generateHeadingId(options: any) {

    return function transformer(tree: any, file: any) {
        visit(tree, 'heading', visitor)
        function visitor(node: any) {
            const data = node.data || (node.data = {})
            const props = data.hProperties || (data.hProperties = {})
            const lastChild = node.children[node.children.length - 1]

            if (lastChild && lastChild.type === 'text') {
                const text = lastChild.value.replace(/[\s&\.\+#\(\)]+/mg, '-')
                const matched = text.match(/ {#([^]+?)}$/)
                if (matched) {
                    const id = matched[1]
                    if (id.length) {
                        props.id = id
                        lastChild.value = text.substring(0, matched.index)
                    }
                } else {
                    if (text.length) {
                        props.id = `hash-${text}`
                    }
                }
            }
        }
    }
}

export function generateToc(options: any) {

    return function transformer(tree: any, file: any) {
        const headers = tree.children
            .filter((node: any) => node.type === 'heading' && node.depth == 2)
            .map((node: any) => {
                return {
                    depth: node.depth,
                    value: node.children[0].value,
                    id: node.data.hProperties.id
                }
            });
        file.data.toc = headers
    }
}