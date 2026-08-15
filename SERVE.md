# Serving the static build

`npm run build` writes the whole site to `out/`. It is plain HTML, CSS, JS and
images. There is no Node process, no database and nothing to keep running.

```bash
npm install
npm run build      # writes out/
```

Everything under `out/` is safe to copy anywhere. Total size is about 5 MB.

## Quickest check

```bash
npm run serve            # http://localhost:4000
```

Or with anything you already have:

```bash
cd out && python3 -m http.server 4100
cd out && npx serve .
cd out && php -S localhost:8000
```

All of these work with no configuration, because the build writes both
`work.html` and `work/index.html` for every page.

## Nginx

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name deepboda.me www.deepboda.me;
    root /var/www/deepboda.me;
    index index.html;

    # /work resolves to work.html, then work/index.html
    location / {
        try_files $uri $uri.html $uri/index.html =404;
    }

    error_page 404 /404.html;

    # hashed filenames, safe to cache forever
    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # images and the CV change rarely
    location ~* \.(webp|png|jpg|svg|ico|woff2|pdf)$ {
        add_header Cache-Control "public, max-age=2592000";
    }

    # HTML must revalidate or a deploy will not be visible
    location ~* \.html$ {
        add_header Cache-Control "public, max-age=0, must-revalidate";
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml application/rss+xml;
    gzip_min_length 1024;
}
```

Deploy is a copy:

```bash
rsync -av --delete out/ user@server:/var/www/deepboda.me/
```

## Caddy

Caddy needs no rewrite rules for this layout.

```caddy
deepboda.me {
    root * /var/www/deepboda.me
    encode zstd gzip
    try_files {path} {path}.html {path}/index.html
    file_server
    handle_errors {
        rewrite * /404.html
        file_server
    }
}
```

## Apache

`.htaccess` in the document root:

```apache
Options -MultiViews
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

ErrorDocument 404 /404.html

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/rss+xml image/svg+xml
</IfModule>
```

## Object storage and CDNs

Works as-is on S3 + CloudFront, Cloudflare Pages, Netlify, GitHub Pages and
Vercel. Set the index document to `index.html` and the error document to
`404.html`. Nothing else is required.

## What is inside out/

| Path | What it is |
| --- | --- |
| `index.html` | homepage |
| `work/`, `writing/`, `tools/`, `how-this-site-is-built/` | pages, each with an `index.html` |
| `writing/<slug>/` | the seven articles |
| `uses/`, `colophon/` | redirect stubs to the renamed pages |
| `_next/static/` | hashed CSS and JS, immutable |
| `og/` | social preview images, one per page |
| `work/`, `writing/` (webp) | architecture diagrams and article images |
| `Deep-Boda-DevOps-Engineer-CV.pdf` | the CV the site links to |
| `sitemap.xml`, `robots.txt`, `writing/rss.xml` | crawler files |
| `404.html` | not found page |

## Before it goes live

`lib/content.ts` has `SITE.url`. Canonical tags, the sitemap, the RSS feed and
the social images are all built from it, so if the site ends up on a different
domain, change it there and rebuild.
