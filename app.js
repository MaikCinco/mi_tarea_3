document.addEventListener('DOMContentLoaded', function () {
    const contactosUl = document.getElementById('contactos');
    const form = document.getElementById('contactForm');

    // Función para obtener todos los contactos
    async function obtenerContactos() {
        try {
            const response = await fetch('http://www.raydelto.org/agenda.php');
            const contactos = await response.json();
            mostrarContactos(contactos);
        } catch (error) {
            console.error('Error obteniendo los contactos:', error);
        }
    }

    // Mostrar contactos en la lista
    function mostrarContactos(contactos) {
        contactosUl.innerHTML = '';
        contactos.forEach(contacto => {
            const li = document.createElement('li');
            li.textContent = `${contacto.nombre} ${contacto.apellido} - ${contacto.telefono}`;
            contactosUl.appendChild(li);
        });
    }

    // Función para agregar un nuevo contacto
    async function agregarContacto(nombre, apellido, telefono) {
        try {
            const response = await fetch('http://www.raydelto.org/agenda.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, telefono })
            });

            if (response.ok) {
                obtenerContactos(); // Actualizar la lista después de agregar el contacto
            } else {
                console.error('Error agregando contacto');
            }
        } catch (error) {
            console.error('Error en el envío de datos:', error);
        }
    }

    // Manejo del envío del formulario
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;

        agregarContacto(nombre, apellido, telefono);

        // Limpiar los campos
        form.reset();
    });

    // Obtener los contactos al cargar la página
    obtenerContactos();
});
