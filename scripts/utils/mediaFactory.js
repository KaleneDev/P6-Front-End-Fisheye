function mediaFactory(media, photographerName) {
  function isVideo() {
    if (media.video) {
      return true;
    }
    return false;
  }
  function getDom() {
    if (media.image) {
      const userMediaImage = createImage(
        media.image,
        media.title,
        "userProfile-media-image"
      );
      userMediaImage.setAttribute(
        "src",
        `assets/photographers/${photographerName}/${media.image}`
      );
      userMediaImage.setAttribute("alt", media.title);

      return userMediaImage;
    } else if (media.video) {
      const userMediaVideo = createElementWithClass(
        "video",
        "userProfile-media-video"
      );

      userMediaVideo.setAttribute(
        "src",
        `assets/photographers/${photographerName}/${media.video}`
      );

      userMediaVideo.setAttribute("alt", media.title);
      return userMediaVideo;
    }
  }
  return {
    getDom,
    isVideo
  };
}
