export async function fetchPokemon(limit=12) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12`);
    const data = await res.json();
    const detailed = await Promise.all(
        data.results.map(async(pokemon) => {
            const pokeRes = await fetch(pokemon.url);
            const pokeData = await pokeRes.json();
            return {
                name: pokeData.name,
                image: pokeData.sprites.front_default,
            };
        })
    );
    return detailed;
}