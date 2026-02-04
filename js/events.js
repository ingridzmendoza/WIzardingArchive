import {
    getAllCharacters,
    getStudents,
    getCharactersByHouse,
    getSpells
} from "./api.js";

import { renderCharacters, renderSpells } from "./ui.js";

export function setupEvents() {
    document.getElementById("tab-all").addEventListener("click", async () => {
        const data = await getAllCharacters();
        renderCharacters(data);
    });

    document.getElementById("tab-students").addEventListener("click", async () => {
        const data = await getStudents();
        renderCharacters(data);
    });

    document.querySelectorAll(".house-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const house = btn.dataset.house;
            const data = await getCharactersByHouse(house);
            renderCharacters(data);
        });
    });

    document.getElementById("tab-spells").addEventListener("click", async () => {
        const data = await getSpells();
        renderSpells(data);
    });
}
