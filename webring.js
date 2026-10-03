async function loadWebring() {
  const navigation = document.querySelector('.webring-nav');
  const listElement = document.getElementById('webring-list');

  if (!navigation) {
    return;
  }
  try {
    // LIST OF WEBRING MEMBERS
    let members = 
    [
      {
          "name": "Jordin Chavez",
          "year": 2028,
          "major": "Computer Science",
          "url": "https://iordjn.github.io/Jordin-Portfolio"
      },
      {
          "name": "John Doe",
          "year": 2026,
          "major": "Computer Science",
          "url": "https://example.com/johndoe"
      },
      {
          "name": "Jane Smith",
          "year": 2025,
          "major": "Information Technology",
          "url": "https://example.com/janesmith"
      },
      {
          "name": "Alice Johnson",
          "year": 2030,
          "major": "Software Engineering",
          "url": "https://example.com/alicejohnson"
      },
      {
          "name": "Bob Brown",
          "year": 2027,
          "major": "Cybersecurity",
          "url": "https://example.com/bobbrown"
      },
      {
          "name": "Charlie Davis",
          "year": 2028,
          "major": "Data Science",
          "url": "https://example.com/charliedavis"
      },
      {
          "name": "Eve Wilson",
          "year": 2029,
          "major": "Artificial Intelligence",
          "url": "https://example.com/evewilson"
      }
    ]; // ADD YOUR INFO TO THE BOTTOM OF LIST ^^^

      if (listElement) {
        listElement.innerHTML = '';

        members.forEach(member => {
          const listItem = document.createElement('li');
          listItem.innerHTML =
            `${member.name} — ${member.major}, ${member.year} ` +
            `<a href="${member.url}" target="_blank" rel="noopener">${member.url}</a>`;
          listElement.appendChild(listItem);
        });
      }

    setupNavigation(navigation, members);
  } catch (error) {
    console.error('Error loading webring sites:', error);

    if (listElement) {
      listElement.innerText = 'Failed to load webring directory.';
    }
  }
}

function setupNavigation(navigation, members) {
  const previousLink = navigation.querySelector('[data-direction="previous"]');
  const nextLink = navigation.querySelector('[data-direction="next"]');
  const isHub = navigation.dataset.hub === 'true';

  if (isHub) {
    setNavigationLinks(navigation, members[members.length - 1], members[0]);
    return;
  }

  const configuredSiteUrl = navigation.dataset.siteUrl?.trim();
  const currentSiteUrl = configuredSiteUrl || window.location.href;
  const currentIndex = members.findIndex(member =>
    normalizeUrl(member.url) === normalizeUrl(currentSiteUrl)
  );

  if (currentIndex === -1) {
    previousLink?.setAttribute('aria-disabled', 'true');
    nextLink?.setAttribute('aria-disabled', 'true');
    console.warn('This site is not listed in users.json. Set data-site-url to the site URL.');
    return;
  }

  const previousUser = users[(currentIndex - 1 + users.length) % users.length];
  const nextUser = users[(currentIndex + 1) % users.length];

  setNavigationLinks(navigation, previousUser, nextUser);
}

function setNavigationLinks(navigation, previousUser, nextUser) {
  const previousLink = navigation.querySelector('[data-direction="previous"]');
  const nextLink = navigation.querySelector('[data-direction="next"]');

  if (previousLink) {
    previousLink.href = previousUser.url;
  }

  if (nextLink) {
    nextLink.href = nextUser.url;
  }
}

function normalizeUrl(value) {
  const url = new URL(value, window.location.href);
  return `${url.origin}${url.pathname}`.replace(/\/+$/, '');
}

loadWebring();
