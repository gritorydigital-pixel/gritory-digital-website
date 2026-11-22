# Gritory Digital website

Static site (HTML, CSS, JavaScript, three.js from a CDN). No build step.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## Before going live
1. In `script.js`, set `CONTACT_EMAIL` to your real business email.
2. When the domain is ready, update the `<title>`/meta tags in `index.html` and add the domain in your host's settings.

## Deploy (free option)
GitHub Pages: push this folder to a GitHub repo, then Settings > Pages > deploy from the main branch.

## Prices
Pricing is stored in the `PLANS` array at the top of `script.js` and the maintenance/add-on sections of `index.html`. Keep them in sync with the client presentation.
