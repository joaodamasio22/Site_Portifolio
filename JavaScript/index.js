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

const lazyElements = document.querySelectorAll(
  "section, .skill_item, .tech_card, .projeto_card, .contato_item"
);

const lazyObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  },
  {
    threshold: 0.15
  }
);

lazyElements.forEach(el => {
  el.classList.add("lazy");
  lazyObserver.observe(el);
});