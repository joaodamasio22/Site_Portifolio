const commands = [
`npm run build
Building project...
Build completed`,

`nome = 'Joao Damasio'
print(f"Hello World, I'm {nome}")`,

`const developer = {
  name: "Joao Damasio",
  skills: ["Full-Stack", "Node.Js", "JavaScript", "PostgreSQL"],
  passion: "AI development"
};`
];

const typingElement = document.querySelector(".typing_code");

let commandIndex = 0;
let charIndex = 0;

const typingSpeed = 60;
const delayAfterTyping = 1600;
const delayBeforeNext = 800;

function typeCommand() {
  const command = commands[commandIndex];

  if (charIndex < command.length) {
    const char = command[charIndex];

    if (char === "\n") {
      typingElement.innerHTML += "<br>";
    } else {
      typingElement.innerHTML += char;
    }

    charIndex++;
    setTimeout(typeCommand, typingSpeed);
  } else {
    setTimeout(nextCommand, delayAfterTyping);
  }
}

function nextCommand() {
  typingElement.innerHTML = "";
  charIndex = 0;
  commandIndex = (commandIndex + 1) % commands.length;
  setTimeout(typeCommand, delayBeforeNext);
}

typeCommand();