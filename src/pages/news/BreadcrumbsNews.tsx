import { Breadcrumbs, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useBreadcrumbsNews } from 'src/context/BreadcrumbsNewsContext'
import { MdNavigateNext } from 'react-icons/md'
import { useRouter } from 'next/navigation'

const BreadcrumbsNews = () => {
  const { breadcrumbs } = useBreadcrumbsNews()

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator={<MdNavigateNext fontSize={'17px'} color='black' />} aria-label='breadcrumb'>
        {breadcrumbs.map((v, i) => {
          return (
            <Link key={i} href={v.path}>
              <Typography
                style={{
                  color: i === 2 || (v.name === 'News' && breadcrumbs.length == 2) ? '#949EA2' : 'rgba(50, 73, 122, 1)',
                  fontWeight: 400
                }}
                sx={{
                  fontSize: '14px'
                }}
              >
                {v.name}
              </Typography>
            </Link>
          )
        })}
      </Breadcrumbs>
    </Stack>
  )
}

export default BreadcrumbsNews
