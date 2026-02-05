const BASE_URL = "https://hp-api.onrender.com/api";

async function request(endpoint) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`);

        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Request failed:", error);

        showErrorMessage("Something went wrong. Please try again.");

        throw error;
    }
}

function showErrorMessage(message) {
    const errorBox = document.querySelector("#error-box");

    if (!errorBox) return;

    errorBox.textContent = message;

    errorBox.classList.remove("d-none");

    setTimeout(() => {
        errorBox.classList.add("d-none");
    }, 3000);
}


export function getAllCharacters() {
    return request("/characters");
}

export function getStudents() {
    return request("/characters/students");
}

export function getCharactersByHouse(house) {
    return request(`/characters/house/${house}`);
}

export function getSpells() {
    return request("/spells");
}
