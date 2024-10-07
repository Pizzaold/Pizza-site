document.addEventListener('DOMContentLoaded', () => {
  const mainCommands = {
    me: { description: 'Learn about me', usage: 'me [-a | --about] [-c | --contacts] [-g | --group]' },
    projects: { description: 'Learn about my projects', usage: 'projects [-l | --list] [-a <project_number>| --about <project_number>]' },
    help: { description: 'Show available commands', usage: 'help [command]' },
    clear: { description: 'Clear the terminal', usage: 'clear' }
  };

  const asciiArt = `<pre>   
░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓████████▓▒░ ░▒▓████████▓▒░  ░▒▓██████▓▒░   ░▒▓██████▓▒░  ░▒▓█▓▒░        ░▒▓███████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░      ░▒▓██▓▒░       ░▒▓██▓▒░  ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓███████▓▒░  ░▒▓█▓▒░    ░▒▓██▓▒░       ░▒▓██▓▒░    ░▒▓████████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░        ░▒▓█▓▒░  ░▒▓██▓▒░       ░▒▓██▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░        ░▒▓█▓▒░ ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░        ░▒▓█▓▒░ ░▒▓████████▓▒░ ░▒▓████████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░  ░▒▓██████▓▒░  ░▒▓████████▓▒░ ░▒▓███████▓▒░  
 </pre>`;

  const terminal = document.getElementById('terminal');
  const input = document.getElementById('command-input');
  const output = document.getElementById('output');

  let isTyping = false;
  let commandHistory = [];
  let historyIndex = -1;

  function typeWriter(text, index = 0) {
    if (index < text.length) {
      output.innerHTML += text.charAt(index);
      scrollToBottom();
      setTimeout(() => typeWriter(text, index + 1), 10);
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

  input.addEventListener('keydown', function (event) {
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
  });

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
        helpText += `${cmd.padEnd(15)} ${info.usage}\n`;
        helpText += `${''.padEnd(15)} ${info.description}\n\n`;
      }
    }
    printOutput(helpText);
  }

  function handleProjectsCommand(args) {
    let output = '';
    if (args.includes('-l') || args.includes('--list')) {
      output += "1. Personal Portfolio\n2. UniPal\n";
    } else if (args.includes('-a') || args.includes('--about')) {
      const projectNumber = args.find(arg => !arg.startsWith('-'));
      if (projectNumber === '1') {
        output += "This is my personal portfolio page.\nIt's made as a terminal simulation.\nI wanted to make something where the person doesn't just come and read, but has to interact with the page.\nJust a static page with HTML, CSS, and JS.\n";
      } else if (projectNumber === '2') {
        output += 'UniPal is my unfinished project written by me and two of my classmates.\n';
        output += 'It was started in the spring of 2024 as a year-end project and then paused for the summer. We are now working on it again.\n';
        output += 'It is a web application that is inspired by epal.gg.\n';
        output += 'It is made using Vite, React Bootstrap, and Sequelize, written in TypeScript, and the database is in MySQL.\n';
        output += 'It can be found at <a href="https://unipal.jurmoharak.ee" target="_blank">unipal.jurmoharak.ee</a>.\n';
      } else {
        output += "Please specify a valid project number (1 or 2).\n";
      }
    } else {
      output += "Usage: projects [-l | --list] [-a <project_number> | --about <project_number>]\n";
    }
    printOutput(output);
  }

  function handleMeCommand(args) {
    let output = '';
    if (args.includes('-a') || args.includes('--about')) {
      output += "I am a 19-year-old software development student from Estonia.\nI am currently studying at VOCO.\nMy hobbies are playing video games, sometimes watching anime, and coding interesting projects.\n";
    } else if (args.includes('-c') || args.includes('--contacts')) {
      output += 'Email: jurmo.harak@gmail.com\nGitHub: <a href="https://github.com/pizzaold" target="_blank">github.com/pizzaold</a>\n';
    } else if (args.includes('-g') || args.includes('--group')) {
      output += 'I am part of the <a href="https://unnamed.group/" target="_blank">unnamed.group</a>.\n';
    } else {
      output += "Usage: me [-a | --about] [-c | --contacts] [-g | --group]\n";
    }
    printOutput(output);
  }

  function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
  }
});