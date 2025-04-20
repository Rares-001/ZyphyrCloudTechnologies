(function () {
    const para = document.querySelector('#intro-glitch p');
    if (!para) return;  // guard if element missing

    const words = para.textContent.split(/\s+/);

    // Choose 3 distinct random indices
    const pick = new Set();
    while (pick.size < 3 && pick.size < words.length) {
        pick.add(Math.floor(Math.random() * words.length));
    }

    // Rebuild innerHTML, wrapping picked words
    para.innerHTML = words.map((w, i) => {
        // skip any HTML tags (e.g. <code>…</code>)
        if (pick.has(i) && !w.includes('<')) {
            // strip punctuation for data-text, but keep w visible
            const clean = w.replace(/[.,;!?]/g, '');
            return `<span class="matrix-text" data-text="${clean}">${w}</span>`;
        }
        return w;
    }).join(' ');
})();
