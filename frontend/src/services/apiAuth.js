/**
 * Envía los datos de inicio de sesión al servidor.
 * 
 * Usar dentro de un try{} como:
 * `const resp = await sendLoginData(email, clave);`
 */
export async function sendLoginData(email, clave) {
    try {
        const resp = await fetch(import.meta.env.VITE_API_LOGIN_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, clave })
        });

        if (!resp.ok) {
            throw new Error(`Error en la petición: ${resp.status} ${resp.statusText}`);
        }

        // Parsea el JSON (Intenta...)
        let data;
        try {
            data = await resp.json(); // 👈 puede lanzar SyntaxError
        } catch (err) {
            throw new Error("Respuesta no es JSON (posible error en el servidor)");
        }


        // Verifica que es un objeto
        if (!data || typeof data !== "object" || Array.isArray(data)) {
            throw new Error("Respuesta inválida del servidor");
        }


        // Verifica que tiene los campos esperados
        for (const field of ["result", "code", "message", "token", "data"]) {
            if (!(field in data)) {
                throw new Error(`Campo faltante en la respuesta: ${field}`);
            }
        }

        // Verifica que data.data tiene los campos esperados
        if (data.result) {
            for (const field_1 of ["id", "nombre", "apellido", "email", "rol"]) {
                if (!(field_1 in data.data)) {
                    throw new Error(`Campo faltante en la respuesta.data: ${field_1}`);
                }
            }
        } else {
            console.warn("Error:", data.code);
        }
        return data;
    } catch (error) {
        throw error;
    }
}


