const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonInfoEl = document.getElementById("pokemon-info");
const nameEl = document.getElementById("creature-name");
const id = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const special = document.getElementById("special");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const form = document.getElementById("pokeform");

fetch("https://rpg-creature-api.freecodecamp.rocks/api/creatures")
  .then(res => res.json())
  .then(data => {
    
    form.addEventListener("submit", e => {
      e.preventDefault();

      if (!searchInput.value.trim()) {
        alert("Please enter a creature name or ID");
        return;
      }

      const found = data.find(
        p => p.id === Number(searchInput.value) ||
             p.name.toLowerCase() === searchInput.value.toLowerCase()
      );

      if (found) {
        fetchData(found.id);
      } else {
        alert("Creature not found");
      }
    });

  })
  .catch(err => {
    console.log("1err");
    showError("The creature's info couldn't load");
  });

function showError(msg) {
  pokemonInfoEl.textContent = msg;
  pokemonInfoEl.style.display = "flex";
  pokemonInfoEl.style.justifyContent = "center";
  pokemonInfoEl.style.alignItems = "center";
  pokemonInfoEl.style.fontSize = "1.2em";
  pokemonInfoEl.style.fontWeight = "bold";
}

const fetchData = async creatureId => {
  try {
    const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureId}`);
    const data = await res.json();
    showData(data);
  } catch (err) {
    console.log("2err");
    showError("The creature's info couldn't load");
    console.log(err);
  }
}

function showData(data) {
  nameEl.textContent = data.name;
  id.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;

  special.innerHTML = `
    <p id="special-title">${data.special.name}</p>
    <p>${data.special.description}</p>
  `;

  types.innerHTML = data.types
    .map(type => `<div class="type" id="${type.name}">${type.name.toUpperCase()}</div>`)
    .join("");

  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  spAttack.textContent = data.stats[3].base_stat;
  spDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
}
