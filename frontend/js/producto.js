async function cargarProductoDetalle() {
    // 1. Leer el ?id= de la URL  con URLSearchParams
    const params = new URLSearchParams(window.location.search);
    const id     = params.get('id'); // "64a1b2....." o null

    const elCargando = document.getElementById('estado-cargando');
    const elError    = document.getElementById('estado-error');
    const elDetalle    = document.getElementById('estado-detalle');

    // 2. Sin id en la URL → mostrar error
    if (!id) {elCargando.style.display ='none'; elError.style.display = 'block'; return; }

    try {
        // 3. Pedir el producto al backend (ruta del paso 1)
        const respuesta = await fetch('http://localhost:300/api/productos' + id)
        if (!respuesta.ok) throw new Error('No encontrado');
        const producto = await respuesta.json();

        // 4. Llenar el DOM con los datos del producto
        document.getElementById('producto-nombre').textContent     =producto.nombre;
        document.getElementById('producto-precio').textContent     =producto.precio;
        document.getElementById('producto-descripcion').textContent     =producto.descripcion;

        // 4b: Imagen: si tiene → <img>, si no → emoji como placeholder
        const imgWrap = document.getElementById('producto-imagen-wrap');
        imgWrap.innerHTML = producto.imagen
            ? `<img src="${producto.imagen}" alt="${producto.nombre}">`
            : `<div class="producto-imagen-placeholder">${producto.icono || '📦'}</div>`;
        
        // 5. Mostrar el contenido

    }
