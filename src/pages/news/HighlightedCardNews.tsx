import React from 'react'
import styles from '../../../styles/scss/HighlightedCardNews.module.scss'
import moment from 'moment'
import { Typography } from '@mui/material'

interface IHighlightedCardNews {
  category: string
  title: string
  description: string
  image: string
  postDate: string
  slug: string
}

const TruncatedTypography = (props: { children: any; line?: number; [key: string]: any }) => {
  const { children, line, ...rest } = props
  const maxLine = line ? line : 1

  return (
    <Typography
      {...rest?.className}
      sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLine,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxHeight: `calc(${maxLine} * 1.2em)`,
        minHeight: '1.2em',
        lineHeight: '1.2em',
        fontSize: '16px',
        ...rest
      }}
    >
      {children}
    </Typography>
  )
}

const HighlightedCardNews: React.FC<IHighlightedCardNews> = ({
  category,
  image,
  postDate,
  title,
  description,
  slug
}) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text
    }

    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className={styles['card-highlighted']}>
      <div className={styles['card-highlighted-thumb']}>
        <a href={`/news/detail/${slug}`}>
          <img src={image} alt={title} />
        </a>
      </div>
      <div className={styles['card-highlighted-body']}>
        <div>
          <a
            href='#'
            style={{
              fontSize: '14px',
              textTransform: 'capitalize',
              color: '#949EA2'
            }}
          >
            {category}
          </a>
        </div>
        <h2 className={styles['card-highlighted-title']}>
          <a href={`/news/detail/${slug}`}>
            <TruncatedTypography line={1} fontSize={18} color='black' fontWeight={'bold'}>
              {title}
            </TruncatedTypography>
          </a>
        </h2>
        <p className={styles['card-highlighted-description']}>{description}</p>
      </div>
      <p style={{ fontSize: '12px', paddingLeft: '20px', paddingRight: '20px', color: '#949EA2' }}>
        {' '}
        {moment(postDate).format('LL')}
      </p>
    </div>
  )
}

export default HighlightedCardNews
