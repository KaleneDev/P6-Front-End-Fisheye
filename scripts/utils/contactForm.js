/* global createElement */
// eslint-disable-next-line no-unused-vars
function displayModal(data) {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";

    const modalTitle = document.getElementById("modalTitle");
    // ajoute tabindex="-1" à la modalTitle
    modalTitle.setAttribute("tabindex", "-1");
    // si modalTitle contain data.name, add a line break
    if (!modalTitle.innerHTML.includes(data.name)) {
        modalTitle.innerHTML += "</br>" + data.name;
    }
    modalTitle.focus();

    const submitButton = document.getElementById("submit");

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (checkForm()) {
            // clean inputs and textareas
            const inputs = document.querySelectorAll("input");
            const textareas = document.querySelectorAll("textarea");
            inputs.forEach((input) => {
                input.value = "";
            });
            textareas.forEach((textarea) => {
                textarea.value = "";
            });
            closeModal();
        }
    });
    // if click outside the modal, the modal should close
    window.addEventListener("click", (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });
    // if i press escape, the modal should close
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
        if (event.key === "Enter") {
            submitButton.click();
        }
    });
}

// if i submit the form, the modal should close

function closeModal() {
    const btnContact = document.getElementById("btn-contact");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    window.removeEventListener("click", closeModal);
    btnContact.focus();
}

function checkForm() {
    const fields = {
        "first-name": "Veuillez entrer un prénom valide",
        "last-name": "Veuillez entrer un nom valide",
        email: "Veuillez entrer une adresse email valide",
        message: "Veuillez entrer votre message",
    };
    let isValid = true;
    let formData = {};
    for (const id in fields) {
        const input = document.getElementById(id);
        let error = input.nextSibling;
        formData[id] = input.value;
        if (!error || error.className !== "error") {
            error = createElement().createElementWithClass("p", "error");
            input.parentNode.insertBefore(error, input.nextSibling);
        }

        if (input.value === "") {
            error.innerHTML = fields[id];
            isValid = false;
        } else if (id === "email" && !input.checkValidity()) {
            error.innerHTML = "Adresse email invalide";
            isValid = false;
        } else if (
            (id === "first-name" || id === "last-name") &&
            !/^[a-zA-Z]+$/.test(input.value)
        ) {
            error.innerHTML =
                "Seuls les caractères alphabétiques sont autorisés";
            isValid = false;
        } else {
            error.innerHTML = "";
        }
    }

    if (isValid) {
        console.log("Valeurs du formulaire:", formData);
    }
    return isValid;
}
