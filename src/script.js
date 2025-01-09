/* eslint-disable
 */

// Commenting out the scripts below, don't think they work anymore
/*
$(window).on('pageLoad', function(e, state){
  $('*:contains(":oid:"):last').html(`'${makeid(12)}'`);
});

$('*:contains(":oid:"):last').html(`'${makeid(12)}'`);

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
*/

function getScript(source, callback) {
  var script = document.createElement("script");
  var prior = document.getElementsByTagName("script")[0];
  script.async = 1;

  script.onload = script.onreadystatechange = function (_, isAbort) {
    if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
      script.onload = script.onreadystatechange = null;
      script = undefined;

      if (!isAbort && callback) setTimeout(callback, 0);
    }
  };

  script.src = source;
  prior.parentNode.insertBefore(script, prior);
}

/* Hacky script for loading Twitter widget
 */
function loadTwitterWidget() {
  var hasTwitterWidget = document.getElementsByClassName("twitter-tweet");
  if (hasTwitterWidget.length > 0) {
    getScript("https://platform.twitter.com/widgets.js", () => {});
  }
}

function custom404Stuff() {
  // the search bar takes a bit to show up, so we need to wait for it
  setTimeout(() => {
    const helpTextKBD = document.getElementById("search-key-404-clone");
    const helpInnerText = document.querySelector("#SearchBert + kbd")?.innerText;
    if (helpTextKBD && helpInnerText) {
      const newText = helpInnerText.replace("\n", "");
      console.debug("updating 404 text for this element:",helpTextKBD,"to this text:",helpInnerText);
      helpTextKBD.innerText = newText;
    }
  }, 250)

}

function rebaseMobileSearchButton() {
  var searchButton = $(".rm-Header-top .rm-SearchToggle");
  var menuHolder = $(".rm-Flyout > div");
  if (searchButton.length && menuHolder.length) {
    searchButton.appendTo(menuHolder);
  }
}

/* *********************
   Populate marketing site URL in GLP logo
   ********************* */
function updateGLPLogoLink() {
  if (location.pathname !== "/") return;
  document.querySelector('a.rm-Logo:not([class^="Mobile"])').href = "https://readme.com";
}

/* *********************
   Load Changelog from RSS feed
   ********************* */

function loadChangelogPosts() {
  if (location.pathname !== "/") return;
  const changelogRss = "/main/changelog.rss";

  const changelogIcon = {
    added: { color: "green", icon: "plus1" },
    improved: { color: "purple", icon: "heart1" },
    fixed: { color: "blue", icon: "check1" },
    deprecated: { color: "yellow", icon: "alert-triangle" },
  };

  const parser = new RSSParser({ customFields: { item: ["type"] } });
  parser.parseURL(changelogRss, function (err, feed) {
    if (err) throw err;
    const parent = document.getElementById("changelogs-target");
    const changelogEntries = [];

    for (let i = 0; i <= 2; i += 1) {
      const entry = feed.items[i];

      const changelogPost = document.createElement("li");
      changelogPost.className = "flex flex_col ChangelogPost";

      if (entry.type) {
        const changelogType = document.createElement("div");
        changelogType.className = "flex flex_center ChangelogPost-tag";
        changelogType.style = "gap: var(--xs)";

        const typeIcon = document.createElement("span");
        const { color, icon } = changelogIcon[entry.type];
        typeIcon.className = `TileIcon TileIcon_sm TileIcon_${color} icon icon-${icon}`;

        const typeText = document.createElement("span");
        typeText.innerText = entry.type;
        typeText.style = "text-transform: capitalize;";

        changelogType.appendChild(typeIcon);
        changelogType.appendChild(typeText);
        changelogPost.appendChild(changelogType);
      }

      const changelogTitle = document.createElement("a");
      changelogTitle.className = "ChangelogPost-link";
      changelogTitle.href = entry.link;
      changelogTitle.innerText = entry.title;

      const changelogTitleArrow = document.createElement("i");
      changelogTitleArrow.className = "icon icon-arrow-right2";
      changelogTitle.appendChild(changelogTitleArrow);
      changelogPost.appendChild(changelogTitle);

      const changelogDate = document.createElement("span");
      changelogDate.className = "ChangelogPost-date";
      changelogDate.innerText = timeago.format(entry.isoDate);
      changelogPost.appendChild(changelogDate);

      changelogEntries.push(changelogPost);
    }

    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

    changelogEntries.forEach(function (entry) {
      parent.appendChild(entry);
    });
  });
}

/* *********************
   Generate Nav
   ********************* */
const links = [
  {
    href: "https://docs.readme.com",
    icon: "icon-landing-page-2",
    text: "Home",
  },
  {
    href: "https://docs.readme.com/main/docs",
    icon: "icon-guides",
    text: "Product Guides",
  },
  {
    href: "https://docs.readme.com/ent/docs",
    icon: "icon-guides",
    text: "Enterprise Guides",
  },
  {
    href: "https://docs.readme.com/main/recipes",
    icon: "icon-recipes",
    text: "Recipes",
  },
  {
    href: "https://docs.readme.com/main/reference",
    icon: "icon-references",
    text: "API Reference",
  },
  {
    href: "https://docs.readme.com/main/changelog",
    icon: "icon-changelog",
    text: "Changelog",
  },
  {
    href: "https://docs.readme.com/main/discuss",
    icon: "icon-discussions",
    text: "Discussions",
  },
  {
    href: "https://docs.readme.com/rdmd/docs",
    icon: "icon-markdown",
    text: "ReadMe Markdown",
  },
];

function populateMainNav() {
  const mainNav = document.querySelector('.rm-Header nav:first-child');
  const mobileNav = document.querySelector(".rm-Flyout > div");

  // Completely replaces nav
  function cleanUpdate() {
    // Create new links
    let mainLinkEls = "";
    let mobileLinkEls = "";
    links.map(({ href, icon, text }) => {
      // determine if link is active
      let isActive = false;
      const hrefUrl = new URL(href);
      if (location.pathname.includes(hrefUrl.pathname)) isActive = true;
      // landing page quirk
      if (hrefUrl.pathname === "/" && location.pathname !== "/") isActive = false;

      mainLinkEls += `<a class="Button Button_md Button_slate_text rm-Header-bottom-link ${
        isActive ? "active" : ""
      }" href=${hrefUrl.pathname}><i class=${icon}></i><span>${text}</span></a>`;
      mobileLinkEls += `<a class="NavItem-item1gDDTqaXGhm1 NavItem-item_mobile1qG3gd-Mkck- ${
        isActive ? "active" : ""
      }" href=${
        hrefUrl.pathname
      } target="_self"><i class="NavItem-item-anchorzz3banOxXKjr ${icon}"></i><span class="NavItem-textSlZuuL489uiw">${text}</span></a>`;
    });

    // Replace main nav
    mainNav.innerHTML = mainLinkEls;

    // Add standard links (customer stories, logo, etc.) onto mobile nav
    mobileLinkEls += '<hr class="MobileFlyout-divider10xf7R2X1MeW">';
    mobileLinkEls +=
      '<a class="NavItem-item1gDDTqaXGhm1 NavItem-item_mobile1qG3gd-Mkck- NavItem_dropdown-muted1xJVuczwGc74" href="https://readme.com/customers" rel="noopener" target="_blank" to="https://readme.com/customers">Customer Stories</a>';
    mobileLinkEls +=
      '<a class="NavItem-item1gDDTqaXGhm1 NavItem-item_mobile1qG3gd-Mkck- NavItem_dropdown-muted1xJVuczwGc74" href="https://readme.com/pricing" rel="noopener" target="_blank" to="https://readme.com/pricing">Pricing</a>';
    // TODO: figure out how to add nav item for user controls
    mobileLinkEls += "";
    mobileLinkEls +=
      '<a class="MobileFlyout-logo3Lq1eTlk1K76 Header-logo1Xy41PtkzbdG rm-Logo" href="https://readme.com" target="_self"><img alt="ReadMe Logo" class="Header-logo-img3YvV4lcGKkeb rm-Logo-img" src="https://files.readme.io/68da258-644ef91-readme-white_1.svg"></a>';

    // Replace mobile nav
    mobileNav.innerHTML = mobileLinkEls;
  }

  console.debug("about to update nav for ", location.pathname);

  if (location.pathname.startsWith("/main")) {
    // for the main project, we take a more surgical approach to constructing the nav
    try {
      // Rename guides node, create home and enterprise nodes and insert them
      function insertNavLinks(navNode) {
        // if we've already inserted the nav links, don't do anything
        if (navNode.firstChild.innerText.trim() === "Home") return;

        navNode.firstChild.childNodes[1].innerText = "Product Guides";
        const baseNode = navNode.firstChild.cloneNode(true);

        links.map((link, i) => {
          const hrefUrl = new URL(link.href);
          // don't create nodes for existing main project
          if (hrefUrl.pathname.startsWith("/main")) return true;

          const newNode = baseNode.cloneNode(true);
          newNode.classList.remove("active");
          newNode.removeAttribute("aria-current");
          newNode.href = hrefUrl.pathname;
          newNode.childNodes[1].innerText = link.text;
          newNode.firstChild.classList.replace("icon-guides", link.icon);

          const nodeToInsertBefore = navNode.childNodes[i] || null;
          navNode.insertBefore(newNode, nodeToInsertBefore);
        });
      }

      console.debug("surgical nav bar update");
      insertNavLinks(mainNav);
      insertNavLinks(mobileNav);
    } catch (e) {
      console.debug("clean nav bar update due to surgical update error");
      cleanUpdate();
    }
  } else {
    console.debug("clean nav bar update due to non-main project route");
    cleanUpdate();
  }

  mainNav.style.visibility = "visible";
}

$(window).on("pageLoad", function (e, state) {
  console.debug("pageLoad event for", window.location.pathname, state);
  loadTwitterWidget();
  // rebaseMobileSearchButton();
  loadChangelogPosts();
  populateMainNav();
  updateGLPLogoLink();
  custom404Stuff();
});
