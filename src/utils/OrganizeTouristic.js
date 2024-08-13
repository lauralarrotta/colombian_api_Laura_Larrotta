export const groupTouristAttractions = (departments, attractions) => {
  // Crear un mapa para relacionar IDs de departamentos con sus nombres
  const departmentMap = departments.reduce((acc, department) => {
    acc[department.id] = department.name;
    return acc;
  }, {});

  // Agrupar atracciones por departamento y ciudad
  const groupedData = attractions.reduce((acc, attraction) => {
    const departmentId = attraction.city
      ? attraction.city.departmentId
      : "Unknown";
    const departmentName = departmentMap[departmentId] || "Unknown";
    const cityName = attraction.city ? attraction.city.name : "Unknown";

    if (!acc[departmentName]) {
      acc[departmentName] = {};
    }

    if (!acc[departmentName][cityName]) {
      acc[departmentName][cityName] = [];
    }

    acc[departmentName][cityName].push(attraction);

    return acc;
  }, {});

  // Convertir el objeto a una estructura de array de objetos
  return Object.keys(groupedData).map((department) => {
    const cities = groupedData[department];
    return {
      department,
      cities: Object.keys(cities).map((city) => ({
        city,
        attractions: cities[city],
        count: cities[city].length, // Contar las atracciones
      })),
    };
  });
};
