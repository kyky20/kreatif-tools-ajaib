const fs = require("fs");
const path = require("path");

// Konfigurasi dasar
const pagesDir = path.join(__dirname, "src", "pages");
const publicDir = path.join(__dirname, "public");
const baseUrl = "https://kreasia.netlify.app";

const getRoute = (filename) => {
  const name = filename.replace(".tsx", "").toLowerCase();
  if (name === "index") return "/";
  if (name === "notfound") return null;
  return `/${name}`;
};

// Ambil semua file .tsx dari src/pages
const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".tsx"));

// Buat XML entry untuk setiap route
const urls = files
  .map(getRoute)
  .filter(Boolean)
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("");

// Template XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

// Tulis ke public/sitemap.xml
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap.trim());

console.log("✅ sitemap.xml berhasil dibuat!");
