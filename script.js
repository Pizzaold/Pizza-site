document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const output = document.getElementById('output');
    const mainCommands = ['help', 'hello', 'clear', 'project', 'about'];
    const projectCommands = ['list', 'add', 'remove'];
    let isInProjectMode = false;
    const asciiArt = `
   ______ * *_
   | ___ \\(_) | | | |
   | |_/ / *_*__ ____ ** **| | __| |
   | __/ | ||_ /|_ / / *\` | / * \\ | | / _\` |
   | | | | / / / / | (_| || (_) || || (_| |
  \\_| |_|/___|/___| \\__,_| \\___/ |_| \\__,_|
  `;
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
      const availableCommands = isInProjectMode ? projectCommands : mainCommands;
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
        handleProjectCommand(commandParts[0]);
      } else {
        switch (commandParts[0]) {
          case 'help':
            output.innerHTML += 'Available commands: help, hello, clear, project, about\n';
            break;
          case 'hello':
            output.innerHTML += 'Hello! How can I assist you?\n';
            break;
          case 'clear':
            output.innerHTML = '';
            break;
          case 'project':
            isInProjectMode = true;
            output.innerHTML += 'Entered project mode. Available commands: list, add, remove\nUse Ctrl+C to exit project mode.\n';
            break;
          case 'about':
            output.innerHTML += 'About: This is a simple web terminal simulation.\n';
            break;
          default:
            output.innerHTML += `'${command}' is not recognized as a valid command.\n`;
            break;
        }
      }
      output.scrollTop = output.scrollHeight;
    }
  
    function handleProjectCommand(subcommand) {
      switch (subcommand) {
        case '':
          output.innerHTML += 'Projects List:\n1. Web Terminal\n2. Personal Blog\n';
          break;
        default:
          output.innerHTML += `'${subcommand}' is not a valid project command.\n`;
          break;
      }
    }
  });