let postData = ""
fetch('posts.json')
  .then(r => r.json())
  .then(d => {
	 postData = d
    d.forEach(p => {
	   posts.innerHTML += `<h4><a  href="${p.url}">${p.title}</h4></a><p class="flex1">${p.date}<small>${p.tags.join(', ')}</small></p>`;
    });
  });
function searchPosts(keyword) {
  const result = postData.filter(post => {
    const combined = `${post.title} ${post.date} ${post.tags.join(' ')}`;
    return combined.toLowerCase().includes(keyword.toLowerCase());
  });

  const container = document.getElementById('posts');
  if (result.length === 0) {
    container.innerHTML = '<p>Not found</p>';
    return;
  }

  container.innerHTML = result.map(post => `
      <h4><a href="${post.url}">${post.title}</a></h4><p class="flex1">${post.date}<small>${post.tags.join(',')}</small></p>`);
}
document.getElementById('searchBox').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();

    const query = this.value.trim();
    if (!query){
	    window.location.href = "index.html"
    } 
	 searchPosts(query);
	  }
});
