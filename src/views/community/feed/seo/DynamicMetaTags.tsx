// components/seo/DynamicMetaTags.tsx
import Head from 'next/head'
import { useMemo } from 'react'
import ISocialFeed from 'src/contract/models/social_feed'

export const META_CONFIG = {
  baseUrl: 'https://profesea.id',
  siteName: 'Profesea',
  defaultImage: '/images/logoprofesea.png',
  twitterHandle: '@profesea'
}

interface MetaData {
  title: string
  description: string
  image: string
  url: string
  siteName: string
}

interface DynamicMetaTagsProps {
  feed: ISocialFeed | null
  feedId: number
}

const DynamicMetaTags = ({ feed, feedId }: DynamicMetaTagsProps) => {
  const metaData = useMemo((): MetaData => {
    return {
      title: feed?.community?.name ? `${feed.community.name} - Community Discussion` : 'Community Feed - Profesea',
      description: feed?.content ? `${feed.content.substring(0, 160)}...` : 'Join our community discussion on Profesea',
      image: feed?.community?.banner || `${META_CONFIG.baseUrl}${META_CONFIG.defaultImage}`,
      url: `${META_CONFIG.baseUrl}/community/feed/${feedId}`,
      siteName: META_CONFIG.siteName
    }
  }, [feed, feedId])

  // Ensure image URL is absolute
  const imageUrl = metaData.image.startsWith('http') ? metaData.image : `${META_CONFIG.baseUrl}${metaData.image}`

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'SocialMediaPosting',
      headline: metaData.title,
      description: metaData.description,
      image: imageUrl,
      url: metaData.url,
      datePublished: feed?.created_at,
      author: {
        '@type': 'Organization',
        name: metaData.siteName
      }
    }),
    [metaData, imageUrl, feed?.created_at]
  )

  return (
    <Head>
      <title>{metaData.title}</title>
      <meta name='description' content={metaData.description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      {/* Open Graph */}
      <meta property='og:title' content={metaData.title} />
      <meta property='og:description' content={metaData.description} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:url' content={metaData.url} />
      <meta property='og:type' content='article' />
      <meta property='og:site_name' content={metaData.siteName} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:type' content='image/png' />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={metaData.title} />
      <meta name='twitter:description' content={metaData.description} />
      <meta name='twitter:image' content={imageUrl} />
      {META_CONFIG.twitterHandle && <meta name='twitter:site' content={META_CONFIG.twitterHandle} />}

      {/* Additional SEO meta tags */}
      <meta name='robots' content='index, follow' />
      <link rel='canonical' href={metaData.url} />

      {/* Structured Data for better SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </Head>
  )
}

export default DynamicMetaTags
