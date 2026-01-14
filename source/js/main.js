// Initialize PJAX
document.addEventListener("DOMContentLoaded", function() {
  var pjax = new Pjax({
    elements: "a[href]:not([target='_blank'])",
    selectors: ["#main-container", "title", "#meta-description", "#meta-keywords", "#canonical-link", "#feed-link", "#og-title", "#og-description", "#og-type", "#og-url", "#og-site-name", "#og-image", "#article-published-time", "#article-modified-time", "#twitter-card", "#twitter-title", "#twitter-description", "#twitter-image"],
    cacheBust: false
  });

  // PJAX Events
  document.addEventListener('pjax:send', function() {
    const container = document.getElementById('main-container');
    if (container) container.classList.add('pjax-loading');
  });

  document.addEventListener('pjax:complete', function() {
    const container = document.getElementById('main-container');
    if (container) {
      container.classList.remove('pjax-loading');
      container.classList.add('fade-in');
    }
    // Re-initialize scripts
    initSearch();
    initCodeEnhancements();
    initArtalk();
  });

  // Initial call
  initSearch();
  initCodeEnhancements();
  initArtalk();
});

// Search Logic (Local Search)
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if(searchInput && searchResults){
        let searchData = null;

        // Fetch search.json only once
        const fetchSearchData = () => {
            if (searchData) return Promise.resolve(searchData);
            return fetch('/search.json')
                .then(res => res.json())
                .then(data => {
                    searchData = data;
                    return data;
                })
                .catch(err => console.error('Error fetching search data:', err));
        };

        searchInput.addEventListener('input', function(e){
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 1) {
                searchResults.innerHTML = '';
                return;
            }

            fetchSearchData().then(data => {
                if (!data) return;
                
                const results = data.filter(post => {
                    return (post.title && post.title.toLowerCase().includes(query)) ||
                           (post.content && post.content.toLowerCase().includes(query));
                }).slice(0, 5); // Limit results

                let html = '';
                if (results.length > 0) {
                    results.forEach(post => {
                        // Fix Domain Issue: Ensure URL starts with / if not present
                        let url = post.url || post.path;

                        // Fix double slash issue from search.json (e.g., //path/)
                        if (url && url.startsWith('//')) {
                            url = url.substring(1);
                        }

                        if (url && !url.startsWith('/') && !url.startsWith('http')) {
                            // Use CONFIG.root to ensure correct path
                            url = (window.CONFIG.root || '/') + url;
                        }

                        html += `
                        <li class="search-result-item border-b border-black last:border-b-0 max-w-full overflow-hidden">
                            <a href="${url}" class="block py-4 px-6 hover:bg-gray-50 transition-colors max-w-full">
                                <span class="font-bold text-lg block mb-1 break-all whitespace-normal leading-tight">${post.title}</span>
                                <span class="text-sm opacity-60 block truncate font-mono">${post.content.replace(/<[^>]*>/g, '').substring(0, 60)}...</span>
                            </a>
                        </li>`;
                    });
                } else {
                    html = '<li class="p-8 text-center text-sm text-gray-500 font-mono">暂无搜索结果</li>';
                }
                searchResults.innerHTML = html;
            });
        });
    }
}

// Code Enhancements (Copy Button & Language)
function initCodeEnhancements() {
    // 支持 Hexo 默认的 highlight.js 输出
    const figures = document.querySelectorAll('figure.highlight');
    
    figures.forEach(figure => {
        if (figure.querySelector('.code-header')) return; // Avoid duplication

        // 获取语言
        let lang = figure.getAttribute('class').replace('highlight', '').trim();
        if (!lang) lang = 'Code';

        // 创建头部
        const header = document.createElement('div');
        header.className = 'code-header';
        
        const langSpan = document.createElement('span');
        langSpan.innerText = lang.toUpperCase();
        
        const copyBtn = document.createElement('button');
        copyBtn.innerText = 'COPY';
        copyBtn.className = 'hover:underline focus:outline-none';
        
        copyBtn.addEventListener('click', () => {
            let code = '';
            const codeContainer = figure.querySelector('.code pre');
            if (codeContainer) {
                code = codeContainer.innerText;
            } else {
                // Fallback
                code = figure.innerText;
            }

            navigator.clipboard.writeText(code).then(() => {
                copyBtn.innerText = 'COPIED!';
                setTimeout(() => copyBtn.innerText = 'COPY', 2000);
            });
        });

        header.appendChild(langSpan);
        header.appendChild(copyBtn);
        
        figure.insertBefore(header, figure.firstChild);
    });
}

// Initialize Artalk
function initArtalk() {
    const artalkContainer = document.getElementById('artalk');
    const metadata = document.getElementById('artalk-metadata');
    
    if (artalkContainer && metadata && window.Artalk) {
         // Destroy previous instance if exists
         if (window.artalkInstance) {
             try {
                window.artalkInstance.destroy();
             } catch(e) { console.error(e); }
         }
         
         window.artalkInstance = Artalk.init({
            el: '#artalk',
            server: metadata.dataset.server,
            site: metadata.dataset.site,
            pageKey: metadata.dataset.pageKey,
            pageTitle: metadata.dataset.pageTitle,
            darkMode: false
        });
    }
}
