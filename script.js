// User input variables
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Creature description variables
const creatureDesc = document.getElementById("creature-description");
const creatureName = document.getElementById("creature-name");
const creatureID = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const moveName = document.getElementById("moves");
const moveDescription = document.getElementById("move-description");

// Table variables
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// To access RPG Creature API
const getCreature = async () => {
  try {
    const creatureNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureNameOrId}`
    );
    const data = await response.json();

    // To set the creature info
    creatureName.childNodes[0].textContent = data.name.toUpperCase();
    creatureID.textContent = `#${data.id}`;
    weight.textContent = Number(data.weight);
    height.textContent = Number(data.height);

    moveName.textContent = data.special.name;
    moveDescription.textContent = data.special.description;

    // Creature types
    types.innerHTML = data.types
      .map((obj) => `<span class="type ${obj.name}">${obj.name}</span>`)
      .join(" ");

    // Creature stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // To make the description appear
    creatureDesc.hidden = false;
  } catch (err) {
    resetDisplay();
    alert("Creature not found");
    console.error(`Creature not found: ${err}`);
  }
};

// To reset the display when the creature is not found
const resetDisplay = () => {
  creatureName.childNodes[0].textContent = "";
  creatureID.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  types.innerHTML = "";
  moveName.textContent = "";
  moveDescription.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";

  creatureDesc.hidden = true;
};

// To run everything
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getCreature();
});

// To always focus on the input
document.addEventListener("click", () => {
  searchInput.focus();
});
