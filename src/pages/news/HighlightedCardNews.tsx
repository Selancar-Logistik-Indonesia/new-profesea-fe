import React from 'react'
import styles from '../../../styles/scss/HighlightedCardNews.module.scss'
import moment from 'moment'

interface IHighlightedCardNews {
  category: string
  title: string
  description: string
  image: string
  postDate: string
  slug: string
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
              textTransform: 'capitalize'
            }}
          >
            {category}
          </a>
        </div>
        <h2 className={styles['card-highlighted-title']}>
          <a href={`/news/detail/${slug}`}>{title}</a>
        </h2>
        <p className={styles['card-highlighted-description']}>{truncateText(description, 200)}</p>
        {/* <p style={{ fontSize: '12px', padding: 0, margin: 0 }}> {moment(postDate).format('LL')}</p> */}
      </div>
      <p style={{ fontSize: '12px', paddingLeft: '20px', paddingRight: '20px' }}> {moment(postDate).format('LL')}</p>
    </div>
  )
}

export default HighlightedCardNews
