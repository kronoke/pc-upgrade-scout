# PC Upgrade Scout

A dependency-free, responsive affiliate website starter designed for GitHub + Vercel.

## What is included

- Responsive homepage
- Product category filters
- Search and price sorting
- Budget-based recommendation form
- Placeholder affiliate product links
- Affiliate disclosure, privacy, and about pages
- Vercel configuration
- Sitemap, robots.txt, favicon, and 404 page

## Edit the products

Open `app.js`. Each item in the `products` array contains:

- `name`
- `summary`
- `category`
- `price`
- `priceLabel`
- `bestFor`
- `fit`
- `pros`
- `url`

Replace every `example.com` URL with your approved affiliate link before launch.

## Preview locally

You can double-click `index.html`, or run a local server from the project folder:

```bash
python -m http.server 3000
```

Then open `http://localhost:3000`.

## Publish with GitHub and Vercel

1. Create a new empty GitHub repository.
2. Upload every file in this folder to the repository.
3. Sign into Vercel and select **Add New → Project**.
4. Import the GitHub repository.
5. Vercel should detect it as a static project. Leave the build command empty.
6. Deploy, then connect a custom domain.

## Before monetizing

- Choose a final brand and domain.
- Replace all placeholder product links.
- Join and comply with each affiliate program.
- Replace the starter legal templates with accurate policies.
- Add a business contact address.
- Publish original, useful buying guides.
- Update `robots.txt` and `sitemap.xml` with the final domain.
- Test every link on desktop and mobile.

## Upgrade path

This static version is intentionally simple. It can later be moved to Next.js when you need article templates, a CMS, dynamic product pages, a database, or automated price updates.
