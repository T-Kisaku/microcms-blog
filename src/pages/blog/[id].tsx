import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { NextSeo } from 'next-seo'
import { extractTocFromMarkdown, markdownToHtml } from '../../utils/markdown'


import { Typography, Stack, Popper } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Container from '../../components/organizations/Container'
import Markdown from '../../components/atoms/Markdown'

import { getBlogById, getBlogList } from '../../../lib/microcms'
import { convertUTC } from '../../../lib/dayjs'

import {
  usePopupState,
  bindToggle,
  bindPopper,
} from 'material-ui-popup-state/hooks'


interface IdProps {
  blog: Awaited<ReturnType<typeof getBlogById>>
  toc?: string
}


const Id: NextPage<IdProps> = ({ blog, toc }) => {
  const tocPopupState = usePopupState({ variant: 'popper', popupId: 'toc' })

  return (
    <>
      <NextSeo
        title={blog.title}
      />
      <div className="top-0 sticky md:hidden bg-white h-10 text-center" {...bindToggle(tocPopupState)}>
        Table of contents
        {tocPopupState.isOpen
          ? <ExpandLess />
          : <ExpandMore />
        }
      </div>
      <Popper  {...bindPopper(tocPopupState)} >
        {toc && <Markdown html={toc} className="py-5" />}
      </Popper>
      <Container>
        <Stack component="header" justifyContent="center" spacing={4}>
          <Typography variant="h5" textAlign="center" fontWeight={900}>
            {blog.title}
          </Typography>
          <div className="flex justify-center sm:flex-col text-center space-x-4 text-slate-500">
            <div>Published at {convertUTC(blog.publishedAt)}</div>
            <div>Latest updated at {convertUTC(blog.updatedAt)}</div>
          </div>
        </Stack>
        <div className='flex justify-between  mt-24'>
          <Markdown html={blog.body} className="sm:w-full md:w-article p-5" />
          <aside className="w-table-of-content sm:hidden" >
            {toc && <Markdown html={toc} className="py-5" />}
          </aside>
        </div>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {

  const
    blogList = await getBlogList(),
    paths = blogList.contents.map(blog => ({ params: { id: blog.id } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<IdProps> = async (ctx) => {
  const
    contentId = ctx.params?.id as string,
    fetchedBlog = await getBlogById(contentId),
    convertedBody = await markdownToHtml(fetchedBlog.body),
    blog = { ...fetchedBlog, body: String(convertedBody) },
    toc = await extractTocFromMarkdown(fetchedBlog.body)

  return { props: { blog, toc } }
}


export default Id