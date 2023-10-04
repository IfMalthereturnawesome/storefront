import NextHead from "next/head"
import React from "react"
import {Metadata} from "next";

type HeadProps = {
  title?: string
  description?: string | null
  image?: string | null
}
const metadata: Metadata = {
  title: 'Eight Athletics',
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon.ico',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon-white.ico',
      media: '(prefers-color-scheme: dark)',
    },
  ],
}

const Head: React.FC<HeadProps> = ({ title, description, image }) => {
  return (
    <NextHead>
      <title>{title} | Eight Athletics</title>
      <meta itemProp="name" content={title} />
      {description && <meta itemProp="description" content={description} />}
        {image && <meta itemProp="image" content={image} />}
        <link
            rel="icon"
            type="image/x-icon"
            href="/favicon.ico"
            media="(prefers-color-scheme: light)"
        />
        <link
            rel="icon"
            type="image/x-icon"
            href="/favicon-white.ico"
            media="(prefers-color-scheme: dark)"
        />
    </NextHead>
  )
}

export default Head
