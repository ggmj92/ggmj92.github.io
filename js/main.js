document.addEventListener("DOMContentLoaded", () => {

    const fragmento = document.createDocumentFragment()
    const cajaCategories = document.querySelector('#imgCategories')
    const cajaPhotos = document.querySelector("#imageArray")

    const urlBase = "https://api.pexels.com/v1"
    const apiKey = "J2DbCDlYoLLmBxlObf2OMY9dxeBwhN5Tu620QolzhvR4805Wk7tanp7I"

    const look = async (url) => {

        try {

            const resp = await fetch(`${urlBase}/${url}`, {
                method: 'GET',
                headers: {
                    'Authorization': apiKey
                }
            })

            if (resp.ok) {
                const datos = await resp.json()
                return {
                    ok: true,
                    datos
                };
            } else {
                throw ("error!");
            }

        } catch (error) {
            return {
                ok: false,
                datos: error
            };

        }

    };

    const crearCategoria = async (url) => {
        console.log(url);
        const { ok, datos } = await look(url)
        console.log(datos);

        if (ok) {

            const cmpfigure = document.createElement('FIGURE');
            const cmpimage = document.createElement('IMG');
            cmpimage.src = datos.src.medium
            cmpimage.setAttribute('id', datos.id)
            const cmptext = document.createElement('P');
            cmptext.textContent = datos.photographer;
            cmpfigure.append(cmpimage);
            cmpfigure.append(cmptext);

            return cmpfigure

        } else {
            console.log(ok);
        }
    };

    // const buscador = async ()=> {
    //     const arrayBusqueda = [`https://api.pexels.com/v1/search?query=${busqueda}`]

    // }

    const pintarCaja = async () => {

        const arrayUrls = ['photos/3687770', 'photos/3648269', 'photos/3687772'];


        for (let i = 0; i < arrayUrls.length; i++) {
            const card = await crearCategoria(arrayUrls[i])


            console.log(card);

            cajaCategories.append(card)
        }

        // const card1=await crearCategoria('photos/3687770')
        // const card2=await crearCategoria('photos/3687770')
        // const card3=await crearCategoria('photos/3687770')

    }

    pintarCaja()

    const openArray = async () => {
        const { ok, datos } = await look(`${urlBase}/search?query=${}&orientation=${}`);

        if (ok) {
            cajaPhotos.innerHTML = '';

            datos.photos.forEach((photo) => {
                const cmpfigure = document.createElement('FIGURE');
                const cmpimage = document.createElement('IMG');
                cmpimage.src = photo.src.medium;
                const cmptitle = document.createElement('P');
                cmptitle.textContent = photo.photographer;
                cmpfigure.append(cmpimage);
                cmpfigure.append(cmptitle);
                cajaPhotos.append(cmpfigure);
            });
        } else {
            console.log(datos);
        }
    }
    openArray();

        const pintarCategories = async () => {
        let keyWord='';
        let pageNum =;
        let perPage =;
        const {ok,datos} = await look(`search?query=${keyWord}&page=${pageNum}&per_page=${perPage}/`)
        const arrayPhotos = datos.photos;
        console.log(arrayPhotos)
        arrayPhotos.forEach((item) => {
            console.log(item)
            const cmpfigure = document.createElement('FIGURE');
            const cmpimage = document.createElement('IMG');
            cmpimage.src = item.src.medium
            const cmptext = document.createElement('P');
            cmpfigure.append(cmpimage);
            cmpfigure.append(cmptext);

            cajaCategories.append(cmpfigure);

    }); 

    imageArray.append(fragmento);

    }

    pintarCategories()

})//LOAD


