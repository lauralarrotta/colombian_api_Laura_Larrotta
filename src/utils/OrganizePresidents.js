export const groupPresidentsByParty = (presidents) => {
  const partyGroups = presidents.reduce((acc, president) => {
    const party = president.politicalParty || "Unknown";
    if (!acc[party]) {
      acc[party] = [];
    }
    acc[party].push(president);
    return acc;
  }, {});

  const groupedData = Object.keys(partyGroups).map((party) => ({
    party,
    members: partyGroups[party],
    count: partyGroups[party].length,
  }));

  groupedData.sort((a, b) => b.count - a.count);

  return groupedData;
};
