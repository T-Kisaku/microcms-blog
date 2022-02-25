import React from 'react'

import { DivProps } from '../../types/element'

export type MarkdownProps = DivProps & {
    html: string
}

const Markdown: React.FC<MarkdownProps> = (props) =>
    <div
        {...props}
        className={`markdown-body rounded-xl ${props.className}`}
        dangerouslySetInnerHTML={{__html: props.html}}
    />

export default Markdown