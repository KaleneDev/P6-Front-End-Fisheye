/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
// if element is video or photo
const checkedTypeElement = (media, photographerName) => {
    function isVideo() {
        if (media.video) {
            return true;
        }
        return false;
    }
    function replaceSpaceByUnderscore(string) {
        return string.replace(" ", "_");
    }
    function getDom() {
        if (media.image) {
            const userMediaImage = createElement().createImage(
                "userProfile-media-image",
                media.image,
                media.title
            );
            userMediaImage.setAttribute(
                "src",
                `assets/photographers/${replaceSpaceByUnderscore(
                    photographerName
                )}/${media.image}`
            );
            userMediaImage.setAttribute("alt", media.title + ", closeup view");
            return userMediaImage;
        } else if (media.video) {
            const userMediaVideo = createElement().createVideo(
                "userProfile-media-video",
                media.video
            );
            userMediaVideo.setAttribute(
                "src",
                `assets/photographers/${replaceSpaceByUnderscore(
                    photographerName
                )}/${media.video}`
            );
            return userMediaVideo;
        }
    }
    return {
        getDom,
        isVideo,
    };
};

// Fonction pour créer un élément média

const createElement = () => {
    function createElementWhithId(type, id) {
        const element = document.createElement(type);
        element.id = id;
        return element;
    }
    function createElementWithClass(type, className) {
        const element = document.createElement(type);
        element.classList.add(className);
        return element;
    }
    function createElementWithText(type, className, text) {
        const element = document.createElement(type);
        element.classList.add(className);
        element.textContent = text;
        return element;
    }
    function createImage(classImage, src, alt) {
        const img = document.createElement("img");
        img.classList.add(classImage);
        img.src = src;
        img.alt = alt;
        return img;
    }
    function createVideo(calssVideo, src) {
        const video = document.createElement("video");
        video.classList.add(calssVideo);
        video.src = src;
        return video;
    }

    return {
        createImage,
        createVideo,
        createElementWithClass,
        createElementWithText,
        createElementWhithId,
    };
};

const addClickAndKeydownEvent = (element, callback) => {
    // Assurez-vous que l'élément est focusable
    if (!element.hasAttribute("tabindex")) {
        element.setAttribute("tabindex", "0");
    }
    element.addEventListener("click", callback);
    element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            callback(event);
        }
    });
};
