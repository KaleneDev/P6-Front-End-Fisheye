function displayModal(data) {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    const modalTitle = document.getElementById('modalTitle');
    if (!modalTitle.innerHTML.includes(data.name)) {
        modalTitle.innerHTML += '<br />' + data.name;
    }
   
    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (checkForm()) {
            closeModal();
        }
    });
    // if click outside the modal, the modal should close
    window.addEventListener("click", (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });
}

// if i submit the form, the modal should close

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    window.removeEventListener("click", closeModal);
}

function checkForm() {
    const fields = {
        "first-name": "Veuillez entrer votre prénom",
        "last-name": "Veuillez entrer votre nom",
        email: "Veuillez entrer votre email",
        message: "Veuillez entrer votre message",
    };
    let isValid = true;

    for (const id in fields) {
        const input = document.getElementById(id);
        let error = input.nextSibling;
        if (!error || error.className !== "error") {
            error = createElement().createElementWithClass("p", "error");
            input.parentNode.insertBefore(error, input.nextSibling);
        }

        if (input.value === "") {
            error.innerHTML = fields[id];
            isValid = false;
        } else {
            error.innerHTML = "";
        }
        console.log(input.value);
    }

    return isValid;
}
