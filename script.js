const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonInfoEl = document.getElementById("pokemon-info");
const nameEl = document.getElementById("creature-name");
const id = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const imageContainer = document.getElementById("image-container");
const special = document.getElementById("special");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const form = document.getElementById("pokeform");

fetch("https://pokeapi.co/api/v2/pokemon")
  .then(res => res.json())
  .then(data => {
    
    form.addEventListener("submit", e => {
      e.preventDefault();

      if (!searchInput.value.trim()) {
        alert("Please enter a creature name or ID");
        return;
      }

      allPokemon = data.results;

      const found = allPokemon.find(
        (p, index) => {
          let input;
          if (!isNaN(Number(searchInput.value))) {
            input = Number(searchInput.value);
          } else {
            input = searchInput.value;
          }

          return index + 1 === input || p.name.toLowerCase() === searchInput.value.toLowerCase();
        }
      );

      if (found) {
        fetchData(found.name);
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

const fetchData = async creatureName => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${creatureName}`);
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

  imageContainer.innerHTML = `
    <img src="${data.sprites.front_default}" alt="${data.name}">
  `;

  special.innerHTML = `
    <p id="special-title">Abilities</p>
    ${data.abilities.map(ability => `<span>${ability.ability.name}</span>`).join(", ")}
  `;

  console.log();
  types.innerHTML = data.types
    .map(type => `<div class="type" id="${type.type.name}">${type.type.name.toUpperCase()}</div>`)
    .join("");

  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  spAttack.textContent = data.stats[3].base_stat;
  spDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
}
