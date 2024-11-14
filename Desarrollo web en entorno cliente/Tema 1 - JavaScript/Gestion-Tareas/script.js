// Clase Tarea para crear objetos de tareas con sus propiedades y métodos
class Tarea {
    constructor(id, titulo, descripcion, fecha, prioritaria, prioridad) {
        this.id = id; // ID único para la tarea
        this.titulo = titulo; // Título de la tarea
        this.descripcion = descripcion; // Descripción de la tarea
        this.fecha = fecha; // Fecha límite de la tarea
        this.prioritaria = prioritaria; // Indicador de si es prioritaria
        this.prioridad = prioridad; // Nivel de prioridad (baja, media, alta)
        this.completa = false; // Estado inicial de la tarea (no completada)
        this.imagen = this.obtenerImagen(); // Asigna la imagen de prioridad según el nivel
    }

    // Método para obtener la imagen correspondiente al nivel de prioridad
    obtenerImagen() {
        switch (this.prioridad) {
            case "alta":
                return "https://static-00.iconduck.com/assets.00/high-priority-icon-1024x1024-ryazhwgn.png"; // Imagen roja para alta prioridad
            case "media":
                return "https://static-00.iconduck.com/assets.00/medium-priority-icon-512x512-kpm2vacr.png"; // Imagen amarilla para media prioridad
            case "baja":
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4tANuBJoViapolNoVPmOHlaaFityDbdvSyyhUVpIL_MvB2K3IS6DNmUXkAtzhOPbbHRc&usqp=CAU"; // Imagen verde para baja prioridad
            default:
                return ""; // Imagen vacía si no se especifica prioridad
        }
    }
}

// Array para almacenar las tareas creadas
let tareas = [];
// Contador para asignar un ID único a cada tarea
let idCounter = 1;

// Evento para el formulario de tareas, evitando el comportamiento por defecto (submit) y agregando una tarea
document.getElementById("task-form").addEventListener("submit", (event) => {
    event.preventDefault();
    agregarTarea();
});

// Evento para el filtro de prioridad, actualizando la lista de tareas mostradas
document.getElementById("priority-filter").addEventListener("change", mostrarTareasFiltradas);

// Función para agregar una nueva tarea
function agregarTarea() {
    // Obtener los valores de los campos del formulario
    const titulo = document.getElementById("task-title").value;
    const descripcion = document.getElementById("task-desc").value;
    const fecha = document.getElementById("task-date").value;
    const prioritaria = document.getElementById("task-important").checked;
    const prioridad = document.getElementById("task-priority").value;

    // Crear una nueva instancia de Tarea y agregarla al array de tareas
    const tarea = new Tarea(idCounter++, titulo, descripcion, fecha, prioritaria, prioridad);
    tareas.push(tarea);

    // Mostrar la lista de tareas actualizada con el nuevo filtro
    mostrarTareasFiltradas();
}

// Función para mostrar las tareas filtradas según el nivel de prioridad
function mostrarTareasFiltradas() {
    const filtro = document.getElementById("priority-filter").value; // Obtener el valor del filtro
    const listaTareas = document.getElementById("task-list"); // Elemento para la lista de tareas
    const taskCards = document.getElementById("task-cards"); // Elemento para las tarjetas de tareas
    listaTareas.innerHTML = ""; // Limpiar la lista de tareas
    taskCards.innerHTML = ""; // Limpiar el contenedor de tarjetas

    // Recorrer las tareas y agregar las que no estén completadas y coincidan con el filtro
    tareas.forEach(tarea => {
        if (!tarea.completa && (filtro === "todas" || tarea.prioridad === filtro)) {
            // Crear y agregar un elemento de lista para la tarea
            const tareaItem = document.createElement("li");
            tareaItem.className = "task-item";
            tareaItem.innerText = tarea.titulo; // Mostrar el título de la tarea
            listaTareas.appendChild(tareaItem);

            // Crear y agregar una tarjeta con la información de la tarea
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${tarea.titulo}</h3>
                <img src="${tarea.imagen}" alt="Prioridad ${tarea.prioridad}" class="priority-image">
                <p>${tarea.descripcion}</p>
                <p>Prioridad: ${tarea.prioridad}</p>
                <button onclick="completarTarea(${tarea.id})">Completar</button>
            `;
            taskCards.appendChild(card);
        }
    });
}

// Función para marcar una tarea como completada y actualizar la vista
function completarTarea(id) {
    // Buscar la tarea por su ID
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completa = true; // Marcar como completada
        mostrarTareasFiltradas(); // Refrescar la vista para ocultar la tarea completada
    }
}
