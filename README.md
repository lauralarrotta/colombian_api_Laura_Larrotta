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
- **GitHub**: [larrotta.laura@gmail.com](mailto:larrotta.laura@gmail.com)
