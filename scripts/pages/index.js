/* global photographerTemplate */

async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

    let photographers = [];
    await fetch("./../data/photographers.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Erreur ${response.status} : ${response.statusText}`
                );
            }
            return response.json();
        })
        .then((data) => {
            photographers = data.photographers;
        })
        .catch((error) => {
            console.error(
                "Il y a eu un problème avec l'opération fetch:",
                error
            );
        });

    // et bien retourner le tableau photographers seulement une fois récupéré
    return {
        photographers: [...photographers],
    };
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
