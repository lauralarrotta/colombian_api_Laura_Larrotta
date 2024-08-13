// Get All
export const fetchPresidents = async () => {
  try {
    const response = await fetch("https://api-colombia.com/api/v1/President");
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

export const fetchCities = async () => {
  try {
    const response = await fetch("https://api-colombia.com/api/v1/City");
    if (!response.ok) {
      throw new Error("Error fetching cities data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    return [];
  }
};

export const fetchAirports = async () => {
  try {
    const response = await fetch("https://api-colombia.com/api/v1/Airport");
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

export const fetchTouristicAttraction = async () => {
  try {
    const response = await fetch(
      "https://api-colombia.com/api/v1/TouristicAttraction"
    );
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

export const fetchDepartments = async () => {
  try {
    const response = await fetch("https://api-colombia.com/api/v1/Department");
    const departments = await response.json();
    return departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
};

export const fetchRegions = async () => {
  const response = await fetch("https://api-colombia.com/api/v1/Region");
  console.log(response);
  return response.json();
};

export const fetchDepartmentById = async (id) => {
  const response = await fetch(
    `https://api-colombia.com/api/v1/Department/${id}`
  );
  return response.json();
};

// Get Count

export const fetchRecordCountPresidents = async () => {
  try {
    const data = await fetchPresidents();
    console.log("Datos de presidentes:", data);
    return data.length;
  } catch (error) {
    console.error(
      "Error obteniendo el total de registros de presidentes:",
      error
    );
    return 0;
  }
};

export const fetchRecordCountAirports = async () => {
  try {
    const data = await fetchAirports();
    return data.length;
  } catch (error) {
    console.error(
      "Error obteniendo el total de registros de presidentes:",
      error
    );
    return 0;
  }
};

export const fetchRecordCountAttractions = async () => {
  try {
    const data = await fetchTouristicAttraction();
    return data.length;
  } catch (error) {
    console.error(
      "Error obteniendo el total de registros de presidentes:",
      error
    );
    return 0;
  }
};
