const BASE_URL = "https://hp-api.onrender.com/api";

let failureCount = 0;
let circuitOpen = false;
let nextTryTime = null;

const FAILURE_THRESHOLD = 3;
const RESET_TIMEOUT = 5000;


const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function request(endpoint) {

    if (circuitOpen) {
        if (Date.now() < nextTryTime) {
            console.warn("Circuit breaker OPEN. Request blocked.");
            showErrorMessage("API is temporarily unavailable. Try again soon.");
            throw new Error("Circuit breaker open");
        }

        circuitOpen = false;
        failureCount = 0;
        console.log("Circuit breaker reset. Trying again...");
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            console.log(`Attempt ${attempt}: ${endpoint}`);

            const res = await fetch(`${BASE_URL}${endpoint}`);

            if (!res.ok) {
                throw new Error(`API Error: ${res.status}`);
            }

            failureCount = 0;
            return await res.json();

        } catch (error) {
            console.error("Request failed:", error);

            failureCount++;

            if (failureCount >= FAILURE_THRESHOLD) {
                circuitOpen = true;
                nextTryTime = Date.now() + RESET_TIMEOUT;

                console.error("Circuit breaker OPENED");
                showErrorMessage("Service is down. Please wait a moment.");
                throw error;
            }

            if (attempt < MAX_RETRIES) {
                console.warn(`Retrying in ${RETRY_DELAY}ms...`);
                await sleep(RETRY_DELAY);
            } else {
                showErrorMessage("Something went wrong. Please try again.");
                throw error;
            }
        }
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
