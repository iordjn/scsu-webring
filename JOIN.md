# Join the SCSU Webring

The SCSU Webring connects websites created by St. Cloud State University
students and alumni. To join, add your website to the member list and place
the webring navigation on your site.

## Requirements

Your website should:

- Be created or maintained by an SCSU student or alumnus.
- Have a publicly accessible URL.
- Allow you to add a small HTML navigation block.

## Step 1: Add your website

Add an object to [`users.json`](./users.json):

```json
{
  "name": "Your Name",
  "year": 2026,
  "major": "Your Major",
  "url": "https://your-site.example"
}
```

Replace the example values with your information. Keep the JSON valid, and
add a comma after the previous entry when adding a new member.

The `url` must be the exact public URL where the webring navigation is
installed.

## Step 2: Add the navigation

Copy this HTML into your website:

```html
<nav
  class="webring-nav"
  data-site-url="https://your-site.example"
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

Change this value to your own website URL:

```html
data-site-url="https://your-site.example"
```

It must match your `url` value in `users.json`.

The `data-users-url` and script URL should point to the central SCSU
Webring repository so that every member uses the same member list and routing
logic.

## Step 3: Test your navigation

Open your website and check that:

1. The Previous link opens the member before you.
2. The Next link opens the member after you.
3. Your site appears in the correct position in the chain.
4. The browser console does not show a fetch or JavaScript error.

The chain follows the order of entries in `users.json`. The first member's
Previous link goes to the last member, and the last member's Next link goes
to the first member.

## Step 4: Submit your change

Create a pull request with:

- Your new entry in `users.json`.
- The webring navigation installed on your website.
- Any styling changes needed to make the navigation fit your site.

Include your website URL and site name in the pull request description.

## Local testing

If you are testing a local copy of the project, do not open `index.html`
directly from the filesystem. Start a local HTTP server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Troubleshooting

### The arrows do nothing

Confirm that your navigation includes both:

```html
data-direction="previous"
data-direction="next"
```

Also check that the `webring.js` script is loaded.

### The navigation is disabled

The value of `data-site-url` does not match your entry in `users.json`.
Check the protocol, hostname, path, and trailing slash.

### The member list fails to load

Check that `data-users-url` points to the publicly accessible central
`users.json` file and that your browser allows the request.
