let postData = [];

fetch('posts.json')
  .then(r => r.json())
  .then(d => {
    postData = d;
    posts.innerHTML = d.map(p =>
      `<h4><a href="${p.url}">${p.title}</a></h4><p class="flex1">${p.date}<small>${p.tags.join(', ')}</small></p>`
    ).join('');
  });

function searchPosts(q) {
  const result = postData.filter(p =>
    `${p.title} ${p.date} ${p.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase())
  );

  posts.innerHTML = result.length ?
    result.map(p =>
      `<h4><a href="${p.url}">${p.title}</a></h4><p class="flex1">${p.date}<small>${p.tags.join(', ')}</small></p>`
    ).join('')
    : '<p>Not found</p>';
}

searchBox.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const q = searchBox.value.trim();
    q ? searchPosts(q) : (location.href = 'index.html');
  }
});
