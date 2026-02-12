const container = document.querySelector(".hearts-container");
const title = document.getElementById("mainTitle");
const image = document.getElementById("mainImage");
const buttonContainer = document.getElementById("buttonContainer");
const trickyBtn = document.getElementById("trickyBtn");

const letterMessage = `
Desde que llegaste a mi vida, todo tiene un color distinto.
Gracias por tu risa, tu paciencia y tu forma de mirar el mundo.
Te quiero mucho, más de lo que las palabras pueden explicar.
💖
`;

let trickCount = 0;
let scaleYes = 1;
let scaleNo = 1;

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  const size = Math.random() * 20 + 10; // tamaño entre 10 y 30px
  heart.style.width = size + "px";
  heart.style.height = size + "px";

  heart.style.left = Math.random() * 100 + "vw";

  const duration = Math.random() * 5 + 5; // entre 5 y 10 segundos
  heart.style.animationDuration = duration + "s";

  heart.style.opacity = Math.random();

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Adaptativo según tamaño de pantalla
const heartDensity = window.innerWidth < 768 ? 400 : 200;

setInterval(createHeart, heartDensity);

const celebrateBtn = document.getElementById("celebrateBtn");

celebrateBtn.addEventListener("click", () => {
  createConfetti();
  createHeartBurst();

  // Cambiar texto
  title.textContent = "Te Quiero Mucho ❤️";

  // Cambiar imagen
  image.src = "basill-love.png"; // pon aquí tu nueva imagen

  // Animar desaparición de botones
  buttonContainer.classList.add("fade-out");

  setTimeout(() => {
    buttonContainer.style.opacity = "0";
  buttonContainer.style.pointerEvents = "none"; 
  }, 600);

  setTimeout(() => {
  const overlay = document.getElementById("letterOverlay");
  const letterText = document.getElementById("letterText");
  const icon = document.getElementById("letterIcon");

  overlay.classList.add("active");

  // Mostrar icono primero
  setTimeout(() => {
    icon.classList.add("show");
  }, 400);
  
  // Luego empezar a escribir
  setTimeout(() => {
    typeLetter(letterMessage, letterText, 30);
  }, 900);

  }, 2500);

});

document.getElementById("closeLetter").addEventListener("click", () => {
  document.getElementById("letterOverlay").classList.remove("active");
});

function typeLetter(text, element, speed = 35) {
  element.textContent = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      // Cuando termina de escribir
      const closeBtn = document.getElementById("closeLetter");
      closeBtn.classList.add("show");
    }
  }

  typing();
}

function createConfetti() {
  const colors = ["#ff2e82", "#ffd700", "#00e0ff", "#7cff00", "#ff6f00"];

  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    const x = (Math.random() - 0.5) * 600 + "px";
    const y = (Math.random() - 0.5) * 600 + "px";

    confetti.style.setProperty("--x", x);
    confetti.style.setProperty("--y", y);

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 1500);
  }
}

function createHeartBurst() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart-burst");

    heart.style.left = "50%";
    heart.style.top = "50%";

    const x = (Math.random() - 0.5) * 400 + "px";
    const y = (Math.random() - 1) * 500 + "px";

    heart.style.setProperty("--x", x);
    heart.style.setProperty("--y", y);

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1500);
  }
}

trickyBtn.addEventListener("click", () => {
  trickCount++;

  // Cambiar texto e imagen según intento
  if (trickCount === 1) {
    title.textContent = "¿Segur@? 😏";
    image.src = "basill-2.png";
  } 
  else if (trickCount === 2) {
    title.textContent = "Mmmm... piénsalo bien 😌";
    image.src = "Basill-3.png";
  } 
  else if (trickCount === 3) {
    title.textContent = "No tienes escapatoria 💘";
    image.src = "apollo_cry.png";
  }

  if (window.innerWidth < 480) {
  scaleYes = Math.min(scaleYes + 0.15, 1.4);  // máximo 1.4 en móvil
  scaleNo = Math.max(scaleNo - 0.1, 0.6);     // mínimo 0.6
} else {
  scaleYes = Math.min(scaleYes + 0.3, 2);     // máximo 2 en desktop
  scaleNo = Math.max(scaleNo - 0.2, 0.4);
}

celebrateBtn.style.transform = `scale(${scaleYes})`;
trickyBtn.style.transform = `scale(${scaleNo})`;

  // Desaparece después de 3 intentos
  if (trickCount >= 3) {
    setTimeout(() => {
      trickyBtn.style.opacity = "0";
      trickyBtn.style.pointerEvents = "none";
    }, 300);
  }
});
