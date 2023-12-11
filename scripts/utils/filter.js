function filter(data) {
    function createFilter() {
        const listboxContainer = createListBoxContainer();
        const filterButton = createFilterButton(listboxContainer);
        const listbox = createListBox();

        listboxContainer.appendChild(filterButton);
        listboxContainer.appendChild(listbox);

        const userProfileMain = document.querySelector(".userProfile-main");

        userProfileMain.insertBefore(
            listboxContainer,
            userProfileMain.firstChild
        );
        setupFilterOptions(listbox, data, filterButton);
        applyFilter({ option: "Popularité", ascending: true }, data.media);
    }

    function createListBoxContainer() {
        const container = createElement().createElementWithClass(
            "div",
            ".listbox-container"
        );
        const orderByLabel = createElement().createElementWithText(
            "span",
            "order-by-label",
            "Order by"
        );
        orderByLabel.id = "orderByLabel";
        container.appendChild(orderByLabel);
        return container;
    }

    function createFilterButton(listboxContainer) {
        const button = createElement().createElementWithClass(
            "button",
            ".filter-button"
        );
        button.setAttribute("role", "button");
        button.setAttribute("aria-haspopup", "listbox");
        button.setAttribute("aria-expanded", "false");
        button.textContent = "Trier par";
        button.addEventListener("click", () =>
            toggleFilter(button, listboxContainer)
        );
        return button;
    }

    function createListBox() {
        const box = createElement().createElementWithClass("div", "#listbox");
        box.setAttribute("role", "listbox");
        box.setAttribute("aria-labelledby", "orderByLabel");
        box.setAttribute("aria-expanded", "false");
        box.classList.add("listbox", "close");
        return box;
    }

    function toggleFilter(button, listboxContainer) {
        const listbox = listboxContainer.querySelector("#listbox");
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", expanded ? "false" : "true");

        if (expanded) {
            listbox.classList.add("close");
            listbox.classList.remove("open");
            listboxContainer.classList.add("close");
            listboxContainer.classList.remove("open");
        } else {
            listbox.classList.remove("close");
            listbox.classList.add("open");
            listboxContainer.classList.remove("close");
            listboxContainer.classList.add("open");
        }
    }

    function setupFilterOptions(listbox, data, filterButton) {
        listbox.addEventListener("click", (e) => {
            e.stopPropagation();
            listbox.classList.add("open");
            listbox.classList.remove("close");
            listbox.setAttribute("aria-expanded", "true");
        });

        let currentSort = { option: "Popularité", ascending: true }; // Tri actuel
        const options = ["Popularité", "Date", "Titre"];
        options.forEach((option) => {
            const optionElement = createElement().createElementWithClass(
                "div",
                "option"
            );
            optionElement.setAttribute("role", "option");
            optionElement.setAttribute("tabindex", "0");
            optionElement.setAttribute('aria-labelledby', option)
            optionElement.innerHTML =  '<label id="' + option + '">' + option + '</label>';

            // Création de l'icône FontAwesome
            const icon = document.createElement("i");
            icon.className = "fa-solid  fa-angle-up"; // Assurez-vous que cette classe est correcte
            icon.style.display = option === "Popularité" ? "inline" : "none"; // Afficher pour "Popularité"
            optionElement.appendChild(icon);

            // Sélection initiale pour "Popularité"
            if (option === "Popularité") {
                optionElement.setAttribute("aria-selected", "true");
                optionElement.setAttribute("ascending", "true");

                optionElement.classList.add("active");
            }
            // Appliquer le filtre
            const filterActive = () => {
                applyFilter(currentSort, data.media);
                icon.className = currentSort.ascending
                    ? "fa-solid fa-angle-up"
                    : "fa-solid fa-angle-down";
            };
            optionElement.addEventListener("click", () => {
                if (listbox.getAttribute("aria-expanded") === "true") {
                    optionElement.setAttribute("ascending", "true");
                    currentSort.option = option;
                    if (
                        option === currentSort.option &&
                        optionElement.classList.contains("active")
                    ) {
                        currentSort.ascending = !currentSort.ascending;
                        filterActive();
                    } else {
                        currentSort = { option, ascending: true };
                        filterActive();
                    }

                    // Mettre à jour aria-selected pour toutes les options
                    document
                        .querySelectorAll('#listbox > [role="option"]')
                        .forEach((el) => {
                            el.setAttribute("aria-selected", "false");
                            el.querySelector("i").style.display = "none"; // Cacher l'icône
                            el.classList.remove("active"); // Supprimer la classe active
                        });

                    // add class active pour l'option cliquée
                    optionElement.classList.add("active");

                    // Définir aria-selected sur true pour l'option cliquée
                    optionElement.setAttribute("aria-selected", "true");
                    icon.style.display = "inline"; // Afficher l'icône
                }

                listbox.prepend(optionElement);
            });

            listbox.appendChild(optionElement);
        });

        // Gestionnaire d'événements pour fermer la listbox lors d'un clic à l'extérieur
        document.addEventListener("click", (e) => {
            if (
                !listbox.contains(e.target) &&
                !filterButton.contains(e.target)
            ) {
                listbox.classList.add("close");
                listbox.classList.remove("open");
                listbox.setAttribute("aria-expanded", "false");
            }
        });
    }
    // Fonctions applyFilter et updateMediaDisplay (inchangées)
    function applyFilter(sort, mediaArray) {
        let filteredMedia;
        // console.log(sort.ascending);
        switch (sort.option) {
            case "Popularité":
                filteredMedia = sort.ascending
                    ? [...mediaArray].sort((b, a) => a.likes - b.likes)
                    : [...mediaArray].sort((b, a) => b.likes - a.likes);
                break;
            case "Date":
                filteredMedia = sort.ascending
                    ? [...mediaArray].sort(
                          (b, a) => new Date(a.date) - new Date(b.date)
                      )
                    : [...mediaArray].sort(
                          (b, a) => new Date(b.date) - new Date(a.date)
                      );
                break;
            case "Titre":
                filteredMedia = sort.ascending
                    ? [...mediaArray].sort((a, b) =>
                          a.title.localeCompare(b.title)
                      )
                    : [...mediaArray].sort((a, b) =>
                          b.title.localeCompare(a.title)
                      );
                break;
            default:
                filteredMedia = [...mediaArray];
        }

        updateMediaDisplay(filteredMedia);
    }
    function updateMediaDisplay(filteredMedia) {
        const wrapperMedia = document.querySelector(".userProfile-wrapper");
        wrapperMedia.innerHTML = "";
        filteredMedia.forEach((element, index) => {
            const mediaElement = createMediaElement(
                element,
                data.name,
                data.media,
                index
            );
            wrapperMedia.appendChild(mediaElement);
        });
    }

    return {
        createFilter,
    };
}
