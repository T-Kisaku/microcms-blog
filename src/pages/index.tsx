import type { GetStaticProps, NextPage } from 'next'
import {useState} from 'react'

import { Card, CardContent, CardHeader, Chip, Typography, FormControl, InputLabel, Select, Box, OutlinedInput, MenuItem, SelectChangeEvent } from '@mui/material'
import Container from '../components/organizations/Container'

import { useRouter } from 'next/router'
import { getBlogList, getTagList,Blog, Tag } from '../../lib/microcms'
import { NextSeo } from 'next-seo'
import { convertUTC } from '../../lib/dayjs'

import { MicroCMSListResponse } from 'microcms-js-sdk'

interface HomeProps {
  blogList: MicroCMSListResponse<Blog>
  tagList: MicroCMSListResponse<Tag>
}

const Home: NextPage<HomeProps> = ({ blogList, tagList }) => {
  const router = useRouter()
  const [tagFilterValue, setTagFilterValue] = useState<string[]>([])
  const handleChange = (event: SelectChangeEvent<typeof tagFilterValue>) => {
    const {
      target: { value },
    } = event;
    setTagFilterValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const filteredBlogList = blogList.contents.filter(blog => {
    blog.tag_list.map(tag => tag.name)
  })

  return (
    <>
      <NextSeo
        title="Skill Blog"
        description="Skill Blogのホームページ"
      />
      <Container>
      <div className="pl-3 mb-4 w-72">
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          fullWidth
          multiple
          value={tagFilterValue}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Tag" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {tagList.contents.map((tag) => (
            <MenuItem
              key={tag.name}
              value={tag.name}
            >
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
        <div className="px-3 grid gap-4 grid-cols-2 lg:grid-cols-3">
          {blogList.contents.map((blog, key) => (
            <Card key={key} onClick={() => router.push('/blog/' + blog.id)}>
              <CardContent className="h-full flex flex-col justify-between space-y-2">
                <div>{blog.title}</div>
                <div>
                  <Typography variant="subtitle2" className="text-slate-500">Published at {convertUTC(blog.publishedAt)}</Typography>
                  {blog.tag_list.map((tag, tagKey) => (
                    <Chip key={tagKey} label={tag.name} size="small" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const
    blogList = await getBlogList(),
    tagList = await getTagList()

  return {
    props: {
      blogList,
      tagList
    }
  }
}

export default Home
