import React from 'react'
import { useRouter } from 'next/router'
import { DivProps } from '../../types/element'
import { Avatar, CardHeader } from '@mui/material'

import data from '../../../lib/data'

interface Link {
  title: string
  href: string
  target?: '_blank'
}
const linkList: Link[] = [
  { title: 'Blog system is Open Source', href: 'https://github.com/T-Kisaku/microcms-blog', target: '_blank' },
]

export type FooterProps = DivProps

const Footer: React.FC<FooterProps> = (props) => {
  const router = useRouter()
  return (
    <footer {...props} className={`text-center lg:text-left bg-white text-gray-600 ${props.className}`}>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <CardHeader
            avatar={(
              <Avatar src={data.profile.picture} sx={{ width: 100, height: 100 }}>
                {data.profile.name}
              </Avatar>
            )}
            title={data.profile.name}
            subheader={<data.profile.description />}
          />
          <div className="">
            <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
              About this blog
            </h6>
            {linkList.map((link, key) => (
              <p
                className="mb-4 text-gray-600"
                key={key}
                onClick={() => {
                  if (link.target) {
                    window.open(link.href, '_blank')
                  } else {
                    router.push(link.href)
                  }
                }}
              >
                {link.title}
              </p>
            ))}
          </div>

        </div>
      </div>
    </footer>

  )
}

export default Footer
