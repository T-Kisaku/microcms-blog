import type { GetStaticProps, NextPage } from 'next'

import { Card, CardContent, CardHeader, Chip, Typography } from '@mui/material'
import Container from '../components/organizations/Container'

import { useRouter } from 'next/router'
import { getBlogList, Blog } from '../../lib/microcms'
import { NextSeo } from 'next-seo'
import { convertUTC } from '../../lib/dayjs'

import { MicroCMSListResponse } from 'microcms-js-sdk'

interface HomeProps {
  blogList: MicroCMSListResponse<Blog>
}

const Home: NextPage<HomeProps> = ({ blogList }) => {
  const router = useRouter()
  return (
    <>
      <NextSeo
        title="Skill Blog"
        description="Skill Blogのホームページ"
      />
      <Container innerDivProps={{ className: 'grid grid-cols-2 lg:grid-cols-3' }}>
        {blogList.contents.map((blog, key) => (
          <Card
            key={key}
            className="mx-2 sm:mx-4 mb-6"
            onClick={() => router.push('/blog/' + blog.id)}
          >
            <CardHeader />
            <CardContent>
              <p>{blog.title}</p>
              <Typography variant="subtitle2" className="text-slate-500">更新日：{convertUTC(blog.updatedAt)}</Typography>
              <div className="flex" >
                {blog.tag_list.map((tag, tagKey) => (
                  <Chip key={tagKey} label={tag.name} size="small" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const blogList = await getBlogList()
  return {
    props: {
      blogList
    }
  }
}

export default Home
