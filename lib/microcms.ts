import { createClient } from 'microcms-js-sdk'

import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'

export type MicroCMSEntity<T> = T & MicroCMSContentId & MicroCMSDate

export interface Tag {
    name: string
    description?: string
}

export interface Blog {
    title: string
    body: string
    tag_list: MicroCMSEntity<Tag>[]
}

const client = createClient({
    serviceDomain: process.env.MICRO_CMS_SERVICE_KEY || '',
    apiKey: process.env.MICRO_CMS_API_KEY || ''
})

const endpoint = {
    blog: 'blog-list'
}


export const
    getBlogById = (contentId: string) => client.getListDetail<Blog>({ endpoint: endpoint.blog, contentId }),
    getBlogList = () => client.getList<Blog>({ endpoint: endpoint.blog })


