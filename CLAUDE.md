# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website / CV for Maksym Cheremnov, built with Jekyll and served at https://mcheremnov.github.io/. Default and deploy branch is `gh-pages`. No tests, no linter, no JS build step.

## Commands

```sh
bundle install                 # Gemfile.lock is gitignored, so versions resolve fresh
bundle exec jekyll serve       # local dev server with rebuild on change
bundle exec jekyll build       # output to ./_site
```

Deploy: pushing to `gh-pages` triggers `.github/workflows/jekyll.yml` (Ruby 3.3, `bundle exec jekyll build` with `JEKYLL_ENV=production`, then GitHub Pages deploy).

## Architecture

- **Theme gem does most of the work.** `theme: cvless` (gem `cvless ~> 2.4`) supplies the layouts (`home`, `cv`, `page`, `post`), most includes (`footer.html`, `postlist.html`, `pagination.html`, `particles-404.html`, `svg/*.svg`) and assets (`styles.min.css`, `darkmode.js`, `particles.min.js`, etc.) that are referenced but not present in this repo. Files in local `_layouts/`, `_includes/`, `assets/` override the gem's files of the same path. Use `bundle info cvless --path` to inspect the theme source before overriding anything.
- **Site data lives in `_config.yml`**: author, contact info, social links (`profile.*`). Translatable strings (name, taglines, address, footer) live in `_data/i18n/<lang>.yml`.
- **Bilingual content (en/uk), client-side.** One URL per page; every language is rendered into the HTML and CSS shows only the one matching `<html lang>`. Languages are listed in `i18n_languages` in `_config.yml` (first is the default).
  - Short strings: `{% include t.html key="..." %}` reads `_data/i18n/<lang>.yml`. Add a key to every language file.
  - Page bodies: `index.md` and `cv.md` hold one `<div data-lang="<lang>" markdown="1">` block per language. When editing content, update every block.
  - The inline script in `_includes/head.html` picks the language before first paint (`?lang=` param, then `localStorage`, then `navigator.language`). `assets/js/i18n.js` handles the `data-set-lang` buttons from `_includes/language-selector.html`.
  - Local `_includes/header.html` and `_includes/footer.html` override the theme to use `t.html`. Old `/index.ua/` and `/cv.ua/` URLs redirect via `redirect_from`.
- **Ruby version.** `github-pages ~> 232` needs Ruby >= 3.0 and < 4.0 (CI uses 3.3). macOS system Ruby 2.6 and Homebrew Ruby 4.x both fail `bundle install`.
- **`_layouts/default.html`** is the local root layout. It conditionally loads particles.js effects and `assets/js/main.js` only when `page.title` is `"Home"` or `"404"`, so these page titles are load-bearing.
- **Posts** in `_posts/` are theme sample content, listed via `posts.md` with `jekyll-paginate-v2`. Both are currently hidden through `exclude` in `_config.yml`.
- `domains/subdomains.json` is a subdomain registration record (CNAME to `mcheremnov.github.io`), not used by the Jekyll build.
- `assets/files/cv.pdf` is the downloadable CV linked from `index*.md` and `cv*.md`; keep it in sync with the CV page content.
