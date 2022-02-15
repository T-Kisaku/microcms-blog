import React from 'react'
import { DivProps } from '../../types/element'
import { Avatar, CardHeader, Paper, Typography } from '@mui/material'

import data from '../../../lib/data'

export type FooterProps = DivProps

const Footer: React.FC<FooterProps> = (props) => {
    return (
        <Paper {...props} className={(props.className || '') + ' bottom-0 w-full p-3'}>
            <CardHeader
                    avatar={
                        <Avatar src={data.profile.picture} sx={{ width: 150, height: 150 }}>
                            {data.profile.name}
                        </Avatar>
                    }
                    title={
                        <Typography variant="h4">
                            {data.profile.name}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="subtitle1">
                            <data.profile.description/>
                        </Typography>
                    }
                />
        </Paper>
    )
}

export default Footer