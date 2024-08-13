export const transformData = (groupedAirports, regions) => {
  const result = {};

  Object.keys(groupedAirports).forEach((regionName) => {
    const departments = groupedAirports[regionName];
    const region = regions.find((r) => r.name.toLowerCase() === regionName);

    if (region) {
      result[regionName] = {};

      Object.keys(departments).forEach((departmentName) => {
        const cities = departments[departmentName];
        const department = region.departments.find(
          (d) => d.name.toLowerCase() === departmentName
        );

        if (department) {
          result[regionName][departmentName] = {};

          Object.keys(cities).forEach((cityName) => {
            const types = cities[cityName];

            if (cityName) {
              result[regionName][departmentName][cityName] = {};

              Object.keys(types).forEach((type) => {
                const airportsCount = types[type];
                result[regionName][departmentName][cityName][type] =
                  airportsCount;
              });

              result[regionName][departmentName][cityName]["region"] =
                regionName;
              result[regionName][departmentName][cityName]["tipo"] = types;
            }
          });
        }
      });
    }
  });

  return result;
};
