import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const excludedPaths = [
    "/checkout",
    "/account/*",
    "/cart",
    "/order/confirmed/*",
    "/404",
    "/not-found",
  ]
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: excludedPaths,
      },
      {
        userAgent: ["*"],
        allow: ["/"],
        disallow: excludedPaths,
      },

    ],
    sitemap: "https://www.eightathletics.com/sitemap.xml",
  }
}
