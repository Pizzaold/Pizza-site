const projectData = {
  'Portfolio': {
    description: "This is my personal portfolio page.\n" +
                  "It's made as a terminal simulation.\n" +
                  "I wanted to make something where the person doesn't just come and read, but has to interact with the page.\n" +
                  "There is also a basic version if people really just want to come and read about me.",
    keywords: ["HTML", "CSS", "JavaScript", "SOLO"]
  },
  'UniPal': {
    description: "UniPal is my unfinished project written by me and two of my classmates.\n" +
                  "It was started in the spring of 2024 as a year-end project and then paused for the summer.\n" +
                  "It is a web application that is inspired by epal.gg.\n" +
                  "It is made using Vite, React Bootstrap, and Sequelize, written in TypeScript, and the database is in MySQL.\n" +
                  "It can be found at <a href=\"https://unipal.jurmoharak.ee\" target=\"_blank\">unipal.jurmoharak.ee</a>.",
    keywords: ["Vite", "React", "Bootstrap", "MVP", "Express", "TypeScript", "Sequelize", "MySQL"]
  },
  'HabitTracker': {
    description: "HabitTracker is my personal project that I made to track my own habits and tasks.\n" +
                  "I made it at the end of November of 2024 and I am using it daily myself.\n" +
                  "It was made using <a href=\"https://expo.dev\" target=\"_blank\">Expo</a> framework, data is stored locally in the phone using async-storage and it's written in TypeScript.\n" +
                  "The reason why I made it was because I wanted free habit tracker that has all the functionalities that I wanted to use.\n" +
                  "<a href=\"https://github.com/Pizzaold/HabitTracker\" target=\"_blank\">https://github.com/Pizzaold/HabitTracker</a>",
    keywords: ["Expo", "React", "Phone App", "TypeScript", "Open Source", "Async-storage"]
  }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('click', () => {
    const title = project.querySelector('h3').textContent;
    const projectInfo = projectData[title];
    
    modalTitle.textContent = title;
    
    const paragraphs = projectInfo.description.split('\n').filter(text => text.trim() !== '');
    const descriptionHtml = paragraphs
      .map(text => `<p>${text}</p>`)
      .join('');
    
    const keywordsHtml = `
      <div class="keywords-container">
        ${projectInfo.keywords.map(keyword => `<span class="keyword">${keyword}</span>`).join('')}
      </div>
    `;
    
    modalDescription.innerHTML = descriptionHtml + keywordsHtml;
    
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