import { Helmet } from 'react-helmet-async'

interface MetaProps {
  title: string
  description?: string
  image?: string
  url?: string
  favicon?: string
}

export const Meta = ({ favicon, title, description = 'Website resmi', image, url }: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {favicon && <link rel="icon" type="image/png" href={favicon} />}

      {favicon && <link rel="apple-touch-icon" href={favicon} />}
    </Helmet>
  )
}
