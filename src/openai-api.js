
const dalleApi = process.env.REACT_APP_OPENAI_API_KEY;

export const imageGeneration = async (prompt) => {
    

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${dalleApi}`,
        
    }
    

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                prompt: prompt,
                n: 1,
                size: '1024x1024'
            }),
                   
        });

        const data = await response.json();
        console.log(data)
        // Verificar si ocurrió un error
        if (!response.ok) {
            throw new Error(`No se pudo generar la imagen: ${response.status} (${response.statusText})`);
        }

        const imageUrl = data.data[0].url;
        console.log(`imageUrl = ${imageUrl}`)
    

        return {"prompt": prompt, "URL": imageUrl};
    } catch (error) {
        console.error(error);
    }
}