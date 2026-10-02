async function loadWebring() {
  const navigation = document.querySelector('.webring-nav');
  const listElement = document.getElementById('webring-list');

  if (!navigation) {
    return;
  }

  try {
    const response = await fetch(navigation.dataset.usersUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    if (listElement) {
      listElement.innerHTML = '';

      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML =
          `${user.name} — ${user.major}, ${user.year} ` +
          `<a href="${user.url}" target="_blank" rel="noopener">${user.url}</a>`;
        listElement.appendChild(listItem);
      });
    }

    setupNavigation(navigation, users);
  } catch (error) {
    console.error('Error loading webring sites:', error);

    if (listElement) {
      listElement.innerText = 'Failed to load webring directory.';
    }
  }
}

function setupNavigation(navigation, users) {
  const previousLink = navigation.querySelector('[data-direction="previous"]');
  const nextLink = navigation.querySelector('[data-direction="next"]');
  const isHub = navigation.dataset.hub === 'true';

  if (isHub) {
    setNavigationLinks(navigation, users[users.length - 1], users[0]);
    return;
  }

  const configuredSiteUrl = navigation.dataset.siteUrl?.trim();
  const currentSiteUrl = configuredSiteUrl || window.location.href;
  const currentIndex = users.findIndex(user =>
    normalizeUrl(user.url) === normalizeUrl(currentSiteUrl)
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
