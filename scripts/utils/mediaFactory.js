const normalizeNameFolder = (str) => str.replace(' ', '_');

// if element is video or photo
const checkedTypeElement = (media, photographerName) => {
    function isVideo() {
        if (media.video) {
            return true;
        }
        return false;
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
                `assets/photographers/${normalizeNameFolder(photographerName)}/${media.image}`
            );
            userMediaImage.setAttribute("alt", media.title + ", closeup view");

            return userMediaImage;
        } else if (media.video) {
            const userMediaVideo = createElement().createVideo(
                "userProfile-media-video",
                media.video,
                media.title
            );
            userMediaVideo.setAttribute(
                "src",
                `assets/photographers/${normalizeNameFolder(photographerName)}/${media.video}`
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
    function checkedTypeClass(classTypeClass, type) {
        const element = document.createElement(type);
        // console.log(classTypeClass);
        // if className has # ou .
        if (classTypeClass.includes("#")) {
            classTypeClass = classTypeClass.replace("#", "");
            element.id = classTypeClass;
            return element;
        } else if (classTypeClass.includes(".")) {
            classTypeClass = classTypeClass.replace(".", "");
            element.classList.add(classTypeClass);
            return element;
        } else {
            element.classList.add(classTypeClass);
            return element;
        }
    }

    function createElementWithClass(type, className) {
        const element = checkedTypeClass(className, type);
        return element;
    }
    function createElementWithText(type, className, text) {
        const element = checkedTypeClass(className, type);
        element.textContent = text;
        return element;
    }
    function createImage(classImage, src, alt) {
        const img = checkedTypeClass(classImage, "img");
        img.src = src;
        img.alt = alt;
        return img;
    }
    function createVideo(calssVideo, src, alt) {
        const video = checkedTypeClass(calssVideo, "video");
        video.src = src;
        video.setAttribute("aria-label", alt);
        return video;
    }

    return {
        createImage,
        createVideo,
        createElementWithClass,
        createElementWithText,
    };
};
