// Fonction pour récupérer les détails d'un photographe spécifique à partir de son ID
async function getPhotographerById(id) {
    let photographerDetail = {};

    await fetch("../../data/photographers.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Erreur ${response.status} : ${response.statusText}`
                );
            }
            return response.json();
        })
        .then((data) => {
            photographerDetail = data.photographers.find(
                (photographer) => photographer.id == id
            );
            photographerDetail.media = data.media.filter(
                (media) => media.photographerId == id
            );
        })
        .catch((error) => {
            console.error(
                "Il y a eu un problème avec l'opération fetch:",
                error
            );
        });
    return photographerDetail;
}

// Fonction pour afficher les détails d'un photographe spécifique
async function displayPhotographerDetail(photographer) {
    const photographerSection = document.querySelector(
        "#main"
    );
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserProfileDOM();
    photographerSection.appendChild(userCardDOM);
}

// Récupère l'ID du photographe à partir de l'URL
function getPhotographerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

async function init() {
    // Récupère l'ID du photographe à partir de l'URL
    const photographerId = getPhotographerIdFromURL();

    // Récupère les détails du photographe à partir de son ID
    const photographer = await getPhotographerById(photographerId);

    // Affiche les détails du photographe
    displayPhotographerDetail(photographer);
}

init();
