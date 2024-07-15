import { Breadcrumbs, Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useBreadcrumbsNews } from 'src/context/BreadcrumbsNewsContext'

const BreadcrumbsNews = () => {
  const { breadcrumbs } = useBreadcrumbsNews()

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator='›' aria-label='breadcrumb'>
        {breadcrumbs.map((v, i) => {
          return (
            <Link key={i} href={v.path}>
              <p style={{ color: 'rgba(50, 73, 122, 1)', fontWeight: 400, fontSize: '12px' }}> {v.name}</p>
            </Link>
          )
        })}
      </Breadcrumbs>
    </Stack>
  )
}

export default BreadcrumbsNews
