const BASE_URL = "https://hp-api.onrender.com/api";

export async function getAllCharacters() {
    const res = await fetch(`${BASE_URL}/characters`);
    return res.json();
}

export async function getStudents() {
    const res = await fetch(`${BASE_URL}/characters/students`);
    return res.json();
}

export async function getCharactersByHouse(house) {
    const res = await fetch(`${BASE_URL}/characters/house/${house}`);
    return res.json();
}

export async function getSpells() {
    const res = await fetch(`${BASE_URL}/spells`);
    return res.json();
}
