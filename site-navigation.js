(() => {
  const links = {
    'All Services': '/', 'House Cleaning': '/services/regular-house-cleaning/', 'Deep Cleaning': '/services/deep-cleaning/', 'End of Lease': '/services/end-of-lease-cleaning/',
    '/house-cleaning-sydney': '/services/regular-house-cleaning/', '/deep-cleaning-sydney': '/services/deep-cleaning/', '/end-of-lease-cleaning-sydney': '/services/end-of-lease-cleaning/', '/ (All Services Default)': '/',
    'Book in 30s': '/contact/', 'Book': '/contact/', 'Get Booking Quote Now': '/contact/', 'Book Cleaner in 30s': '/contact/', 'Get Instant Quote': '/contact/'
  };
  const additions = [['Move In Cleaning','/services/move-in-cleaning/'], ['Office & Commercial','/services/office-commercial-cleaning/'], ['Airbnb Cleaning','/services/airbnb-short-term-rental-cleaning/']];
  const serviceLinks = {
    '/services/end-of-lease-cleaning/': [['Regular house cleaning','/services/regular-house-cleaning/'], ['Deep cleaning','/services/deep-cleaning/'], ['Move-in cleaning','/services/move-in-cleaning/'], ['Carpet steam cleaning','/services/carpet-steam-cleaning/'], ['Request a quote','/contact/']],
    '/services/regular-house-cleaning/': [['Weekly cleaning','/services/weekly-cleaning/'], ['Fortnightly cleaning','/services/fortnightly-cleaning/'], ['Deep cleaning','/services/deep-cleaning/'], ['Once-off cleaning','/services/once-off-cleaning/'], ['Request a quote','/contact/']],
    '/services/deep-cleaning/': [['Regular house cleaning','/services/regular-house-cleaning/'], ['End-of-lease cleaning','/services/end-of-lease-cleaning/'], ['Bathroom cleaning','/services/bathroom-cleaning/'], ['Once-off cleaning','/services/once-off-cleaning/'], ['Request a quote','/contact/']],
    '/services/move-in-cleaning/': [['End-of-lease cleaning','/services/end-of-lease-cleaning/'], ['Deep cleaning','/services/deep-cleaning/'], ['Regular house cleaning','/services/regular-house-cleaning/'], ['Request a quote','/contact/']],
    '/services/office-commercial-cleaning/': [['Strata cleaning','/services/strata-common-area-cleaning/'], ['Window cleaning','/services/window-cleaning/'], ['Carpet steam cleaning','/services/carpet-steam-cleaning/'], ['Request a quote','/contact/']],
    '/services/airbnb-short-term-rental-cleaning/': [['Deep cleaning','/services/deep-cleaning/'], ['Oven cleaning','/services/oven-cleaning/'], ['Regular house cleaning','/services/regular-house-cleaning/'], ['Request a quote','/contact/']],
    '/services/carpet-steam-cleaning/': [['End-of-lease cleaning','/services/end-of-lease-cleaning/'], ['Deep cleaning','/services/deep-cleaning/'], ['Window cleaning','/services/window-cleaning/'], ['Request a quote','/contact/']],
    '/services/strata-common-area-cleaning/': [['Commercial cleaning','/services/office-commercial-cleaning/'], ['Window cleaning','/services/window-cleaning/'], ['Carpet steam cleaning','/services/carpet-steam-cleaning/'], ['Request a quote','/contact/']],
    '/services/oven-cleaning/': [['End-of-lease cleaning','/services/end-of-lease-cleaning/'], ['Deep cleaning','/services/deep-cleaning/'], ['Airbnb cleaning','/services/airbnb-short-term-rental-cleaning/'], ['Request a quote','/contact/']],
    '/services/window-cleaning/': [['Strata cleaning','/services/strata-common-area-cleaning/'], ['Commercial cleaning','/services/office-commercial-cleaning/'], ['End-of-lease cleaning','/services/end-of-lease-cleaning/'], ['Request a quote','/contact/']],
    '/services/bathroom-cleaning/': [['Deep cleaning','/services/deep-cleaning/'], ['Regular house cleaning','/services/regular-house-cleaning/'], ['End-of-lease cleaning','/services/end-of-lease-cleaning/'], ['Request a quote','/contact/']],
    '/services/once-off-cleaning/': [['Deep cleaning','/services/deep-cleaning/'], ['Regular house cleaning','/services/regular-house-cleaning/'], ['End-of-lease cleaning','/services/end-of-lease-cleaning/'], ['Request a quote','/contact/']],
    '/services/fortnightly-cleaning/': [['Weekly cleaning','/services/weekly-cleaning/'], ['Regular house cleaning','/services/regular-house-cleaning/'], ['Deep cleaning','/services/deep-cleaning/'], ['Request a quote','/contact/']],
    '/services/spring-cleaning/': [['Deep cleaning','/services/deep-cleaning/'], ['Once-off cleaning','/services/once-off-cleaning/'], ['Window cleaning','/services/window-cleaning/'], ['Request a quote','/contact/']],
    '/services/post-construction-cleaning/': [['Deep cleaning','/services/deep-cleaning/'], ['Window cleaning','/services/window-cleaning/'], ['Commercial cleaning','/services/office-commercial-cleaning/'], ['Request a quote','/contact/']],
    '/services/pre-sale-open-home-cleaning/': [['Deep cleaning','/services/deep-cleaning/'], ['Window cleaning','/services/window-cleaning/'], ['End-of-lease cleaning','/services/end-of-lease-cleaning/'], ['Request a quote','/contact/']],
    '/services/ndis-cleaning-support/': [['Regular house cleaning','/services/regular-house-cleaning/'], ['Deep cleaning','/services/deep-cleaning/'], ['Once-off cleaning','/services/once-off-cleaning/'], ['Request a quote','/contact/']]
  };
  const ensureStyles = () => {
    if (document.querySelector('link[data-seo-related-links-style]')) return;
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = '/seo-related-links.css'; link.dataset.seoRelatedLinksStyle = 'true'; document.head.appendChild(link);
  };
  const cleanText = () => {
    const replacements = {'Preview Optimized SEO Landing':'View service details','Special Estimate Quote':'Quote on request','Trust Is Our Core Core Currency':'Trust is our core currency'};
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { let value = node.nodeValue; Object.entries(replacements).forEach(([from,to]) => { value = value.split(from).join(to); }); if (value !== node.nodeValue) node.nodeValue = value; });
  };
  const addRelatedLinks = () => {
    const path = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`; const items = serviceLinks[path];
    if (!items || document.querySelector('[data-seo-related-links]')) return;
    const section = document.createElement('section'); section.dataset.seoRelatedLinks = 'true'; section.className = 'seo-related-links';
    section.innerHTML = `<h2>Related cleaning services</h2><p>${items.map(([label,href]) => `<a href="${href}">${label}</a>`).join(' · ')}</p>`; document.body.appendChild(section);
  };
  const swap = () => {
    ensureStyles();
    document.querySelectorAll('button').forEach(button => { const label = button.textContent.trim(); const href = links[label]; if (!href || button.dataset.urlified) return; const a = document.createElement('a'); a.href = href; a.className = button.className; a.innerHTML = button.innerHTML; if (label === 'Book in 30s') a.textContent = 'Get a Quote'; a.dataset.urlified = 'true'; button.replaceWith(a); });
    const logo = document.querySelector('header div.cursor-pointer.group'); if (logo && !logo.dataset.urlified) { const a = document.createElement('a'); a.href='/'; a.className=`${logo.className} premium-brand`; a.innerHTML=logo.innerHTML; a.dataset.urlified='true'; logo.replaceWith(a); }
    document.querySelectorAll('header a[href="/contact/"]').forEach(a => { if (a.textContent.trim() === 'Book') a.textContent = 'Get a Quote'; });
    const nav = document.querySelector('header nav'); if (nav && !nav.dataset.extraPages) { const template = nav.querySelector('a,button'); additions.forEach(([name,href]) => { const a=document.createElement('a'); a.href=href; a.textContent=name; a.className=template?.className || 'px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600'; nav.append(a); }); nav.dataset.extraPages='true'; }
    cleanText(); addRelatedLinks();
  };
  new MutationObserver(swap).observe(document.documentElement, {childList:true, subtree:true}); swap();
})();
