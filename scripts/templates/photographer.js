function photographerTemplate(data) {
    const { name, portrait, city, country, price, tagline, id } = data;
    const picture = `assets/Photographers_ID_Photos/${portrait}`;
    console.log(portrait);

    function getUserCardDOM() {
        const article = document.createElement("article");
        const img = document.createElement("img");
        const imgLink = document.createElement("a");
        const h2Link = document.createElement("a");
        const h2name = document.createElement("h2");
        const spanCity = document.createElement("span");
        const spanPrice = document.createElement("span");
        const spanTagline = document.createElement("span");

        img.setAttribute("alt", name);
        img.setAttribute("src", picture);
        imgLink.setAttribute("href", `photographer.html?id=${id}`);
        imgLink.appendChild(img);
        h2Link.setAttribute("href", `photographer.html?id=${id}`);
        h2Link.appendChild(h2name);

        img.classList.add("userCard-img");
        article.classList.add("userCard");
        h2name.classList.add("userCard-name");
        imgLink.classList.add("userCard-imgLink");
        spanCity.classList.add("userCard-city");
        spanPrice.classList.add("userCard-price");
        spanTagline.classList.add("userCard-tagline");

        h2name.textContent = name;
        spanCity.textContent = city;
        spanCity.textContent += `, ${country}`;
        spanPrice.textContent = price;
        spanPrice.textContent += "€/jour";
        spanTagline.textContent = tagline;

        article.appendChild(imgLink);
        article.appendChild(h2Link);
        article.appendChild(spanCity);
        article.appendChild(spanTagline);
        article.appendChild(spanPrice);
        return article;
    }
    return { getUserCardDOM };
}
