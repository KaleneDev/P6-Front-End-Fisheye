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
function displayLightbox(imageSrc, imageAlt, images, index, photographerName) {
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
    const lightboxImage = createImage(imageSrc, imageAlt, "lightbox-image");
    lightboxContainer.appendChild(lightboxImage);

    // Créer le titre de l'image pour l'accessibilité
    const lightboxTitle = createElementWithText(
        "p",
        "lightbox-title",
        imageAlt
    );
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
    lightboxContainer.appendChild(lightboxImage);
    lightboxContainer.appendChild(nextButton);

    let currentImageIndex = index;
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        // Gérer les limites
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        // Mettre à jour l'image de la lightbox
        const newImageSrc = images[currentImageIndex].image;
        const newImageAlt = images[currentImageIndex].title;
        const lightboxTitle = document.querySelector(".lightbox-title");
        lightboxTitle.textContent = newImageAlt;
        const lightboxImage = document.querySelector(".lightbox-image");
        lightboxImage.setAttribute(
            "src",
            `assets/photographers/${photographerName}/` + newImageSrc
        );
        lightboxImage.setAttribute("alt", newImageAlt);
    }
}
// let currentImageIndex = 0;

// Fonction pour créer un élément média
function createMediaElement(element, photographerName, media, index) {
    const userMedia = createElementWithClass("div", "userProfile-media");
    const userMediaImage = createElementWithClass(
        "img",
        "userProfile-media-image"
    );
    const mediaBlock = createElementWithClass("div", "userProfile-media-block");
    const userMediaTitle = createElementWithClass(
        "h2",
        "userProfile-media-title"
    );
    const userMediaLikes = createElementWithClass(
        "span",
        "userProfile-media-likes"
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

    userMediaTitle.textContent = element.title;
    userMediaLikes.textContent = `${element.likes}`;
    userMediaLikes.innerHTML = element.likes + '<i class="fa-solid fa-heart"></i>';

    mediaBlock.appendChild(userMediaTitle);
    ``;
    mediaBlock.appendChild(userMediaLikes);
    userMedia.appendChild(userMediaImage);
    ``;
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

function photographerTemplate(data) {
    function getUserProfileDOM() {
        const userProfile = createElementWithClass("div", "userProfile");
        userProfile.appendChild(createProfileHeader(data));
        userProfile.appendChild(createMainSection(data));
        return userProfile;
    }

    return { getUserProfileDOM };
}