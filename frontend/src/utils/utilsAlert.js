// --> Utilidad: Pagina -> LoginPage.jsx
export async function showHelpLoginMessage() {
    const Swal = (await import("sweetalert2")).default;
    Swal.fire({
        title: "Ayuda...",
        html: `
                <p>Utiliza algunos de las siguientes credenciales:</p>
                <div style="display: flex;">               
                    <div style="width: 50%">
                        <ul style="text-align: left;">
                            <li><b>Usuario:</b> admin</li>
                            <li><b>Clave:</b> 123456</li>
                        </ul>
                    </div>
                    <div style="width: 50%">
                        <ul style="text-align: left;">
                            <li><b>Usuario:</b> user</li>
                            <li><b>Clave:</b> 123456</li>
                        </ul>
                    </div>
                </div>
            `,
        icon: "question",
        confirmButtonText: "Entendido",
    });
}


// --> Utilidad: Errores y Success
export async function showError(message) {
    const Swal = (await import("sweetalert2")).default;
    return Swal.fire({
        icon: "error",
        title: "Error!",
        html: message,
        confirmButtonText: "Ok",
    });
}

export async function showNotify(title, message, icon = "success") {
    const Swal = (await import("sweetalert2")).default;
    return Swal.fire({
        icon: icon,
        title: title,
        text: message,
        confirmButtonText: "Ok",
    });
}

export async function showToast(message, icon = "success") {
    const Swal = (await import("sweetalert2")).default;
    return Swal.fire({
        toast: true,
        position: "top-end",
        icon,
        title: message,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
}

// --> Utilidad: Preguntas y Confirmaciones
export async function showQuestion(title, message) {
    const Swal = (await import("sweetalert2")).default;
    return Swal.fire({
        title: title,
        text: message,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
    });
}

export async function showInput(title, message, placeholder = "") {
    const Swal = (await import("sweetalert2")).default;
    return Swal.fire({
        input: "text",
        title: title,
        html: message,
        inputPlaceholder: placeholder,
        inputAttributes: {
            autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
    });
}

export async function showTextarea(title, message, placeholder = "", value = "") {
    const Swal = (await import("sweetalert2")).default;
    return Swal.fire({
        input: "textarea",
        title: title,
        html: message,
        inputPlaceholder: placeholder,
        inputValue: value,
        inputAttributes: {
            autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
    });
}

export async function showTextareaReadOnly(title, value = "") {
    const Swal = (await import("sweetalert2")).default;
    return Swal.fire({
        title: title,
        html: `<textarea readonly style="width: 100%; border-radius: 5px; border: 1px solid #d9d9d9; color: #545454; padding: 5px;" rows="8">${value}</textarea>`,
        confirmButtonText: "Aceptar",
    });
}

export async function showImage(title, image) {
    const Swal = (await import("sweetalert2")).default;
    return Swal.fire({
        title: title,
        imageUrl: image,
        imageHeight: 400,
        imageAlt: "Custom image",
        confirmButtonText: "Aceptar",
    });
}

// --> Utilidad: Temporizadas
export async function showTimedAlert(title, message, timer = 2000, icon = "info") {
    const Swal = (await import("sweetalert2")).default;
    return Swal.fire({
        title: title,
        text: message,
        icon: icon,
        timer: timer,
        timerProgressBar: true,
        showConfirmButton: false,
    });
}

// --> Utilidad: Generico
export async function closeAlert() {
    const Swal = (await import("sweetalert2")).default;
    Swal.close();
}
