import React from 'react'
import { NextPage } from 'next'
import { Button, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/router';
const ErrorPage: NextPage = () => {
  const router = useRouter()
  return (
    <div>
      <Stack spacing={10} justifyContent="center" alignItems="center" className="text-center mt-20">
        <Typography fontSize="300px" variant="h1" component="span">
          404
        </Typography>
        <Button className="w-60" onClick={() => router.push('/')}>
          Go Home
        </Button>
      </Stack>
    </div>
  );
}

export default ErrorPage