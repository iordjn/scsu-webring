# SCSU Webring

This project provides a shared navigation component for a chain of member
websites. Each member displays previous and next arrows. Clicking an arrow
navigates directly to the previous or next member's URL.

## How it works

The navigation is made of three parts:

1. `users.json` stores the member list.
2. Each participating website includes the navigation HTML.
3. Each participating website loads the shared `webring.js` file.

When a visitor opens a member's website, `webring.js`:

1. Finds the `.webring-nav` element.
2. Fetches the member list from `data-users-url`.
3. Finds the current site using `data-site-url`.
4. Finds the member before and after the current member.
5. Sets the previous and next arrow URLs.

When the visitor clicks an arrow, the browser leaves the current page. The
destination site loads `webring.js` again, so the navigation is recalculated
for that site. The previous page does not need to keep running.

The hub page is not a member. It uses `data-hub="true"` so its Previous arrow
opens the last member and its Next arrow opens the first member without adding
the hub URL to `users.json`.

## Member data

Members are stored in [`users.json`](./users.json):

```json
[
  {
    "name": "John Doe",
    "year": 2026,
    "major": "Computer Science",
    "url": "https://example.com/johndoe"
  }
]
```

The `url` value is used to determine the member's position in the chain.
Member URLs should be unique and should match the site's `data-site-url`
attribute.

## Embed code

Members should copy the following HTML into their website. Replace
`https://example.com/johndoe` with their own URL.

```html
<nav
  class="webring-nav"
  data-site-url="https://example.com/johndoe"
  data-users-url="https://iordjn.github.io/scsu-webring/users.json"
  aria-label="Webring navigation"
>
  <a
    data-direction="previous"
    href="#"
    aria-label="Previous webring site"
  >
    &larr;
  </a>

  <a
    data-direction="next"
    href="#"
    aria-label="Next webring site"
  >
    &rarr;
  </a>
</nav>

<script src="https://iordjn.github.io/scsu-webring/webring.js"></script>
```

The member must update:

```html
data-site-url="https://example.com/johndoe"
```

to match their own `url` in `users.json`.

The `data-users-url` value should remain the central URL unless the member
maintains a different copy of the member data.

## Local development

Because browsers restrict `fetch()` when an HTML file is opened directly,
serve the project over HTTP:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

The local page currently uses `./users.json` and `./webring.js`.

## Updating the chain

To add or remove a member:

1. Edit `users.json`.
2. Add a unique `url` and display `name`.
3. Make sure the member copies the embed code.
4. Make sure `data-site-url` exactly matches the member's URL.
5. Publish the updated files.

The order of entries in `users.json` determines the order of the chain.
The last member's next link points to the first member, and the first
member's previous link points to the last member.

## Current limitations

This implementation is client-side. Each member site must load
`webring.js`, and the central `users.json` file must be publicly accessible
to the member's browser.

It does not yet provide server-side `/next`, `/prev`, or `/random` redirect
endpoints. Those endpoints would require a backend routing server.
