const objects = document.querySelectorAll(".memory-object");
const memoryText = document.querySelector("#memory-text");
const memoryNumber = document.querySelector("#memory-number");
const lamp = document.querySelector(".lamp");
const beginAgain = document.querySelector("#begin-again");

let memoryCount = 0;

function revealMemory(object) {
  memoryCount += 1;
  memoryText.animate(
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 380, easing: "ease-out" },
  );

  memoryText.textContent = object.dataset.memory;
  memoryNumber.textContent = String(memoryCount).padStart(2, "0");
}

objects.forEach((object) => {
  object.addEventListener("click", () => revealMemory(object));
});

lamp.addEventListener("click", () => {
  const lampIsOn = document.body.classList.toggle("lamp-on");
  lamp.setAttribute("aria-pressed", lampIsOn);
});

beginAgain.addEventListener("click", () => {
  memoryCount = 0;
  memoryNumber.textContent = "00";
  memoryText.textContent = "The room is waiting. Choose an object.";
  document.body.classList.remove("lamp-on");
  lamp.setAttribute("aria-pressed", "false");
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * -8;
    const y = (event.clientY / window.innerHeight - 0.5) * -6;
    document.documentElement.style.setProperty("--room-x", `${x}px`);
    document.documentElement.style.setProperty("--room-y", `${y}px`);
  });
}
