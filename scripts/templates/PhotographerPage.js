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

    profileInfo.appendChild(createElementWithText("h1", "profile-name", name));
    profileInfo.appendChild(
        createElementWithText("span", "profile-location", `${city}, ${country}`)
    );
    profileInfo.appendChild(
        createElementWithText("span", "profile-tagline", tagline)
    );

    contactButton.textContent = "Contactez-moi";
    contactButton.setAttribute("onclick", "displayModal()");

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
    const userMediaVideoContainer = createElementWithClass(
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

    const mediaChecked = checkedTypeElement(
        element,
        photographerName,
        media,
        index,
        userMedia,
        userMediaVideoContainer
    );
    mediaBlock.appendChild(userMediaTitle);

    mediaBlock.appendChild(userMediaLikes);

    userMedia.appendChild(userMediaVideoContainer);

    userMediaVideoContainer.appendChild(mediaChecked);

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
// if element is video or photo
const checkedTypeElement = (
    element,
    photographerName,
    media,
    index,
    userMedia,
    userMediaVideoContainer
) => {
    if (element.image) {
        const userMediaImage = createImage(
            element.image,
            element.title,
            "userProfile-media-image"
        );
        userMediaImage.setAttribute(
            "src",
            `assets/photographers/${photographerName}/${element.image}`
        );
        userMediaImage.setAttribute("alt", element.title);
        userMediaImage.addEventListener("click", (e) => {
            e.stopPropagation();
            displayLightbox(
                userMediaImage.src,
                userMediaImage.alt,
                media,
                index,
                photographerName
            );
        });
        // add class video at parent

        userMedia.appendChild(userMediaImage);

        return userMediaImage;
    } else if (element.video) {
        const userMediaVideo = createElementWithClass(
            "video",
            "userProfile-media-video"
        );

        userMediaVideo.setAttribute(
            "src",
            `assets/photographers/${photographerName}/${element.video}`
        );

        userMediaVideo.setAttribute("alt", element.title);

        userMediaVideoContainer.addEventListener("click", (e) => {
            e.stopPropagation();
            displayLightbox(
                userMediaVideo.src,
                element.title,
                media,
                index,
                photographerName
            );
        });

        userMedia.appendChild(userMediaVideo);
        userMediaVideoContainer.classList.add("video");
        return userMediaVideo;
    }
};
const checkedTypeElementPopup = (source, alt, lightboxContainer) => {
    if (source.includes("mp4")) {
        const lightboxVideo = createVideo(source, alt, "lightbox-video");
        lightboxVideo.setAttribute("controls", "controls");
        lightboxVideo.setAttribute("autoplay", ""); // Ajoutez autoplay
        lightboxVideo.setAttribute("preload", "auto"); // Améliore le chargement
        lightboxContainer.appendChild(lightboxVideo);

        return lightboxVideo
            .play()
            .catch((e) => console.error("Erreur de lecture de la vidéo: ", e)); // Gestion d'erreur
    } else {
        const lightboxImage = createImage(source, alt, "lightbox-image");
        return lightboxContainer.appendChild(lightboxImage);
    }
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
