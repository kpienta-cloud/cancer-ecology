/* Substack feed rendering — reads from window.CEC_CONFIG.substackFeedUrl if set,
   otherwise falls back to window.CEC_POSTS placeholder data. */
(function () {
  const cfg = window.CEC_CONFIG || {};
  const placeholderPosts = (window.CEC_POSTS && window.CEC_POSTS.posts) || [];

  function fmtDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function stripHtml(s) {
    const div = document.createElement('div');
    div.innerHTML = s || '';
    return (div.textContent || '').trim();
  }

  // HTML-escape any string used inside a template literal that becomes innerHTML.
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Only allow http(s) and same-document hrefs. Reject javascript:, data:, etc.
  function safeHref(u, fallback) {
    if (typeof u !== 'string') return fallback || '#';
    const t = u.trim();
    if (/^https?:\/\//i.test(t)) return t;
    if (/^(mailto:|\/|\.\/|\.\.\/|#)/i.test(t)) return t;
    if (/\.html(\?.*)?(#.*)?$/i.test(t)) return t;
    return fallback || '#';
  }

  function excerpt(text, max) {
    text = stripHtml(text || '');
    if (text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
  }

  function renderHomeStrip(posts) {
    const host = document.querySelector('[data-feed="home"]');
    if (!host) return;
    const top = posts.slice(0, 3);
    host.innerHTML = top.map((p) => {
      const date = p.date ? fmtDate(p.date) : (p.status === 'upcoming' ? 'Upcoming' : '');
      const title = esc(p.title || '');
      const excerptText = esc(p.excerpt || '');
      const href = esc(safeHref(p.url, 'writing.html'));
      const meta = esc(p.number ? `№ ${String(p.number).padStart(2, '0')} · ${date}` : date);
      const more = p.status === 'upcoming' ? 'In the queue →' : 'Read on Substack →';
      return `
        <a class="post-card" href="${href}">
          <div class="post-card__meta">${meta}</div>
          <h3 class="post-card__title">${title}</h3>
          <p class="post-card__excerpt">${excerptText}</p>
          <span class="post-card__readmore">${more}</span>
        </a>
      `;
    }).join('');
  }

  function renderWritingFull(posts) {
    const host = document.querySelector('[data-feed="writing"]');
    if (!host) return;
    host.innerHTML = posts.map((p, i) => {
      const date = esc(p.date ? fmtDate(p.date) : (p.status === 'upcoming' ? 'Upcoming' : ''));
      const num = esc(`№ ${String(p.number || i + 1).padStart(2, '0')}`);
      const status = p.status === 'published' ? 'Published' : 'Drafted in the series plan';
      const safeUrl = p.url ? safeHref(p.url, null) : null;
      const href = safeUrl ? esc(safeUrl) : null;
      const title = esc(p.title || '');
      const dek = esc(p.dek || '');
      const excerptText = esc(p.excerpt || '');
      const reading = p.readingMinutes ? esc(String(p.readingMinutes)) : '';
      const upcomingClass = p.status === 'upcoming' ? 'writing-entry--upcoming' : '';
      return `
        <article class="writing-entry ${upcomingClass}">
          <div class="writing-entry__index">${num}</div>
          <div class="writing-entry__body">
            <div class="writing-entry__meta">
              <span>${status}</span>
              ${date ? `<span>·</span><span>${date}</span>` : ''}
              ${reading ? `<span>·</span><span>${reading} min read</span>` : ''}
            </div>
            ${href
              ? `<a class="writing-entry__title" href="${href}">${title}</a>`
              : `<h3 class="writing-entry__title writing-entry__title--unlinked">${title}</h3>`}
            ${dek ? `<p class="writing-entry__dek">${dek}</p>` : ''}
            ${excerptText ? `<p class="writing-entry__excerpt">${excerptText}</p>` : ''}
            ${href ? `<a class="writing-entry__link" href="${href}">Read on Substack →</a>` : ''}
          </div>
        </article>
      `;
    }).join('');
  }

  function fromRssItem(item, i) {
    return {
      number: i + 1,
      status: 'published',
      title: item.title || '(untitled)',
      excerpt: excerpt(item.description || item.content || '', 240),
      date: item.pubDate,
      url: item.link,
    };
  }

  async function loadRemote() {
    if (!cfg.substackFeedUrl) return null;
    try {
      const url = `${cfg.rss2jsonEndpoint}?rss_url=${encodeURIComponent(cfg.substackFeedUrl)}`;
      const r = await fetch(url);
      if (!r.ok) throw new Error('rss2json status ' + r.status);
      const data = await r.json();
      if (!data.items || !data.items.length) throw new Error('no items');
      return data.items.map(fromRssItem);
    } catch (err) {
      console.warn('Substack feed unavailable — using placeholder.', err);
      return null;
    }
  }

  (async function init() {
    const remote = await loadRemote();
    const posts = remote || placeholderPosts;
    renderHomeStrip(posts);
    renderWritingFull(posts);
  })();
})();
