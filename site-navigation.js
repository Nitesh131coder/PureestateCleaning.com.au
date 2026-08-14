(() => {
  const links = {
    'All Services': '/', 'House Cleaning': '/services/regular-house-cleaning/', 'Deep Cleaning': '/services/deep-cleaning/', 'End of Lease': '/services/end-of-lease-cleaning/',
    '/house-cleaning-sydney': '/services/regular-house-cleaning/', '/deep-cleaning-sydney': '/services/deep-cleaning/', '/end-of-lease-cleaning-sydney': '/services/end-of-lease-cleaning/', '/ (All Services Default)': '/',
    'Book in 30s': '/contact/', 'Book': '/contact/', 'Get Booking Quote Now': '/contact/', 'Book Cleaner in 30s': '/contact/', 'Get Instant Quote': '/contact/'
  };
  const additions = [['Move In Cleaning','/services/move-in-cleaning/'], ['Office & Commercial','/services/office-commercial-cleaning/'], ['Airbnb Cleaning','/services/airbnb-short-term-rental-cleaning/']];
  const swap = () => {
    document.querySelectorAll('button').forEach(button => {
      const label = button.textContent.trim(); const href = links[label];
      if (!href || button.dataset.urlified) return;
      const a = document.createElement('a'); a.href = href; a.className = button.className; a.innerHTML = button.innerHTML; if (label === 'Book in 30s') a.textContent = 'Get a Quote'; a.dataset.urlified = 'true'; button.replaceWith(a);
    });
    const logo = document.querySelector('header div.cursor-pointer.group');
    if (logo && !logo.dataset.urlified) { const a = document.createElement('a'); a.href='/'; a.className=`${logo.className} premium-brand`; a.innerHTML=logo.innerHTML; a.dataset.urlified='true'; logo.replaceWith(a); }
    document.querySelectorAll('header a[href="/contact/"]').forEach(a => { if (a.textContent.trim() === 'Book') a.textContent = 'Get a Quote'; });
    const nav = document.querySelector('header nav');
    if (nav && !nav.dataset.extraPages) { const template = nav.querySelector('a,button'); additions.forEach(([name,href]) => { const a=document.createElement('a'); a.href=href; a.textContent=name; a.className=template?.className || 'px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600'; nav.append(a); }); nav.dataset.extraPages='true'; }
  };
  new MutationObserver(swap).observe(document.documentElement, {childList:true, subtree:true}); swap();
})();
