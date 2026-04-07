function openSection(section) {
  const content = document.getElementById("content");

  const pages = {
    physics: "<h2>Physics</h2><p>Study material coming soon.</p>",
    chemistry: "<h2>Chemistry</h2><p>Study material coming soon.</p>",
    math: "<h2>Mathematics</h2><p>Study material coming soon.</p>",
    notes: "<h2>Notes</h2><p>Your notes will appear here.</p>"
  };

  content.innerHTML = pages[section];
}
