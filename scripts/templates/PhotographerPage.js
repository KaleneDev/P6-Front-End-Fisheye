function createProfileHeader(data) {
    const { name, city, country, tagline } = data;
    const header = createElement().createElementWithClass(
        "div",
        "userProfile-header"
    );
    const profileInfo = createElement().createElementWithClass(
        "div",
        "profile-info"
    );
    const contactButton = createElement().createElementWithClass(
        "button",
        "profile-contact"
    );
    contactButton.setAttribute("id", "btn-contact");
    contactButton.setAttribute("tabindex", "-1");

    profileInfo.appendChild(
        createElement().createElementWithText("h1", "profile-name", name)
    );

    profileInfo.appendChild(
        createElement().createElementWithText(
            "span",
            "profile-location",
            `${city}, ${country}`
        )
    );
    profileInfo.appendChild(
        createElement().createElementWithText(
            "span",
            "profile-tagline",
            tagline
        )
    );

    contactButton.textContent = "Contactez-moi";
    contactButton.addEventListener("click", () => displayModal(data));

    header.appendChild(profileInfo);
    header.appendChild(contactButton);
    header.appendChild(createImageContainer(data));

    return header;
}
function createImageContainer(data) {
    const { name, portrait } = data;
    const picture = `assets/Photographers_ID_Photos/${portrait}`;
    const imageContainer = createElement().createElementWithClass(
        "div",
        "profile-imageContainer"
    );
    const image = createElement().createImage("profile-image", picture, name);

    imageContainer.appendChild(image);
    return imageContainer;
}
// Fonction pour créer la section principale avec les médias
function createMainSection(data) {
    const main = createElement().createElementWithClass(
        "div",
        "userProfile-main"
    );
    const wrapperMedia = createElement().createElementWithClass(
        "div",
        "userProfile-wrapper"
    );

    data.media.forEach((element, index) => {
        const mediaElement = createMediaElement(element, index, data);

        wrapperMedia.appendChild(mediaElement);
    });
    main.appendChild(wrapperMedia);
    // Observer les modifications du DOM

    const likesPrice = createLikesPrice(data);

    main.appendChild(likesPrice);
    if (main) {
        createFilter(data, main, wrapperMedia);
    }

    return main;
}
// Fonction pour créer et afficher une lightbox
function displayLightbox(data, source, alt, index) {
    // Créer l'élément de fond de la lightbox
    const lightboxBackground = createElement().createElementWithClass(
        "div",
        "lightbox-background"
    );
    lightboxBackground.addEventListener("click", () => {
        lightboxBackground.remove(); // Cela fermera la lightbox lorsqu'on clique à l'extérieur de l'image
    });

    // Créer le conteneur de la lightbox
    const lightboxContainer = createElement().createElementWithClass(
        "div",
        "lightbox-container"
    );
    lightboxContainer.setAttribute("aria-label", "image closeup view");
    lightboxContainer.addEventListener("click", (event) => {
        event.stopPropagation(); // Empêche la fermeture lorsque l'on clique sur l'image/contenu de la lightbox
    });
    lightboxBackground.appendChild(lightboxContainer);

    const lightboxClose = createElement().createElementWithClass(
        "button",
        "lightbox-close"
    );
    lightboxClose.innerHTML =
        '<i class="fa-solid fa-xmark" aria-label="Close dialog"></i>';
    const userProfileMedia = document.querySelector(".userProfile-media");

    addClickAndKeydownEvent(lightboxClose, () => {
        lightboxBackground.remove(); // Cela fermera la lightbox lorsqu'on clique sur le bouton de fermeture
        userProfileMedia.setAttribute("tabindex", "-1");
        userProfileMedia.focus();
    });
    lightboxContainer.appendChild(lightboxClose);

    // Créer l'image pour la lightbox

    // Créer le titre de l'image pour l'accessibilité
    const lightboxTitle = createElement().createElementWithText(
        "p",
        "lightbox-title",
        alt
    );

    // Ajouter la lightbox au corps du document
    document.body.appendChild(lightboxBackground);

    // Ajouter des boutons de navigation
    const prevButton = createElement().createElementWithClass(
        "button",
        "lightbox-prev"
    );
    prevButton.setAttribute("aria-label", "Previous image");
    prevButton.textContent = "<"; // ou utilisez une icône
    prevButton.onclick = () => navigateLightbox(-1);

    const nextButton = createElement().createElementWithClass(
        "button",
        "lightbox-next"
    );
    nextButton.setAttribute("aria-label", "Next image");
    nextButton.setAttribute("tabindex", "-1");
    nextButton.textContent = ">"; // ou utilisez une icône
    nextButton.onclick = () => navigateLightbox(1);

    lightboxContainer.appendChild(prevButton);
    lightboxContainer.appendChild(nextButton);
    nextButton.focus();

    const media = filteredMedias || [];

    let currentImageIndex = index;
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        // Gérer les limites
        if (currentImageIndex < 0) {
            currentImageIndex = media.length - 1;
        } else if (currentImageIndex >= media.length) {
            currentImageIndex = 0;
        }
        const newMediaSrc =
            media[currentImageIndex].image || media[currentImageIndex].video;
        const newMediaAlt = media[currentImageIndex].title;

        // Assurez-vous d'avoir un conteneur pour les médias
        const lightboxTitle = document.querySelector(".lightbox-title");
        lightboxTitle.textContent = newMediaAlt;
        const lightboxMedia = document.querySelector(
            ".lightbox-container img, .lightbox-container video"
        );

        let newMediaElement;

        if (media[currentImageIndex].image) {
            newMediaElement = document.createElement("img");
            newMediaElement.classList.add("lightbox-image");
        } else if (media[currentImageIndex].video) {
            newMediaElement = document.createElement("video");
            newMediaElement.classList.add("lightbox-video");
            newMediaElement.setAttribute("controls", "controls");
        }

        newMediaElement.setAttribute(
            "src",
            `assets/photographers/${data.name.replace(" ", "_")}/` + newMediaSrc
        );
        newMediaElement.setAttribute("alt", newMediaAlt);
        // Remplacer l'ancien élément média par le nouveau
        if (lightboxMedia) {
            lightboxContainer.replaceChild(newMediaElement, lightboxMedia);
        } else {
            lightboxContainer.appendChild(newMediaElement);
        }
    }

    checkedTypeElementPopup(source, alt, lightboxContainer);
    lightboxContainer.appendChild(lightboxTitle);
}
// Fonction pour créer un élément média
function createMediaElement(element, index, data) {
    // if element is video or image

    const userMedia = createElement().createElementWithClass(
        "div",
        "userProfile-media"
    );
    const mediaBlock = createElement().createElementWithClass(
        "div",
        "userProfile-media-block"
    );
    const userMediaContainer = createElement().createElementWithClass(
        "div",
        "userProfile-media-container"
    );

    const userMediaTitle = createElement().createElementWithClass(
        "h2",
        "userProfile-media-title"
    );
    const userMediaLikes = createElement().createElementWithClass(
        "span",
        "userProfile-media-likes"
    );

    element.isLiked = false;

    userMediaTitle.textContent = element.title;
    userMediaLikes.textContent = `${element.likes}`;
    userMediaLikes.innerHTML =
        element.likes + '<i class="fa-solid fa-heart" aria-label="likes"></i>';

    addClickAndKeydownEvent(userMediaLikes, () => {
        if (!element.isLiked) {
            element.likes += 1;
            userMediaLikes.innerHTML =
                element.likes +
                '<i class="fa-solid fa-heart" aria-label="likes"></i>';
            element.isLiked = true;
            const likesPriceLikes = document.querySelector(
                ".userProfile-likesPrice-likes"
            );
            updateTotalLikes(data.media, likesPriceLikes);
        }
    });
    const mediaChecked = checkedTypeElement(element, data.name);

    addClickAndKeydownEvent(userMediaContainer, (e) => {
        e.preventDefault();
        e.stopPropagation();
        displayLightbox(data, mediaChecked.getDom().src, element.title, index);
    });

    addClickAndKeydownEvent(userMediaTitle, (e) => {
        e.preventDefault();
        e.stopPropagation();
        displayLightbox(data, mediaChecked.getDom().src, element.title, index);
    });

    if (!mediaChecked.isVideo()) {
        userMediaContainer.classList.add("image");
    } else {
        userMediaContainer.classList.add("video");
    }

    mediaBlock.appendChild(userMediaTitle);

    mediaBlock.appendChild(userMediaLikes);

    userMedia.appendChild(userMediaContainer);

    userMediaContainer.appendChild(mediaChecked.getDom());

    userMedia.appendChild(mediaBlock);

    return userMedia;
}
const checkedTypeElementPopup = (source, alt, lightboxContainer) => {
    let lightboxElement;
    const isVideo = source.includes("mp4");

    if (isVideo) {
        lightboxElement = createElement().createVideo("lightbox-video", source);

        lightboxElement.setAttribute("controls", "controls");
        lightboxElement.setAttribute("autoplay", ""); // Ajoutez autoplay
        lightboxElement.setAttribute("preload", "auto"); // Améliore le chargement

        lightboxElement
            .play()
            .catch((e) => console.error("Erreur de lecture de la vidéo: ", e)); // Gestion d'erreur
    } else {
        lightboxElement = createElement().createImage(
            "lightbox-image",
            source,
            alt
        );
    }
    lightboxContainer.appendChild(lightboxElement);
    return lightboxElement;
};

// Fonction pour créer un élément likes/price
const createLikesPrice = (data) => {
    const likesPrice = createElement().createElementWithClass(
        "div",
        "userProfile-likesPrice"
    );
    const likesPriceLikes = createElement().createElementWithClass(
        "span",
        "userProfile-likesPrice-likes"
    );
    const likesPricePrice = createElement().createElementWithClass(
        "span",
        "userProfile-likesPrice-price"
    );

    updateTotalLikes(data.media, likesPriceLikes);
    likesPricePrice.textContent = `${data.price}€/jour`;

    likesPrice.appendChild(likesPriceLikes);
    likesPrice.appendChild(likesPricePrice);
    return likesPrice;
};
// Fonction pour mettre à jour le total des likes
const updateTotalLikes = (data, likesPriceLikes) => {
    const totalLikes = data.reduce((acc, curr) => acc + curr.likes, 0);
    likesPriceLikes.innerHTML =
        totalLikes + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
};

function photographerTemplate(data) {
    function getUserProfileDOM() {
        const userProfile = createElement().createElementWithClass(
            "div",
            "userProfile"
        );

        userProfile.appendChild(createProfileHeader(data));

        userProfile.appendChild(createMainSection(data));

        return userProfile;
    }

    return { getUserProfileDOM };
}
