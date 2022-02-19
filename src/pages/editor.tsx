import React from 'react'
import { TextField } from '@mui/material'
import Markdown from '../components/atoms/Markdown'

import {markdownToHtml} from '../utils/markdown'


export interface EditorProps{
}

const Editor: React.FC<EditorProps> = (props) => {
    const
        [markdown, setMarkdown] = React.useState(''),
        [markdownHtml, setMarkdownHtml] = React.useState('')

    React.useEffect(() => {
        markdownToHtml(markdown).then(setMarkdownHtml)
    }, [markdown])
    return (
        <div className="flex p-5 space-x-5">
            <TextField
                className="h-full w-full flex-1"
                value={markdown}
                onChange={e => setMarkdown(e.target.value)}
                multiline
                rows={30}
            />
            <Markdown html={markdownHtml} className="flex-1 p-3" />
        </div>
    )
}

export default Editor