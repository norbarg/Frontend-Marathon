const urlForm = document.getElementById('urlForm');
const urlInput = document.getElementById('urlInput');
const currentUrl = document.getElementById('currentUrl');
const contentDiv = document.getElementById('content');
const backButton = document.getElementById('backButton');

let previousState = null;

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (!url) return;

    try {
        previousState = {
            url: currentUrl.textContent,
            content: contentDiv.innerHTML,
        };

        const response = await fetch(`/fetch?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        currentUrl.textContent = url;
        contentDiv.innerHTML = `
<pre><code>&lt;body&gt;
${escapeHtml(data.body)}
&lt;/body&gt;</code></pre>`;
    } catch (error) {
        currentUrl.textContent = '';
        contentDiv.textContent = 'Error loading content.';
        console.error(error);
    }
});

backButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (previousState) {
        currentUrl.textContent = previousState.url;
        contentDiv.innerHTML = previousState.content;
        previousState = null;
    }
});

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
