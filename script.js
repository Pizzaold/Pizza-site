document.addEventListener('DOMContentLoaded', () => {
  const mainCommands = {
    me: { description: 'Learn about me', usage: 'me [-a | --about] [-ad | --aboutdetailed] [-c | --contacts] [-g | --group]\n[-i | --interests] [-ac | --achievements]' },
    work: { description: 'Learn about my work experience', usage: 'No arguments for this command'},
    education: { description: 'Learn about my education', usage: 'No arguments for this command'},
    projects: { 
      description: 'Learn about my projects', 
      usage: 'projects [-l | --list] [-a <project_number> | --about <project_number>] [-k <keyword> | --keyword <keyword>]' 
    },
    snake: { description: 'Play Snake game', usage: 'snake' },
    theme: { 
      description: 'Change terminal color theme', 
      usage: 'theme [-g | --green] [-o | --orange]' 
    },
    help: { description: 'Show available commands', usage: 'help [command]' },
    clear: { description: 'Clear the terminal', usage: 'clear' },
  };

  const asciiArt = `<pre>   
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓████████▓▒░░▒▓█▓▒░░░░░░░░░░▒▓██████▓▒░░░░▒▓██████▓▒░░░▒▓████████████▓▒░░░▒▓████████▓▒░░▒▓█▓▒░
░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░
░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░
░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓██████▓▒░░░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓██████▓▒░░░░▒▓█▓▒░
░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░
░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░░░░░░░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░░░░░░░░░░░░░░
░░▒▓███████████▓▒░░░▒▓████████▓▒░░▒▓████████▓▒░░░▒▓██████▓▒░░░░▒▓██████▓▒░░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓████████▓▒░░▒▓█▓▒░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                                                                                                                               
                                                                                                                               
 </pre>`;

  const terminal = document.getElementById('terminal');
  const input = document.getElementById('command-input');
  const output = document.getElementById('output');

  let isTyping = false;
  let commandHistory = [];
  let historyIndex = -1;

  function typeWriter(text, index = 0) {
    if (index < text.length) {
      let remainingText = text.substr(index);
      let tagMatch = remainingText.match(/^<[^>]+>.*?<\/[^>]+>/);
      
      if (tagMatch) {
        let fullTag = tagMatch[0];
        output.innerHTML += fullTag;
        setTimeout(() => typeWriter(text, index + fullTag.length), 0.1);
      } else if (remainingText.startsWith('<')) {
        let simpleTagMatch = remainingText.match(/^<[^>]+>/);
        if (simpleTagMatch) {
          let simpleTag = simpleTagMatch[0];
          output.innerHTML += simpleTag;
          setTimeout(() => typeWriter(text, index + simpleTag.length), 0.1);
        } else {
          output.innerHTML += '<';
          setTimeout(() => typeWriter(text, index + 1), 0.1);
        }
      } else {
        output.innerHTML += text[index];
        setTimeout(() => typeWriter(text, index + 1), 0.1);
      }
      
      scrollToBottom();
    } else {
      isTyping = false;
      input.disabled = false;
      input.focus();
    }
  }

  function printOutput(text) {
    if (isTyping) {
      setTimeout(() => printOutput(text), 50);
      return;
    }
    isTyping = true;
    input.disabled = true;
    typeWriter(text);
  }
  
  output.innerHTML = asciiArt;
  
  printOutput('Welcome to the Web Terminal! Type "help" to see available commands.\n\n');

  terminal.addEventListener('click', () => {
    if (!isTyping) {
      input.focus();
    }
  });

  const defaultInputHandler = function(event) {
    if (event.key === 'Enter') {
      const command = input.value.trim();
      if (command.length > 0) {
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        executeCommand(command);
        input.value = '';
      }
    } else if (event.key === 'Tab') {
      event.preventDefault();
      autocomplete(input.value);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
    } else if (event.key === 'c' && event.ctrlKey) {
      output.innerHTML += '^C\n';
      input.value = '';
      scrollToBottom();
    } else if (event.key === 'l' && event.ctrlKey) {
      output.innerHTML = '';
    }
  };

  input.addEventListener('keydown', defaultInputHandler);

  function autocomplete(partialCommand) {
    const matches = Object.keys(mainCommands).filter(cmd => cmd.startsWith(partialCommand));
    if (matches.length === 1) {
      input.value = matches[0];
    } else if (matches.length > 1) {
      output.innerHTML += `$ ${partialCommand}\n${matches.join(' ')}\n`;
      scrollToBottom();
    }
  }

  function executeCommand(command) {
    output.innerHTML += `$ ${command}\n`;
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    switch (cmd) {
      case 'help':
        showHelp(args[0]);
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      case 'projects':
        handleProjectsCommand(args);
        break;
      case 'me':
        handleMeCommand(args);
        break;
      case 'work':
        handleWorkCommand(args)
        break
      case 'education':
        handleEduCommand(args)
        break
      case 'snake':
        createSnakeGame();
        break;
      case 'theme':
        handleThemeCommand(args);
        break;
      default:
        printOutput(`'${cmd}' is not recognized as a valid command.\n`);
        break;
    }
  }

  function showHelp(command) {
    let helpText = '';
    if (command && mainCommands[command]) {
        const cmd = mainCommands[command];
        helpText += `${command} - ${cmd.description}\n`;
        helpText += `Usage: ${cmd.usage}\n`;
    } else {
        helpText += 'Available commands:\n\n';
        for (const [cmd, info] of Object.entries(mainCommands)) {
            const cmdPadding = 15;
            const usageIndent = 4;
            const usageLines = info.usage.split('\n');
            
            helpText += `${cmd.padEnd(cmdPadding)}${usageLines[0]}\n`;
            
            for (let i = 1; i < usageLines.length; i++) {
                helpText += `${' '.repeat(cmdPadding)}${usageLines[i]}\n`;
            }
            
            helpText += `${' '.padEnd(cmdPadding)}${info.description}\n\n`;
        }
    }
    printOutput(helpText);
  }

  const projectsDatabase = {
    1: {
      title: "Personal Portfolio",
      description: "This is my personal portfolio page.\n" +
                  "It's made as a terminal simulation.\n" +
                  "I wanted to make something where the person doesn't just come and read, but has to interact with the page.\n" +
                  "There is also a basic version if people really just want to come and read about me.",
      keywords: ["HTML", "CSS", "JavaScript", "SOLO"]
    },
    2: {
      title: "UniPal",
      description: "UniPal is my unfinished project written by me and two of my classmates.\n" +
                  "It was started in the spring of 2024 as a year-end project and then paused for the summer.\n" +
                  "It is a web application that is inspired by epal.gg.\n" +
                  "It is made using Vite, React Bootstrap, and Sequelize, written in TypeScript, and the database is in MySQL.\n" +
                  "It can be found at <a href=\"https://unipal.jurmoharak.ee\" target=\"_blank\">unipal.jurmoharak.ee</a>.",
      keywords: ["Vite", "React", "Bootstrap", "MVP", "Express", "TypeScript", "Sequelize", "MySQL"]
    },
    3: {
      title: "HabitTracker",
      description: "HabitTracker is my personal project that I made to track my own habits and tasks.\n" +
                  "I made it at the end of November of 2024 and I am using it daily myself.\n" +
                  "It was made using <a href=\"https://expo.dev\" target=\"_blank\">Expo</a> framework, data is stored locally in the phone using async-storage and it's written in TypeScript.\n" +
                  "The reason why I made it was because I wanted free habit tracker that has all the functionalities that I wanted to use.\n" +
                  "<a href=\"https://github.com/Pizzaold/HabitTracker\" target=\"_blank\">https://github.com/Pizzaold/HabitTracker</a>",
      keywords: ["Expo", "React", "Phone App", "TypeScript", "Open Source", "Async-storage"]
    }
  };
  
  function formatKeywords(keywords) {
    return keywords.map(keyword => 
      `<span class="keyword">${keyword}</span>`
    ).join(' ');
  }
  
  function searchProjectsByKeyword(keyword) {
    const matchingProjects = [];
    
    for (const [id, project] of Object.entries(projectsDatabase)) {
      if (project.keywords.some(k => k.toLowerCase() === keyword.toLowerCase())) {
        matchingProjects.push({ id, ...project });
      }
    }
    
    return matchingProjects;
  }
  
  function handleProjectsCommand(args) {
    let output = '';
    
    if (args.includes('-l') || args.includes('--list')) {
      Object.entries(projectsDatabase).forEach(([id, project]) => {
        output += `${id}. ${project.title}\n`;
      });
    } 
    else if (args.includes('-k') || args.includes('--keyword')) {
      const keywordIndex = args.findIndex(arg => arg === '-k' || arg === '--keyword');
      const keyword = args[keywordIndex + 1];
      
      if (!keyword) {
        output += "Please provide a keyword to search for.\n";
        output += "Usage: projects -k <keyword> or projects --keyword <keyword>\n";
        return printOutput(output);
      }
  
      const matchingProjects = searchProjectsByKeyword(keyword);
      
      if (matchingProjects.length === 0) {
        output += `No projects found with keyword: ${keyword}\n`;
      } 
      else if (matchingProjects.length === 1) {
        const project = matchingProjects[0];
        output += `Project with keyword "${keyword}":\n\n`;
        output += `${project.id}. ${project.title}\n`;
        output += `${project.description}\n`;
        output += `Keywords: ${formatKeywords(project.keywords)}\n`;
      }
      else {
        output += `Projects with keyword "${keyword}":\n\n`;
        matchingProjects.forEach(project => {
          output += `${project.id}. ${project.title}\n`;
        });
        output += "\nUse 'projects -a <number>' to see more details about a specific project.\n";
      }
    }
    else if (args.includes('-a') || args.includes('--about')) {
      const projectNumber = args.find(arg => !arg.startsWith('-'));
      const project = projectsDatabase[projectNumber];
      
      if (project) {
        output += project.description + '\n';
        output += "Keywords: " + formatKeywords(project.keywords) + "\n";
      } else {
        output += "Please specify a valid project number.\n";
      }
    } 
    else {
      output += "Usage: projects [-l | --list] [-a <project_number> | --about <project_number>] [-k <keyword> | --keyword <keyword>]\n";
    }
    
    printOutput(output);
  }

  function handleMeCommand(args) {
    let output = '';
    if (args.includes('-a') || args.includes('--about')) {
      output += "I am Jürmo Harak, a 19-year-young software development student from Tartu, Estonia. I'm currently in my third year of a four-year course at Tartu Vocational College.\n";
    } else if (args.includes('-ad') || args.includes('--aboutdetailed')) {
      output += 'I am Jürmo Harak, a 19-year-young software development student from Tartu, Estonia. I\'m currently in my third year of a four-year course at Tartu Vocational College.\n\nMy interest in software development started back in middle school when I tried teaching myself programming. I\'ve always been into technology, even since primary school. This passion led me to choose software development as my field of study.\n\nIn my free time, I am into video games, Dungeons & Dragons, and making my own games. I also enjoy camping, either with friends or solo. For about a year now, I have been trying to learn Japanese, though with little success so far.\n\nPersonality-wise, I\'m more of a quiet person who speaks up when I have something meaningful to say. Despite being reserved, I\'m positive and hardworking. I\'m also pretty independent - I\'ve been living on my own since I was 16.\n\nThrough my studies, I\'ve gotten comfortable with tools/libraries/frameworks like React, Sequelize, and Express. I work with languages such as TypeScript, JavaScript, and HTML, as well as database languages like MariaDB and MongoDB (Mongoose). I\'ve also learned Python, Java, and Angular, though I\'m still working on learning these.\n\nMy biggest achievement so far is winning the "Küberkool 2024" in the "Telia Cyber Battle of Nordic-Baltic 2024". It was a cybersecurity competition where I had to solve various challenges related to network security and ethical hacking.\n';
    } else if (args.includes('-i') || args.includes('--interests')) {
      output += 'I am interested in the following:\n';
      output += 'Video games: My favorite games are Grand Strategy and Sandbox games like Hearts of Iron IV, Stellaris and Minecraft. Recently I have also gotten into racing games like Assetto Corsa franchise and BeamNG.drive.\n\n';
      output += 'Dungeons & Dragons: I have been playing DnD on and off since 2022 and more stably since 2023. I have played in a campaign with my friends and I have also been a DM myself. I have also tried to make my own campaign setting and world but with little success.\n\n';
      output += 'Camping: I enjoy camping, either with friends or solo.\n\n';
      output += 'Japanese: I have been trying to learn Japanese since 2022 with limited success as I have not been able to find a good way to learn it.\n\n';
    } else if (args.includes('-c') || args.includes('--contacts')) {
      output += 'Email: jurmo.harak@gmail.com\n';
      output += 'GitHub: <a href="https://github.com/pizzaold" target="_blank">github.com/pizzaold</a>\n';
      output += 'Discord: Pizzaold\n';
    } else if (args.includes('-g') || args.includes('--group')) {
      output += 'I am part of the <a href="https://unnamed.group/" target="_blank">unnamed.group</a>.\n';
    } else if (args.includes('-ac') || args.includes('--achievements')) {
        output += 'Me and my team won the "Küberkool 2024" in the "Telia Cyber Battle of Nordic-Baltic 2024" for my school Tartu Vocational College.\n';
    } else {
      output += "Usage: me [-a | --about] [-ad | --aboutdetailed] [-c | --contacts] [-g | --group] [-i | --interests] [-p | --projects] [-ac | --achievements]\n";
    }
    printOutput(output);
  }

  function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
  }

  function handleWorkCommand(args) {
    let output = '';
    output += 'Edukoht OÜ  11.2022-02.2024 | Mentor\n'
    output += 'AS Tallink Grupp - Burger King 06.2022-08.2022 | Customer Service\n'
    printOutput(output)
  }

  function handleEduCommand(args) {
    let output = '';
    output += 'Tartu Rakenduslik Kolledž 2022-Present | Software Developer - 3rd year\n'
    output += 'Tartu Herbert Masingu Kool 2021-2022 | Secondary Education\n'
    output += 'Tartu Herbert Masingu Kool 2018-2021 | Elementary Education Acquired\n'
    output += 'Valga Põhikool 2012-2018 | Elementary Education'
    printOutput(output)
  }

  function createSnakeGame() {
    const width = 20;
    const height = 15;
    let snake = [{x: 10, y: 7}];
    let foods = [
      {x: 15, y: 7},
      {x: 5, y: 7},
      {x: 10, y: 12}
    ];
    let direction = 'right';
    let gameLoop = null;
    let score = 0;
    let gameBoard = '';
    
    const originalContent = output.innerHTML;
    
    function generateNewFood() {
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
      } while (
        snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
        foods.some(food => food.x === newFood.x && food.y === newFood.y)
      );
      return newFood;
    }
    
    function drawGame() {
      output.innerHTML = originalContent + '\n\n';
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (foods.some(food => food.x === x && food.y === y)) {
            gameBoard += '🍎';
          } else if (snake.some(segment => segment.x === x && segment.y === y)) {
            gameBoard += '██';
          } else {
            gameBoard += '··';
          }
        }
        gameBoard += '\n';
      }
      gameBoard += `\nScore: ${score} | Use arrow keys to play | Press Q to quit\n`;
      output.innerHTML += gameBoard;
      gameBoard = '';
      
      scrollToBottom();
    }

    function updateGame() {
      const head = {...snake[0]};
      
      switch(direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
      }

      if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
        endGame();
        return;
      }

      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
      }

      snake.unshift(head);

      const eatenFoodIndex = foods.findIndex(food => food.x === head.x && food.y === head.y);
      if (eatenFoodIndex !== -1) {
        score += 10;
        foods[eatenFoodIndex] = generateNewFood();
      } else {
        snake.pop();
      }

      drawGame();
    }

    function handleSnakeInput(event) {
      event.preventDefault();
      switch(event.key) {
        case 'ArrowUp':
          if (direction !== 'down') direction = 'up';
          break;
        case 'ArrowDown':
          if (direction !== 'up') direction = 'down';
          break;
        case 'ArrowLeft':
          if (direction !== 'right') direction = 'left';
          break;
        case 'ArrowRight':
          if (direction !== 'left') direction = 'right';
          break;
        case 'q':
        case 'Q':
          endGame();
          break;
      }
    }

    input.removeEventListener('keydown', defaultInputHandler);
    document.addEventListener('keydown', handleSnakeInput);
    input.disabled = true;
    input.value = '';

    function endGame() {
      clearInterval(gameLoop);
      output.innerHTML = originalContent + '\n\n';
      output.innerHTML += `Game Over! Final Score: ${score}\n`;
      document.removeEventListener('keydown', handleSnakeInput);
      input.addEventListener('keydown', defaultInputHandler);
      input.disabled = false;
      input.focus();
      
      scrollToBottom();
    }

    drawGame();
    gameLoop = setInterval(updateGame, 150);
  }

  function handleThemeCommand(args) {
    let output = '';
    
    if (args.includes('-g') || args.includes('--green')) {
      document.documentElement.setAttribute('data-theme', 'green');
      output += 'Terminal theme changed to green.\n';
    } else if (args.includes('-o') || args.includes('--orange')) {
      document.documentElement.setAttribute('data-theme', 'orange');
      output += 'Terminal theme changed to orange.\n';
    } else {
      output += 'Usage: theme [-g | --green] [-o | --orange]\n';
    }
    
    printOutput(output);
  }
});
