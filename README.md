# SistemaGestionGimnasioAPP

El trabajo final realizado para la materia Laboratorios de Computación IV consta de un Sistema de Gestión para Gimnasios que busca integrar tres tipos de usuarios: cliente, entrenador y administrador (ordenados así de menor a mayor jerarquía y por ende, teniendo diferentes permisos según el rol).

Además, utilizamos tres entidades claves para la finalidad del proyecto: actividades (donde se mostrará el nombre y la descripción de todas las actividades que se dictan en el establecimiento ), clases (donde se toma una actividad y un entrenador que la dicte y además se colocan un día y horario específico) y reservas (donde se podrán visualizar todas las clases disponibles y clickeando el botón de reservar guardar tu cupo).

## Pasos para levantar el proyecto

### Paso 1: 
* clona el repositorio: https://github.com/BelenLinera/SistemaGestionGimnasioApp
### Paso 2:
* Abri el proyecto desde Visual Studio
### Paso 3:
* Desde la terminal ejecuta el comando npm install para poder acceder a todas las dependencias del proyecto 
### Paso 4:
* En el archivo api.js asegurate de poner el mismo puerto que en el back baseURL: 'https://localhost:7254',
### Paso 5:
* Levantar la API, su instructivo podrás encontrarlo en el otro repositorio
### Paso 6:
* Ejecuta el comando npm start, aguarda unos segundos y la verás levantada en tu navegador predeterminado en el localhost:3000 de tu máquina 


## Tecnologías utilizadas:

* React
* Axios
* Bootstrap
* JavaScript
* React-hooks-form
* React-simple-chatbot
* React-routes
* React-router-dom
* React-dom
* Date-fns
* Yup
