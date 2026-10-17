

// export default function sitemap() {
//   return [
//     {
//       url: "https://your-domain.com",
//       lastModified: new Date(),
//     },
//     {
//       url: "https://your-domain.com/books",
//       lastModified: new Date(),
//     },
//   ];
// }

// app/sitemap.js

export default function sitemap() {
  const baseUrl = "https://book-hunt-omega.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
    },
  ];
}