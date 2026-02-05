import { getAllCharacters } from "./api.js";
import { setupEvents } from "./events.js";
import { renderCharacters } from "./ui.js";

let currentData = [];
let currentView = "characters";

async function init() {
    setupEvents(handleDataChange);

    const characters = await getAllCharacters();
    currentData = characters;
    currentView = "characters";
    renderCharacters(currentData);

    setupSearch();
}

function setupSearch() {
    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();

        const filtered = currentData.filter(item =>
            item.name.toLowerCase().includes(query)
        );
        
        renderCharacters(filtered)
    });
}

async function handleDataChange(type, value) {
    const searchInput = document.getElementById("search-input");
    searchInput.value = "";

    if (type === "all") {
        currentData = await getAllCharacters();
        currentView = "characters";
        renderCharacters(currentData);
    }

    if (type === "students") {
        currentData = await getAllStudents();
        currentView = "characters";
        renderCharacters(currentData);
    }

    if (type === "house") {
        currentData = await getCharactersByHouse(value);
        currentView = "characters";
        renderCharacters(currentData);
    }
}

init();
