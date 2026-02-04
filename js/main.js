import { setupEvents } from "./events.js";
import { getAllCharacters } from "./api.js";
import { renderCharacters } from "./ui.js";

async function init() {
    setupEvents();

    const data = await getAllCharacters();
    renderCharacters(data);
}

init();
