const GEN_OFFSET = [0, 151, 251, 386, 493, 649, 721, 809];
const GEN_LIMIT = [151, 100, 135, 107, 156, 72, 88, 95];

const API_URL = "https://pokeapi.co/api/v2";

/* Convierte la respuesta HTTP en un JSON */
function toJson(response) {
    if(response.ok) {
        return response.json();
    }
    else {
        console.error("Error: ", response);
    }
}

/* Toma una lista de Pokemons y los inserta en una lista */
function pokemonsToLi(pokemons) {

    /* Consigue la lista */
    let ul = document.getElementById("pokemon-list");
    ul.innerText = "";
    /* Itera cada elemento del array */
    pokemons.forEach(pokemon => {
        /* Consigue el nombre */
        let name = pokemon.name;
        let li = document.createElement("li");
        let a = document.createElement("a");
        /* Poner en mayuscula */
        a.innerText = capitalize(name);
        a.className = "dropdown-item";
        li.appendChild(a);
        /* Asocia un evento al click */
        li.addEventListener('click', getPokemon);
        ul.appendChild(li);
    });
}

/* Hace una peticion para un pokemon solo y llama a la funcion que lo muestra */
function getPokemon(event) {
    
    let name = event.target.innerText;

    fetch(`${API_URL}/pokemon/${name.toLowerCase()}`)
    .then(toJson)
    .then(data => showPokemon(data));
}

/* Filtra los Pokemon por generacion */
function chooseGen(gen) {

    let off = GEN_OFFSET[gen - 1];
    let limit = GEN_LIMIT[gen - 1];

    fetch(`${API_URL}/pokemon?limit=${limit}&offset=${off}`)
    .then(toJson)
    .then(data => pokemonsToLi(data.results));
}

/* Busca un Pokemon y lo muestra */
function searchPokemon() {

    let pokename = document.getElementById("pokemon-search").value.toLowerCase();

    fetch(`${API_URL}/pokemon/${pokename}`)
    .then(toJson)
    .then(pokemon => showPokemon(pokemon));
}

/* Muestra un pokemon (se recibe como JSON) */
function showPokemon(pokemon) {

    /* Obtengo el div */
    let div = document.getElementById("pokemon");
    div.innerHTML = "";

    /* Agregar nombre como h1 */
    let nombre = pokemon.name;
    let h1 = document.createElement("h1");
    h1.innerText = nombre;
    div.appendChild(h1);

    /* Agregar sprite en un img */
    let imagen = pokemon.sprites.front_default;
    let img = document.createElement("img");
    img.setAttribute("src", imagen);
    div.appendChild(img);

    /* TODO */
}

function capitalize(text) {
    /* Tiene que recibir un string y devolver el mismo string con la letra mayuscula */

    /* TODO */
    return text;
}