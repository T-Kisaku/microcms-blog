import { unified } from 'unified'
import { remark } from 'remark'
import parseMarkdown from 'remark-parse'
import remarkRehype from 'remark-rehype'
import gfm from 'remark-gfm' //Github syntax for markdown
import html from 'rehype-stringify'
import slug from 'remark-slug'

import { toc, Options } from 'mdast-util-toc'

// This value is converted "## Table of contens" to ast value.
const tocAst = {
    type: 'heading',
    depth: 2,
    children: [{ type: 'text', value: 'Table of contents', position: [Object] }],
    position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 21, offset: 20 }
    }
}

/**
 *　This source code is here https://github.com/remarkjs/remark-toc/blob/main/index.js
 * Plugin to generate a Table of Contents (TOC).
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkToc(options: Options = { maxDepth: 3 }) {
    // @ts-ignore
    return (node) => {
        // @ts-ignore
        const isExistedHeading = Boolean(node.children.find(x => Boolean(x.depth)))

        if(isExistedHeading) node.children.unshift(tocAst)

        const result = toc(
            node,
            Object.assign({}, options, {
                heading: options.heading || 'toc|table[ -]of[ -]contents?'
            })
        )

        if (
            result.endIndex === null ||
            result.index === null ||
            result.index === -1 ||
            !result.map
        ) {
            node.children = []
        } else {
            node.children = [
                result.map,
            ]
        }
    }
}

export const
    markdownToHtml = async (body: string) => await unified()
        .use(parseMarkdown)
        .use(slug)
        .use(gfm)
        .use(remarkRehype)
        .use(html)
        .process(body),

    extractTocFromMarkdown = async (body: string) => {
        const tocMarkdown = await remark()
            .use(remarkToc)
            .process(body)

        const tocHtml = await markdownToHtml(String(tocMarkdown))
        return tocHtml
    }
