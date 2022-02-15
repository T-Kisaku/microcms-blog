import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { NextSeo } from 'next-seo'
import { Typography, Stack, Paper } from '@mui/material'
import Container from '../../components/organizations/Container'

import { getBlogById, getBlogList } from '../../../lib/microcms'
import { convertUTC } from '../../../lib/dayjs'

interface IdProps {
  blog: Awaited<ReturnType<typeof getBlogById>>
}

const Id: NextPage<IdProps> = ({ blog }) => {

  return (
    <>
      <NextSeo
        title={blog.title}
      />
      <Container>
        <Stack component="header" justifyContent="center" spacing={4}>
          <Typography variant="h5" textAlign="center" fontWeight={900}>
            {blog.title}
          </Typography>
          <span>
            <span className="text-center">公開日:{convertUTC(blog.publishedAt)}</span>
            <span>更新日:{convertUTC(blog.updatedAt)}</span>
          </span>

        </Stack>

        <Paper className="mt-24">
          <div
            className="rich-editor p-5"
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`
            }}
          />
        </Paper>
      </Container></>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {

  const
    blogList = await getBlogList(),
    paths = blogList.contents.map(blog => ({
      params: { id: blog.id }
    }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<IdProps> = async (ctx) => {
  const
    contentId = ctx.params?.id as string,
    blog = await getBlogById(contentId)

  return { props: { blog } }
}

export default Id