// app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://book-hunt-omega.vercel.app/sitemap.xml",
  };
}