const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');
const projectsGrid = document.querySelector('.projects-grid');

fetch('projects.json')
  .then(response => response.json())
  .then(projectsData => {
    Object.entries(projectsData).forEach(([id, project]) => {
      const projectElement = document.createElement('div');
      projectElement.className = 'project';
      projectElement.innerHTML = `
        <h3>${project.title}</h3>
        <img src="${project.image}" alt="Image of ${project.title}">
      `;
      
      projectElement.addEventListener('click', () => {
        modalTitle.textContent = project.title;
        modalImage.style.display = 'block';
        
        const paragraphs = project.description.split('\n').filter(text => text.trim() !== '');
        const descriptionHtml = paragraphs
          .map(text => `<p>${text}</p>`)
          .join('');
        
        const keywordsHtml = `
          <div class="keywords-container">
            ${project.keywords.map(keyword => `<span class="keyword">${keyword}</span>`).join('')}
          </div>
        `;
        
        modalDescription.innerHTML = descriptionHtml + keywordsHtml;
        modal.style.display = 'flex';
      });
      
      projectsGrid.appendChild(projectElement);
    });
  })
  .catch(error => {
    console.error('Error loading projects data:', error);
  });

function closeModal() {
  modal.style.display = 'none';
  modalImage.style.display = 'none';
  modalImage.src = '';
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});