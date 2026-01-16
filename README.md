# Email Signature Generator

A lightweight, single-page tool to build Meridian International Sourcing Group email signatures. Everything runs client-side—open the HTML in a modern browser and you’re set.

## Features

- Live preview while you type
- Copy HTML to clipboard or download as an HTML file
- Optional meeting link and WhatsApp link handling
- Uses Tailwind CDN (no local build step)

## Quick start

1. Open `index.html` in your browser.
2. Fill in the form; the preview updates instantly.
3. Use **Copy HTML** or **Download** in the HTML Code card.

## File structure

- `index.html` — layout, Tailwind CDN include, and component markup.
- `styles.css` — custom styles and keyframes pulled out of the HTML.
- `app.js` — logic for building signature HTML, escaping input, copy/download helpers, and defaults.

## Customization

- Branding defaults: edit `BRAND` in `app.js` (logo URL, website, address, social links, brand colors).
- Form defaults: edit `DEFAULTS` in `app.js`.
- Styles: tweak `styles.css` for custom fonts, spacing, or colors; adjust Tailwind utility classes in `index.html` as needed.
- Favicon: replace the `<link rel="icon" ...>` in `index.html` with your preferred icon.

## Usage tips

- Clipboard access: some browsers require user interaction (a click) to allow copying.
- Links: phone and email are normalized to `tel:` and `mailto:` automatically; URLs are forced to https if missing a protocol.
- WhatsApp: the icon hides automatically if the WhatsApp URL is empty.
- Meeting link: the “Book A Meeting” row hides if no URL is provided.

## How to deploy or share

Since this is static, you can:

- Double-click `index.html` to run locally, or
- Host the folder on any static host (GitHub Pages, Netlify drop, S3/CloudFront, etc.). No build step required.

## Troubleshooting

- Copy button does nothing: ensure the page is served over HTTPS or opened from disk with a user click; some browsers block programmatic clipboard without interaction.
- External assets blocked: logo and icons load from CDNs; verify network access or replace URLs with locally hosted assets.
- Styling looks off: confirm Tailwind CDN is reachable; if offline, download Tailwind or bundle a local copy.

## Browser support

Tested on recent Chrome/Edge; should work on any modern browser with Clipboard API support. If Clipboard API is unavailable, copying may fail but download will still work.

## Contributing

Edits are straightforward: update `index.html`, `styles.css`, or `app.js` and refresh. No build tooling is required.