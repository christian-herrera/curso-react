/**
 * ==> DESCRIPCIÓN DEL SERVICIO
 * 
 * Usar dentro de un try{} como:
 * `const resp = await getProductos();`
 */
export async function getProductos(token) {
  try {
    const resp = await fetch(import.meta.env.VITE_API_PRODUCTOS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: "listar_productos"
      })
    });

    if (!resp.ok) {
      throw new Error(`Error en la petición: {resp.status} {resp.statusText}`);
    }

    // Parsea el JSON (Intenta...)
    let data;
    try {
      data = await resp.json();
    } catch (err) {
      throw new Error(`Respuesta no es JSON (posible error en el servidor)`);
    }

    // Verifica que es un objeto
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error(`Respuesta inválida del servidor`);
    }

    // Verifica que tiene los campos esperados
    for (const field of ["result", "code", "message", "rol", "data"]) {
      if (!(field in data)) {
        throw new Error(`Campo faltante en la respuesta: {field}`);
      }
    }
    
    return data;
  } catch (error) {
    throw error;
  }
}