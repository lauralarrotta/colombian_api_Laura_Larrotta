export const groupAirports = (departments, airports) => {
  const departmentMap = departments.reduce((acc, department) => {
    acc[department.id] = department.name;
    return acc;
  }, {});

  const groupedData = airports.reduce((acc, airport) => {
    const departmentId = airport.city ? airport.city.departmentId : "Unknown";
    const departmentName = departmentMap[departmentId] || "Unknown";
    const cityName = airport.city ? airport.city.name : "Unknown";
    const airportType = airport.type || "Unknown";

    if (!acc[departmentName]) {
      acc[departmentName] = {};
    }

    if (!acc[departmentName][cityName]) {
      acc[departmentName][cityName] = { types: {} };
    }

    if (!acc[departmentName][cityName].types[airportType]) {
      acc[departmentName][cityName].types[airportType] = {
        count: 0,
        airports: [],
      };
    }

    acc[departmentName][cityName].types[airportType].count += 1;
    acc[departmentName][cityName].types[airportType].airports.push(airport);

    return acc;
  }, {});

  return Object.keys(groupedData).map((department) => {
    const cities = groupedData[department];
    return {
      department,
      cities: Object.keys(cities).map((city) => ({
        city,
        types: Object.keys(cities[city].types).map((type) => ({
          type,
          count: cities[city].types[type].count,
          airports: cities[city].types[type].airports,
        })),
      })),
    };
  });
};
