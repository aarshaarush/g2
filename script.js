document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');

    if (query) {
        // Clear previous results
        resultsDiv.innerHTML = 'Loading...';

        // Fetch search results
        fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`)
            .then(response => response.json())
            .then(data => {
                resultsDiv.innerHTML = `<h2>Results for "${query}":</h2>`;
                if (data.RelatedTopics.length > 0) {
                    const resultsList = document.createElement('ul');
                    data.RelatedTopics.forEach(topic => {
                        if (topic.FirstURL) {
                            const listItem = document.createElement('li');
                            const link = document.createElement('a');
                            link.href = topic.FirstURL;
                            link.target = "_blank"; // Open in new tab
                            link.textContent = topic.Text || topic.Result;
                            listItem.appendChild(link);
                            resultsList.appendChild(listItem);
                        }
                    });
                    resultsDiv.appendChild(resultsList);
                } else {
                    resultsDiv.innerHTML += `<p>No results found.</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching results:', error);
                resultsDiv.innerHTML = '<p>There was an error retrieving the search results.</p>';
            });
    } else {
        resultsDiv.innerHTML = '';
    }
});
