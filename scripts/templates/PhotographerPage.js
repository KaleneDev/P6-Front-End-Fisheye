function createElementWithClass(elementType, className) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}

function createImage(src, alt, className) {
    const img = createElementWithClass("img", className || "profile-image");
    img.setAttribute("src", src);
    img.setAttribute("alt", alt);
    return img;
}
function createVideo(src, alt, className) {
    const video = createElementWithClass("video", className || "profile-video");
    video.setAttribute("src", src);
    video.setAttribute("alt", alt);
    return video;
}
function createProfileHeader(data) {
    const { name, city, country, tagline } = data;
    const header = createElementWithClass("div", "userProfile-header");
    const profileInfo = createElementWithClass("div", "profile-info");
    const contactButton = createElementWithClass("button", "profile-contact");
    contactButton.setAttribute("id", "btn-contact");

    profileInfo.appendChild(createElementWithText("h1", "profile-name", name));
    profileInfo.appendChild(
        createElementWithText("span", "profile-location", `${city}, ${country}`)
    );
    profileInfo.appendChild(
        createElementWithText("span", "profile-tagline", tagline)
    );

    contactButton.textContent = "Contactez-moi";
    contactButton.addEventListener("click", displayModal);

    header.appendChild(profileInfo);
    header.appendChild(contactButton);
    header.appendChild(createImageContainer(data));

    return header;
}

function createImageContainer(data) {
    const { name, portrait } = data;
    const picture = `assets/Photographers_ID_Photos/${portrait}`;
    const imageContainer = createElementWithClass(
        "div",
        "profile-imageContainer"
    );
    imageContainer.appendChild(createImage(picture, name));
    return imageContainer;
}

function createElementWithText(elementType, className, text) {
    const element = createElementWithClass(elementType, className);
    element.textContent = text;
    return element;
}

// Fonction pour créer et afficher une lightbox
function displayLightbox(source, alt, array, index, photographerName) {
    // Créer l'élément de fond de la lightbox
    const lightboxBackground = createElementWithClass(
        "div",
        "lightbox-background"
    );
    lightboxBackground.addEventListener("click", () => {
        lightboxBackground.remove(); // Cela fermera la lightbox lorsqu'on clique à l'extérieur de l'image
    });

    // Créer le conteneur de la lightbox
    const lightboxContainer = createElementWithClass(
        "div",
        "lightbox-container"
    );
    lightboxContainer.addEventListener("click", (event) => {
        event.stopPropagation(); // Empêche la fermeture lorsque l'on clique sur l'image/contenu de la lightbox
    });
    lightboxBackground.appendChild(lightboxContainer);

    const lightboxClose = createElementWithClass("button", "lightbox-close");
    lightboxClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    lightboxClose.addEventListener("click", () => {
        lightboxBackground.remove(); // Cela fermera la lightbox lorsqu'on clique sur le bouton de fermeture
    });
    lightboxContainer.appendChild(lightboxClose);

    // Créer l'image pour la lightbox

    // const lightboxImage = createImage(imageSrc, imageAlt, "lightbox-image");
    // lightboxContainer.appendChild(lightboxImage);

    // Créer le titre de l'image pour l'accessibilité
    const lightboxTitle = createElementWithText("p", "lightbox-title", alt);
    lightboxContainer.appendChild(lightboxTitle);

    // Ajouter la lightbox au corps du document
    document.body.appendChild(lightboxBackground);

    // Ajouter des boutons de navigation
    const prevButton = createElementWithClass("button", "lightbox-prev");
    prevButton.textContent = "<"; // ou utilisez une icône
    prevButton.onclick = () => navigateLightbox(-1);

    const nextButton = createElementWithClass("button", "lightbox-next");
    nextButton.textContent = ">"; // ou utilisez une icône
    nextButton.onclick = () => navigateLightbox(1);

    lightboxContainer.appendChild(prevButton);
    lightboxContainer.appendChild(nextButton);

    let currentImageIndex = index;
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        // Gérer les limites
        if (currentImageIndex < 0) {
            currentImageIndex = array.length - 1;
        } else if (currentImageIndex >= array.length) {
            currentImageIndex = 0;
        }

        const newMediaSrc =
            array[currentImageIndex].image || array[currentImageIndex].video;
        const newMediaAlt = array[currentImageIndex].title;

        // Assurez-vous d'avoir un conteneur pour les médias
        const lightboxTitle = document.querySelector(".lightbox-title");
        lightboxTitle.textContent = newMediaAlt;
        const lightboxMedia = document.querySelector(
            ".lightbox-container img, .lightbox-container video"
        );

        let newMediaElement;

        if (array[currentImageIndex].image) {
            newMediaElement = document.createElement("img");
            newMediaElement.classList.add("lightbox-image");
        } else if (array[currentImageIndex].video) {
            newMediaElement = document.createElement("video");
            newMediaElement.classList.add("lightbox-video");
            newMediaElement.setAttribute("controls", "controls");
        }

        newMediaElement.setAttribute(
            "src",
            `assets/photographers/${photographerName}/` + newMediaSrc
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
}

// Fonction pour créer un élément média
function createMediaElement(element, photographerName, media, index) {
    // if element is video or image

    const userMedia = createElementWithClass("div", "userProfile-media");
    const mediaBlock = createElementWithClass("div", "userProfile-media-block");
    const userMediaContainer = createElementWithClass(
        "div",
        "userProfile-media-container"
    );

    const userMediaTitle = createElementWithClass(
        "h2",
        "userProfile-media-title"
    );
    const userMediaLikes = createElementWithClass(
        "span",
        "userProfile-media-likes"
    );
    userMediaTitle.textContent = element.title;
    userMediaLikes.textContent = `${element.likes}`;
    userMediaLikes.innerHTML =
        element.likes + '<i class="fa-solid fa-heart"></i>';

    const mediaChecked = checkedTypeElement(element, photographerName);

    // if mediaChecked is video
    userMedia.addEventListener("click", (e) => {
        e.stopPropagation();
        displayLightbox(
            mediaChecked.getDom().src,
            element.title,
            media,
            index,
            photographerName
        );
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

// Fonction pour créer la section principale avec les médias
function createMainSection(data) {
    const { media, name } = data;
    const main = createElementWithClass("div", "userProfile-main");
    const wrapperMedia = createElementWithClass("div", "userProfile-wrapper");
    media.forEach((element, index) => {
        const mediaElement = createMediaElement(element, name, media, index);

        wrapperMedia.appendChild(mediaElement);
    });

    main.appendChild(wrapperMedia);
    return main;
}

const checkedTypeElementPopup = (source, alt, lightboxContainer) => {
    let lightboxElement;
    const isVideo = source.includes("mp4");

    if (isVideo) {
        lightboxElement = createVideo(source, alt, "lightbox-video");

        lightboxElement.setAttribute("controls", "controls");
        lightboxElement.setAttribute("autoplay", ""); // Ajoutez autoplay
        lightboxElement.setAttribute("preload", "auto"); // Améliore le chargement

        lightboxElement
            .play()
            .catch((e) => console.error("Erreur de lecture de la vidéo: ", e)); // Gestion d'erreur
    } else {
        lightboxElement = createImage(source, alt, "lightbox-image");
    }
    lightboxContainer.appendChild(lightboxElement);
    return lightboxElement;
};

function photographerTemplate(data) {
    function getUserProfileDOM() {
        const userProfile = createElementWithClass("div", "userProfile");
        userProfile.appendChild(createProfileHeader(data));
        userProfile.appendChild(createMainSection(data));
        return userProfile;
    }

    return { getUserProfileDOM };
}
