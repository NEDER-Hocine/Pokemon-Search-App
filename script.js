const pokemonCardFill = (data) => {
  const pokemon = userInput.value.toLowerCase();
  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = `#${data.id}`;
  pokemonWeight.textContent = `Weight: ${data.weight}`;
  pokemonHeight.textContent = `Height: ${data.height}`;
  imageContainer.innerHTML = `
    <img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">
  `;
  types.innerHTML = "";
  data.types.forEach(({type}) => {
  types.innerHTML += `
    <div class="type ${type.name}">${type.name.toUpperCase()}</div>
  `;
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
  });
}

searchBtn.addEventListener("click", () => {
  if (userInput.value) {
    fetchData();
  }
});