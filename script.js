document.addEventListener('DOMContentLoaded', () => { 
  const mainCommands = ['help', 'clear', 'project', 'weather', 'music', 'me'];
  const projectCommands = ['about', 'clear', 'exit'];
  const meCommands = ['about', 'contacts', 'group', 'clear', 'exit'];
  const asciiArt = `
  ______  _                          _      _ 
  | ___ \\(_)                        | |    | |
  | |_/ / _  ____ ____  __ _   ___  | |  __| |
  |  __/ | ||_  /|_  / / _\` | / _ \\ | | / _\` |
  | |    | | / /  / / | (_| || (_) || || (_| |
  \\_|    |_|/___|/___| \\__,_| \\___/ |_| \\__,_|
                                              
  `;
  const input = document.getElementById('command-input');
  const output = document.getElementById('output');
  let isInProjectMode = false;
  let isInMeMode = false;

  output.innerHTML += asciiArt;
  output.innerHTML += 'Welcome to the Web Terminal! Type "help" to see available commands.\n\n';

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const command = input.value.trim();
      if (command.length > 0) {
        executeCommand(command);
        input.value = '';
      }
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      autocomplete(input.value);
    }
    if (event.key === 'ArrowUp') {
      input.value = output.textContent.split('\n').reverse().find((line) => line.startsWith('$'))?.slice(2) || '';
    }
    if (event.key === 'c' && event.ctrlKey) {
      if (isInProjectMode) {
        isInProjectMode = false;
        output.innerHTML += '^C\nExited project mode.\n';
      } else if (isInMeMode) {
        isInMeMode = false;
        output.innerHTML += '^C\nExited me mode.\n';
      } else {
        output.innerHTML += '^C\n';
      }
      output.scrollTop = output.scrollHeight;
    }
    if (event.key === 'l' && event.ctrlKey) {
      output.innerHTML = '';
    }
  });

  function autocomplete(partialCommand) {
    const availableCommands = isInProjectMode ? projectCommands : isInMeMode ? meCommands : mainCommands;
    const matches = availableCommands.filter(cmd => cmd.startsWith(partialCommand));
    if (matches.length === 1) {
      input.value = matches[0];
    } else if (matches.length > 1) {
      output.innerHTML += `$ ${partialCommand}\n${matches.join(' ')}\n`;
      output.scrollTop = output.scrollHeight;
    }
  }

  function executeCommand(command) {
    output.innerHTML += `$ ${command}\n`;
    const commandParts = command.toLowerCase().split(' ');
    
    if (isInProjectMode) {
      handleProjectCommand(commandParts);
    } else if (isInMeMode) {
      handleMeCommand(commandParts);
    } else {
      switch (commandParts[0]) {
        case 'help':
          output.innerHTML += 'Available commands: help, clear, project, weather, music, me\n';
          break;
        case 'clear':
          output.innerHTML = '';
          break;
        case 'project':
          isInProjectMode = true;
          output.innerHTML += 'Entered project mode. Available commands: about, clear, exit\nUse Ctrl+C to exit project mode.\n1. This thing where you are right now\n2. UniPal\n';
          break;
        case 'me':
          isInMeMode = true;
          output.innerHTML += 'Entered me mode. Available commands: about, contacts, group, clear, exit\nUse Ctrl+C to exit me mode.\n';
          break;
        case 'music':
          output.innerHTML += 'My favourite artist:\n<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/1Cd373x8qzC7SNUg5IToqp?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>\n';
          break;
        case 'weather':
          showWeatherWidget();
          break;
        default:
          output.innerHTML += `'${command}' is not recognized as a valid command.\n`;
          break;
      }
    }
    output.scrollTop = output.scrollHeight;
  }

  function handleProjectCommand(commandParts) {
    const subcommand = commandParts.join(' ');
    switch (subcommand) {
      case 'about 1':
        output.innerHTML += "This is my personal portfolio page.\nIt's made as a terminal simulation.\nI wanted to make something where the person doesn't just come and read, but has to interact with the page.\n Just a static pages with HTML, CSS, and JS.\n";
        break;
      case 'about 2':
        output.innerHTML += 'UniPal is my unfinished project written by me and two of my classmates.\n';
        output.innerHTML += 'It was started at the spring of 2024 as a year end project and then abandoned for the summer. We are now working on it again.\n';
        output.innerHTML += 'It is a web application that is a copy of epal.gg.\n';
        output.innerHTML += 'It is made using Vite, React Bootstrap, and Sequelizer, written in TypeScript, and the database is in MySQL.\n';
        output.innerHTML += 'It can be found at <a href="https://unipal.jurmoharak.ee" target="_blank">unipal.jurmoharak.ee</a>.\n';
        break;
      case 'about':
        output.innerHTML += "About requires project's number. Use 'about x'.\n";
        break;
      case 'exit':
        isInProjectMode = false;
        output.innerHTML += 'Exited project mode.\n';
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      default:
        output.innerHTML += `'${subcommand}' is not a valid project command.\n`;
        break;
    }
  }

  function handleMeCommand(commandParts) {
    const subcommand = commandParts.join(' ');
    switch (subcommand) {
      case 'about':
        output.innerHTML += "I am a 19-year-old software development student from Estonia.\nI am currently studying at VOCO.\nMy hobbies are playing video games, sometimes watching anime and... yeah that's about it.\n";
        break;
      case 'contacts':
        output.innerHTML += 'Email: jurmo.harak@gmail.com\nGitHub: <a href="https://github.com/pizzaold" target="_blank">github.com/pizzaold</a>\n';
        break;
      case 'group':
        output.innerHTML += '<a href="https://unnamed.group/" target="_blank">unnamed group</a>.\n';
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      case 'exit':
        isInMeMode = false;
        output.innerHTML += 'Exited me mode.\n';
        break;
      default:
        output.innerHTML += `'${subcommand}' is not a valid me command.\n`;
        break;
    }
    output.scrollTop = output.scrollHeight;
  }

  function showWeatherWidget() {
    output.innerHTML += `
      <a class="weatherwidget-io" href="https://forecast7.com/en/58d3826d73/tartu/" data-label_1="TARTU" data-label_2="WEATHER" data-mode="Current" data-theme="dark" >TARTU WEATHER</a>\n
    `;
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://weatherwidget.io/js/widget.min.js';
    document.body.appendChild(scriptTag);
    output.scrollTop = output.scrollHeight;
  }
});
