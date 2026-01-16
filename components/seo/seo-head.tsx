// components/seo/seo-head.tsx
import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
  locale?: string
  alternateUrls?: {
    en?: string
    bn?: string
  }
}

export default function SEOHead({
  title,
  description,
  keywords = 'clinic software, hospital management, medical software Bangladesh, EHR, EMR, healthcare management',
  ogImage = '/og-image.png',
  canonicalUrl = 'https://Managemed.com',
  locale = 'en',
  alternateUrls,
}: SEOHeadProps) {
  const siteUrl = 'https://Managemed.com'
  const fullCanonicalUrl = `${siteUrl}${canonicalUrl}`
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={locale === 'bn' ? 'Bengali' : 'English'} />
      <meta name="author" content="Managemed" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Alternate URLs for i18n */}
      {alternateUrls && (
        <>
          {alternateUrls.en && (
            <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
          )}
          {alternateUrls.bn && (
            <link rel="alternate" hrefLang="bn" href={alternateUrls.bn} />
          )}
          <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        </>
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:locale" content={locale === 'bn' ? 'bn_BD' : 'en_US'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Managemed",
            "applicationCategory": "MedicalApplication",
            "operatingSystem": "Web, Android, iOS",
            "description": description,
            "offers": {
              "@type": "Offer",
              "price": "1999",
              "priceCurrency": "BDT"
            },
            "author": {
              "@type": "Organization",
              "name": "Managemed",
              "url": siteUrl
            },
            "inLanguage": locale === 'bn' ? "bn-BD" : "en-US"
          })
        }}
      />
    </Head>
  )
}