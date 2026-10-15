# ammazing911.virtualsociety

Single-page static site, served by **GitHub Pages**, named on the
**Freename** alt-root and reachable at <http://ammazing911.virtualsociety/>.

## How the two hosts stay in sync

| URL | What serves it |
|---|---|
| `https://<user>.github.io/ammazing911/` | GitHub Pages — the page **301-redirects** to the domain below |
| `http://ammazing911.virtualsociety/` | GitHub Pages, via an `A` record → `185.199.108.153`. **The real site.** |

Both serve the *same* `index.html`, so the redirect in `<head>` is gated on the
hostname:

```js
if (host === 'github.io' || host.endsWith('.github.io')) {
  location.replace('http://ammazing911.virtualsociety/' + location.hash);
}
```

Remove that guard and the domain redirects to itself, forever.

## Files

```
index.html     markup + the hostname-guarded redirect
styles.css     all styling (no framework, no CDN)
script.js      year stamp, count-up, scroll reveal
favicon.svg    icon
CNAME          ammazing911.virtualsociety
.nojekyll      serve files verbatim, skip the Jekyll pass
```

## Editing the content

Open `index.html` and change:

- `<title>` / `<meta name="description">` — SEO + browser tab
- the `<h1>` and `.lede` paragraph in `.hero`
- the three `<article class="card">` blocks in `#work`
- the `.chip` links in `#contact` — swap `your-username` for your real handles

Then push. GitHub Pages rebuilds in about a minute.

## Freename DNS that points here

Delegation (parent zone):

| name | type | value | TTL |
|---|---|---|---|
| `@` | NS | `ns1.noto.network` | 300 |
| `@` | NS | `ns2.noto.network` | 300 |

Records in the `ammazing911.virtualsociety` zone:

| name | type | value | TTL |
|---|---|---|---|
| `@` | A | `185.199.108.153` | 300 |
| `www` | CNAME | `mondyker.github.io` | 300 |

`185.199.108.153` is one of GitHub Pages' four anycast IPs
(`185.199.108–111.153`). Any one of them works — the IP is not tied to
your account, so it does not change between repos.

Web3 records:

| key | value |
|---|---|
| `browser.redirect_url` | `http://mondyker.github.io/ammazing911/` |
| `redirect.website.0` | `http://mondyker.github.io/ammazing911/` |

## HTTPS: leave it OFF

Freename web3 domains are **HTTP-only**. GitHub will not provision a
certificate for the custom domain, so the **Enforce HTTPS** checkbox in
`Settings → Pages` stays unticked and will error if you try to enable it.

The site is therefore reachable at `http://ammazing911.virtualsociety/`.
The `mondyker.github.io` URL still has HTTPS — it just 301-redirects to
the HTTP domain, which is expected.

## Verify

```powershell
Resolve-DnsName ammazing911.virtualsociety -Server ns1.noto.network
Resolve-DnsName ammazing911.virtualsociety -Server 8.8.8.8
```