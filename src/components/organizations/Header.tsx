import React from 'react'

import { AppBar, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export interface HeaderProps {
}

const Header: React.FC<HeaderProps> = (props) => {
    const router = useRouter()
    return (
        <header className="top-0 w-full h-16 p-1 bg-c-card">
            <div
                className="text-center text-c-card-text font-bold text-5xl"
                onClick={() => router.push('/')}
            >
                Skill Blog
            </div>
        </header>
    )
}

export default Header