const container = document.getElementById("content");

export function renderCharacters(characters) {
    container.innerHTML = "";

    characters.forEach(char => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <h3>${char.name}</h3>
        <p>House: ${char.house || "Unknown"}</p>
        <p>Actor: ${char.actor || "N/A"}</p>
        `;

        container.appendChild(card);
    });
}

export function renderSpells(spells) {
    container.innerHTML = "";

    spells.forEach(spell => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <h3>${spell.name}</h3>
        <p>${spell.description}</p>
        `;

        container.appendChild(card);
    });
}
