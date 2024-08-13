# Proyecto de API de Colombia con React

## Descripción

Este proyecto es una aplicación web en React que consume la API de Colombia para mostrar datos sobre Presidentes, Aeropuertos y Atracciones Turísticas. La aplicación está estilizada con CSS y está dockerizada para un fácil despliegue.

## Requisitos

- **Node.js**: Versión recomendada (por ejemplo, 16.x).
- **npm**: Para manejar las dependencias de Node.js.
- **Docker**: Opcional, para contenerización y despliegue.

## Instalación

### **Instalación local**

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**

   Asegúrate de tener un archivo `.env` en la raíz del proyecto con la URL de la API:

   ```env
   REACT_APP_API_URL=https://api-colombia.com/
   ```

4. **Inicia la aplicación:**

   ```bash
   npm start
   ```

   La aplicación estará disponible en `http://localhost:3000`.

### **Despliegue con Docker**

1. **Crea un archivo `Dockerfile` en la raíz del proyecto con el siguiente contenido:**

   ```Dockerfile
   # Usa una imagen base de Node.js
   FROM node:16

   # Configura el directorio de trabajo
   WORKDIR /app

   # Copia los archivos de la aplicación
   COPY package*.json ./
   RUN npm install
   COPY . .

   # Construye la aplicación React
   RUN npm run build

   # Instala un servidor estático para servir la aplicación construida
   RUN npm install -g serve

   # Expone el puerto en el que la aplicación estará escuchando
   EXPOSE 5000

   # Comando para iniciar el servidor estático
   CMD ["serve", "-s", "build"]
   ```

2. **Construye la imagen Docker:**

   ```bash
   docker build -t nombre-imagen .
   ```

3. **Ejecuta el contenedor Docker:**

   ```bash
   docker run -d -p 5000:5000 --name nombre-contenedor nombre-imagen
   ```

   La aplicación estará disponible en `http://localhost:5000`.

### **Despliegue con Docker Compose**

1. **Crea un archivo `docker-compose.yml` en la raíz del proyecto con el siguiente contenido:**

   ```yaml
   version: "3.8"

   services:
     app:
       build: .
       ports:
         - "5000:5000"
       environment:
         - REACT_APP_API_URL=https://api-colombia.com/
   ```

2. **Construye y ejecuta con Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   Esto construirá la imagen y ejecutará el contenedor según las configuraciones del archivo `docker-compose.yml`.

## Funcionalidades

### **1. Consulta y Procesamiento de Datos**

La aplicación realiza consultas a la API de Colombia y procesa los datos de las siguientes entidades:

- **Presidentes (President)**: Agrupamiento por partido político, ordenado descendientemente por el conteo de presidentes.
- **Aeropuertos (Airport)**:
  - Agrupamiento por departamento y ciudad.
  - Agrupamiento por Región, Departamento, Ciudad y Tipo.
- **Atracciones Turísticas (TouristicAttraction)**: Agrupamiento por departamento y ciudad.

### **2. Componentes de React**

La aplicación está dividida en los siguientes componentes:

- **`TabComponent`**: Permite seleccionar la vista de cada entidad.
- **`DataCount`**: Muestra la cantidad de registros por entidad.
- **`DataList`**: Muestra todos los registros de cada entidad.
- **`GroupedData`**: Muestra los datos agrupados según las especificaciones del procesamiento.
- **`ResponseTime`**: Muestra el tiempo de respuesta de la solicitud a la API.

### **3. Visualización**

- **Ruta Principal**: `/colombia_dash`
- La vista principal está organizada en pestañas para cada entidad, con componentes que muestran la cantidad de registros, los registros detallados, los datos agrupados y el tiempo de respuesta.

## Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

1. **Haz un fork del repositorio.**
2. **Crea una rama para tu feature (`git checkout -b feature/nueva-feature`).**
3. **Haz tus cambios y confirma (`git commit -am 'Añadir nueva feature'`).**
4. **Empuja tu rama (`git push origin feature/nueva-feature`).**
5. **Crea un Pull Request en GitHub.**

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

## Contacto

Proporciona información de contacto o enlaces a perfiles de redes sociales para que los usuarios puedan hacer preguntas o sugerencias.

- **Autor**: Laura Larrotta
- **Email**: larrotta.laura@gmail.com
- **GitHub**: [lauralarrotta](https://github.com/lauralarrotta)
