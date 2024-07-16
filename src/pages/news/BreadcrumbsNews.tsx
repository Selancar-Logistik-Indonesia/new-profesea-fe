import { Breadcrumbs, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useBreadcrumbsNews } from 'src/context/BreadcrumbsNewsContext'

const BreadcrumbsNews = () => {
  const { breadcrumbs } = useBreadcrumbsNews()

  return (
    <Stack spacing={2} sx={{ mt: '24px', mb: '12px' }}>
      <Breadcrumbs separator='›' aria-label='breadcrumb'>
        {breadcrumbs.map((v, i) => {
          return (
            <Link key={i} href={v.path}>
              <Typography
                style={{ color: 'rgba(50, 73, 122, 1)', fontWeight: 400 }}
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
