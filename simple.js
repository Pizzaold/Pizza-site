// Project data
const projectData = {
  'Portfolio': {
    description: 'A personal portfolio website built with HTML, CSS, and JavaScript. Features a clean, minimal design with responsive layouts.',
    image: 'img/portfolio.png'
  },
  'UniPal': {
    description: 'A student collaboration platform that helps university students find study partners and share resources.',
    image: 'img/unipal.png'
  },
  'HabitTracker': {
    description: 'A mobile-friendly application for tracking daily habits and personal goals. Built with React and includes data visualization.',
    image: 'img/habittracker.jpg'
  }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('click', () => {
    const title = project.querySelector('h3').textContent;
    const projectInfo = projectData[title];
    
    modalTitle.textContent = title;
    modalImage.src = projectInfo.image;
    modalImage.alt = `Detailed view of ${title}`;
    modalDescription.textContent = projectInfo.description;
    
    modal.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
  }
});