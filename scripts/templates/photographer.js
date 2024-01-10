// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
    const { name, portrait, city, country, price, tagline, id } = data;
    const picture = `assets/Photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("div");
        const anchor = document.createElement("a");
        const img = document.createElement("img");
        const infoDiv = document.createElement("div");
        const h2name = document.createElement("h2");
        const spanCityCountry = document.createElement("span");
        const spanPrice = document.createElement("span");
        const spanTagline = document.createElement("span");

        // Setting attributes and classes
        article.classList.add("userCard");
        anchor.setAttribute("href", `photographer.html?id=${id}`);
        anchor.classList.add("userCard-link");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
        img.classList.add("userCard-img");
        infoDiv.classList.add("userCard-info");
        h2name.classList.add("userCard-name");
        spanCityCountry.classList.add("userCard-city-country");
        spanPrice.classList.add("userCard-price");
        spanTagline.classList.add("userCard-tagline");

        // Setting text content
        h2name.textContent = name;
        spanCityCountry.textContent = `${city}, ${country}`;
        spanPrice.textContent = `${price}€/jour`;
        spanTagline.textContent = tagline;

        // Appending elements
        anchor.appendChild(img);
        anchor.appendChild(h2name);
        infoDiv.appendChild(spanCityCountry);
        infoDiv.appendChild(spanPrice);
        infoDiv.appendChild(spanTagline);
        article.appendChild(anchor);
        article.appendChild(infoDiv);

        return article;
    }

    return { getUserCardDOM };
}
