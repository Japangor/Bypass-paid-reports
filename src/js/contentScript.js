if (!matchDomain(['seekingalpha.com', 'sfchronicle.com', 'cen.acs.org'])) {
  window.localStorage.clear();
}

if (matchDomain('elmercurio.com')) {
  if (window.location.href.toLowerCase().includes('/inversiones/')) {
    document.addEventListener('DOMContentLoaded', () => {
      const paywall = document.querySelector('#modal_limit_articulos');
      const body = document.querySelector('body');
      removeDOMElement(paywall);
      if (body.hasAttribute('class')) { body.removeAttribute('class'); }
    });
  }
} else if (matchDomain('estadao.com.br')) {
  setTimeout(function () {
    const paywall = document.querySelector('#paywall-wrapper-iframe-estadao');
    const body = document.querySelector('html');

    removeDOMElement(paywall);
    body.removeAttribute('style');
  }, 300); // Delay (in milliseconds)
} else if (matchDomain('rep.repubblica.it')) {
  if (window.location.href.includes('/pwa/')) {
    setTimeout(function () {
      window.location.href = window.location.href.replace('/pwa/', '/ws/detail/');
    }, 400);
  }
  if (window.location.href.includes('/ws/detail/')) {
    const paywall = document.querySelector('.paywall[subscriptions-section="content"]');
    if (paywall) {
      paywall.removeAttribute('subscriptions-section');
      const preview = document.querySelector('div[subscriptions-section="content-not-granted"]');
      if (preview) {
        preview.remove();
      }
    }
  }
} else if (matchDomain('americanbanker.com')) {
  const paywall = document.getElementsByClassName('embargo-content')[0];
  if (paywall) { paywall.classList.remove('embargo-content'); }
} else if (matchDomain('telegraaf.nl')) {
  if (window.location.href.startsWith('https://www.telegraaf.nl/error?ref=/')) {
    window.location.href = window.location.href.split('&')[0].replace('error?ref=/', '');
  }
  const articleWrapper = document.querySelector('.ArticlePageWrapper__uid');
  const spotXBanner = document.querySelector('.ArticleBodyBlocks__inlineArticleSpotXBanner');
  const paywall = document.querySelector('.PopupBackdrop__block');
  removeDOMElement(spotXBanner, paywall);
  const premium = document.querySelector('.PremiumLabelWithLine__body');
  const articleId = articleWrapper ? articleWrapper.innerText : '123';
  const articleBodyDone = document.querySelector('#articleBody' + articleId);
  if (premium && !articleBodyDone) {
    const articleBodyOld = document.querySelector('[id^=articleBody]');
    removeDOMElement(articleBodyOld);
    const json = document.querySelector('script[type="application/ld+json"][data-react-helmet="true"]');
    if (json) {
      const jsonText = JSON.parse(json.text).articleBody;
      const articleBody = document.querySelector('section.TextArticlePage__bodyText');
      if (articleBody) {
        const divMain = document.createElement('div');
        divMain.setAttribute('id', 'articleBody' + articleId);
        const divElem = document.createElement('div');
        divElem.setAttribute('data-element', 'articleBodyBlocks');
        const textArray = jsonText.split('\n\n');
        textArray.forEach(pText => {
          const pDiv = document.createElement('p');
          pDiv.setAttribute('class', 'ArticleBodyBlocks__paragraph ArticleBodyBlocks__paragraph--nieuws');
          pDiv.innerText = pText;
          divElem.appendChild(pDiv);
        });
        divMain.appendChild(divElem);
        articleBody.appendChild(divMain);
      }
    }
  }
} else if (matchDomain(['ad.nl', 'ed.nl'])) {
  const paywall = document.querySelector('.article__component.article__component--paywall-module-notification');
  removeDOMElement(paywall);
} else if (matchDomain('washingtonpost.com')) {
  if (window.location.href.includes('/gdpr-consent/')) {
    const freeButton = document.querySelector('.gdpr-consent-container .continue-btn.button.free');
    if (freeButton) { freeButton.click(); }

    setTimeout(function () {
      const gdprcheckbox = document.querySelector('.gdpr-consent-container .consent-page:not(.hide) #agree');
      if (gdprcheckbox) {
        gdprcheckbox.checked = true;
        gdprcheckbox.dispatchEvent(new Event('change'));

        document.querySelector('.gdpr-consent-container .consent-page:not(.hide) .continue-btn.button.accept-consent').click();
      }
    }, 300); // Delay (in milliseconds)
  }
} else if (matchDomain('wsj.com')) {
  if (window.location.href.includes('/articles/')) {
    const closeButton = document.querySelector('div.close-btn[role="button"]');
    if (closeButton) { closeButton.click(); }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.href;
    const snippet = document.querySelector('.snippet-promotion');
    const wsjPro = document.querySelector('meta[name="page.site"][content="wsjpro"]');
    if (snippet || wsjPro) {
      if (!window.location.hash) {
        if (url.includes('?')) {
          window.location.href = url.replace('?', '#refreshed?');
        } else { window.location.href = url + '#refreshed'; }
      } else { window.location.href = window.location.href.replace('wsj.com', 'wsj.com/amp').replace('#refreshed', ''); }
    }
  });
} else if (matchDomain('sloanreview.mit.edu')) {
  const readMore = document.querySelector('.btn-read-more');
  if (readMore) {
    readMore.click();
  }
} else if (matchDomain('mexiconewsdaily.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const sideNotification = document.querySelector('.pigeon-widget-prompt');
    const subMessage = document.querySelector('.sub_message_container');
    const popup = document.querySelector('.popupally-pro-outer-full-width-7-fluid_qemskqa');
    const bgFocusRemoverId = document.getElementById('popup-box-pro-gfcr-7');

    removeDOMElement(sideNotification, subMessage, popup, bgFocusRemoverId);
  });
} else if (matchDomain(['theathletic.com', 'theathletic.co.uk'])) {
  const landingBanner = document.querySelector('.logged-out-landing-banner');
  const sampleBanner = document.querySelector('.main-sample-banner');
  const bottomBanner = document.querySelector('.border-bottom-cc');
  const subscribe = document.querySelector('.subscribe-ad-text');
  removeDOMElement(landingBanner, sampleBanner, bottomBanner, subscribe);
} else if (matchDomain('the-american-interest.com')) {
  const counter = document.getElementById('article-counter');
  removeDOMElement(counter);
} else if (matchDomain('nzherald.co.nz')) {
  const paywall = document.getElementById('article-content');
  if (paywall) {
    const premium = document.getElementsByClassName('premium-sub')[0];
    removeDOMElement(premium);
    paywall.classList.remove('premium-content');
    paywall.classList.add('full-content');
    removeClassesByPrefix(paywall, 'QUnW');
    const paras = paywall.querySelectorAll('p, span, h2, div');
    for (const el of paras) {
      removeClassesByPrefix(el, 'QUnW');
      el.classList.remove('ellipsis');
      el.removeAttribute('style');
    }
  }
} else if (matchDomain('thestar.com')) {
  setTimeout(function () {
    const paywall = document.querySelector('.basic-paywall-new');
    removeDOMElement(paywall);
    const tbc = document.querySelectorAll('.text-block-container');
    for (const el of tbc) {
      el.removeAttribute('style');
    }
  }, 1000); // Delay (in milliseconds)
} else if (matchDomain('afr.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const hiddenImage = document.querySelectorAll('img');
    for (const image of hiddenImage) {
      const src = image.src;
      if ('src: ' + src.indexOf('.gif') !== -1) {
        const dataSrc = image.getAttribute('data-src');
        if (dataSrc) {
          image.setAttribute('src', dataSrc);
        }
      }
    }
    const plista = document.querySelector('div[data-plista-placement="underArticle_Group"]');
    removeDOMElement(plista);
  });
} else if (matchDomain(['parool.nl', 'trouw.nl', 'volkskrant.nl', 'demorgen.be'])) {
  document.addEventListener('DOMContentLoaded', () => {
    const topBanner = document.querySelector('div[data-temptation-position="PAGE_TOP"]');
    const paywall = document.querySelector('div[data-temptation-position="ARTICLE_BOTTOM"]');
    const hiddenSection = document.querySelector('div[data-temptation-position="ARTICLE_INLINE"]');
    const overlay = document.querySelector('div[data-temptation-position="PAGE_BOTTOM"]');
    removeDOMElement(topBanner, paywall, hiddenSection, overlay);
  });
} else if (matchDomain('firstthings.com')) {
  const paywall = document.getElementsByClassName('paywall')[0];
  removeDOMElement(paywall);
} else if (matchDomain('bloomberg.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const fence = document.querySelector('.fence-body');
    if (fence) {
      fence.classList.remove('fence-body');
    }
    const paywall = document.getElementById('paywall-banner');
    removeDOMElement(paywall);
  });
} else if (matchDomain('bloombergquint.com')) {
  const articlesLeftModal = document.getElementsByClassName('paywall-meter-module__story-paywall-container__1UgCE')[0];
  const paywall = document.getElementById('paywallDmp');
  removeDOMElement(articlesLeftModal, paywall);
} else if (matchDomain('medium.com')) {
  const bottomMessageText = 'Get one more story in your member preview when you sign up. It’s free.';
  const DOMElementsToTextDiv = pageContains('div', bottomMessageText);
  if (DOMElementsToTextDiv[2]) removeDOMElement(DOMElementsToTextDiv[2]);
} else if (matchDomain('theglobeandmail.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const subscribed = document.querySelector('html.story-subscribed');
    if (subscribed && !window.location.href.includes('?ref=premium')) {
      window.setTimeout(function () {
        window.location.href = new URL(window.location.href).pathname + '?ref=premium';
      }, 100);
    }
  });
  const cCards = document.querySelectorAll('div.c-card');
  for (const cCard of cCards) {
    const aLink = cCard.querySelector('a');
    const key = cCard.querySelector('span.c-indicator-icon--key');
    if (key && aLink && !aLink.href.includes('?ref=premium')) {
      aLink.href = aLink.href + '?ref=premium';
    }
  }
} else if (matchDomain(['examiner.com.au', 'thecourier.com.au', 'theadvocate.com.au'])) {
  const subscribeTruncate = document.querySelector('.subscribe-truncate');
  if (subscribeTruncate) { subscribeTruncate.classList.remove('subscribe-truncate'); }
  const subscriberHider = document.querySelectorAll('.subscriber-hider');
  for (const el of subscriberHider) {
    el.classList.remove('subscriber-hider');
  }
} else if (matchDomain('canberratimes.com.au')) {
  const paywall = document.querySelector('.subscribe-article.news-article-body.article__body');
  paywall.classList.remove('subscribe-article');
  const subscribe = document.getElementsByClassName('subscriber-container')[0];
  removeDOMElement(subscribe);
  const content = document.getElementsByClassName('subscriber-hider');
  for (const el of content) {
    el.classList.remove('subscriber-hider');
  }
} else if (matchDomain('asia.nikkei.com')) {
  const cookieBanner = document.querySelector('.pw-widget');
  removeDOMElement(cookieBanner);
} else if (matchDomain('ledevoir.com')) {
  const counter = document.querySelector('.full.hidden-print.popup-msg');
  removeDOMElement(counter);
} else if (matchDomain('ft.com')) {
  const cookieBanner = document.querySelector('.cookie-banner');
  removeDOMElement(cookieBanner);
} else if (matchDomain('thehindu.com')) {
  const paywall = document.getElementById('test');
  removeDOMElement(paywall);
} else if (matchDomain('nytimes.com')) {
  const previewButton = document.querySelector('.css-3s1ce0');
  if (previewButton) { previewButton.click(); }
} else if (matchDomain('technologyreview.com')) {
  // The class of banner is like 'overlayFooter__wrapper--3DhFn', which is hard to select exactly
  const subscribeBanner = document.querySelector('[class*=overlayFooter__wrapper]');
  removeDOMElement(subscribeBanner);
} else if (matchDomain('leparisien.fr')) {
  window.removeEventListener('scroll', this.scrollListener);
  const paywall = document.querySelector('.relative.piano-paywall.below_nav.sticky');
  removeDOMElement(paywall);
  setTimeout(function () {
    const content = document.getElementsByClassName('content');
    for (const el of content) {
      el.removeAttribute('style');
    }
  }, 300); // Delay (in milliseconds)
} else if (matchDomain('caixinglobal.com')) {
  const payTips = document.querySelectorAll('.cons-pay-tip');
  for (const payTip of payTips) {
    payTip.removeAttribute('style');
  }
  const appContent = document.getElementById('appContent');
  if (appContent) {
    const pHidden = document.querySelectorAll('p:not([style="display:block;"]');
    for (const el of pHidden) {
      el.setAttribute('style', 'display:block;');
    }
  }
} else if (matchDomain('bizjournals.com')) {
  const sheetOverlay = document.querySelector('.sheet-overlay');
  const chunkPaywall = document.querySelector('.chunk--paywall');
  removeDOMElement(sheetOverlay, chunkPaywall);
  const overlaid = document.querySelectorAll('.is-overlaid');
  for (const el of overlaid) {
    el.classList.remove('is-overlaid');
  }
  const bodyHidden = document.querySelector('.js-pre-chunks__story-body');
  bodyHidden.removeAttribute('style');
} else if (matchDomain('the-tls.co.uk')) {
  const paywall = document.querySelector('.tls-subscriptions-banner__closed-skin');
  removeDOMElement(paywall);
} else if (matchDomain('cen.acs.org')) {
  const paywall = document.querySelector('.meteredBar');
  removeDOMElement(paywall);
} else if (matchDomain('elpais.com')) {
  setTimeout(function () {
    const paywall = document.querySelector('.fc-ab-root');
    const body = document.querySelector('.salida_articulo');

    removeDOMElement(paywall);
    body.removeAttribute('style');
  }, 500); // Delay (in milliseconds)
} else if (matchDomain('techinasia.com')) {
  const paywall = document.querySelector('.paywall-content');
  if (paywall) {
    paywall.classList.remove('paywall-content');
  }
  const splashSubscribe = document.querySelector('.splash-subscribe');
  const paywallHard = document.querySelector('.paywall-hard');
  removeDOMElement(splashSubscribe, paywallHard);
} else if (matchDomain('thewrap.com')) {
  const embed = document.querySelector('.embed');
  if (embed) {
    // Display feature video
    const container = document.querySelector('.featured-image-container');
    removeDOMElement(container);
    embed.classList.remove('d-none');
  }
} else if (matchDomain('hbr.org')) {
  const banner = document.querySelector('.persistent-banner');
  removeDOMElement(banner);
} else if (matchDomain('spectator.co.uk')) {
  const container = document.querySelector('.HardPayWallContainer-module__overlay');
  window.setTimeout(function () {
    if (container && window.location.href.includes('/www.spectator.co.uk/')) {
      window.location.href = window.location.href + '/amp';
    }
  }, 500);
} else if (matchDomain('barrons.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const bodyContinuous = document.querySelector('body.is-continuous');
    const snippet = document.querySelector('meta[content="snippet"]');
    if (bodyContinuous && snippet) {
      window.location.href = window.location.href.replace('barrons.com', 'barrons.com/amp');
    }
  });
  if (!window.location.href.includes('barrons.com/amp/')) {
    let href = '';
    const signinLinks = document.querySelectorAll('a.primary-button--link');
    for (const signinLink of signinLinks) {
      href = signinLink.href;
      if (href.includes('target=')) {
        href = href.split('target')[1].split('%3F')[0];
        href = href.replace('=', '').replace('%3A', ':').replace(/%2F/g, '/');
        signinLink.href = href;
        signinLink.text = 'Click';
      }
    }
  }
} else if (matchDomain('nzz.ch')) {
  const paywall = document.querySelector('.dynamic-regwall');
  removeDOMElement(paywall);
} else if (matchDomain('irishtimes.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const stubArticleMsg = document.querySelector('div.stub-article-msg');
    const url = window.location.href;
    if (url.includes('mode=sample') || stubArticleMsg) { window.location.href = new URL(url).pathname + '?mode=amp'; }
  });
}

function matchDomain (domains) {
  const hostname = window.location.hostname;
  if (typeof domains === 'string') { domains = [domains]; }
  return domains.some(domain => hostname === domain || hostname.endsWith('.' + domain));
}

function removeDOMElement (...elements) {
  for (const element of elements) {
    if (element) { element.remove(); }
  }
}

function removeClassesByPrefix (el, prefix) {
  for (const clazz of el.classList) {
    if (clazz.startsWith(prefix)) {
      el.classList.remove(clazz);
    }
  }
}

function pageContains (selector, text) {
  const elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}
