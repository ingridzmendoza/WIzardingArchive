const container = document.getElementById("content");

function formatValue(value) {
    return value && value !== "" ? value : "Not available";
}

function formatWand(wand) {
    if (!wand || (!wand.wood && !wand.core && !wand.length)) {
        return "Not available";
    }

    return `
    Wood: ${formatValue(wand.wood)}<br>
    Core: ${formatValue(wand.core)}<br>
    Length: ${formatValue(wand.length)}
    `;
}

export function renderCharacters(characters) {
    container.innerHTML = "";

    characters.forEach(char => {
        const col = document.createElement("div");
        col.className = "col";

        const imageSrc = char.image
            ? char.image
            : "assets/images/nophoto.png";

        col.innerHTML = `
        <div class="card h-100 archive-card">
            <img
            src="${imageSrc}"
            class="card-img-top character-image"
            alt="${char.name}"
            onerror="this.src='assets/images/nophoto.png'"
            />

            <div class="card-body">
            <h5 class="card-title">${char.name}</h5>

            <p class="card-text mb-2">
                <strong>Species:</strong> ${formatValue(char.species)}<br>
                <strong>Gender:</strong> ${formatValue(char.gender)}<br>
                <strong>House:</strong> ${formatValue(char.house)}<br>
                <strong>Ancestry:</strong> ${formatValue(char.ancestry)}<br>
                <strong>Patronus:</strong> ${formatValue(char.patronus)}
            </p>

            <p class="card-text">
                <strong>Wand:</strong><br>
                ${formatWand(char.wand)}
            </p>
            </div>
        </div>
        `;

        container.appendChild(col);
    });
}

export function renderSpells(spells) {
    container.innerHTML = "";

    spells.forEach(spell => {
        const col = document.createElement("div");
        col.className = "col";

        col.innerHTML = `
        <div class="card h-100 archive-card">
            <div class="card-body">
            <h5 class="card-title">${spell.name}</h5>
            <p class="card-text">${spell.description}</p>
            </div>
        </div>
        `;

        container.appendChild(col);
    });
}
