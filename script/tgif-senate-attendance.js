import { senateData } from "./senate.mjs";

// Obtener los datos de los miembros del senado
const members = senateData.results[0].members;
const defMembers = [...members].sort((a, b) => a.missed_votes - b.missed_votes);
const defMembersUp = defMembers.slice(-10).sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct);
const defMembersDown = defMembers.slice(0, 10);

buildTable(members);

function buildTable(membersArr) {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = "";

  const parties = {
    R: "Republican",
    D: "Democrat",
    ID: "Independent"
  };

  // Construir filas de la tabla para cada partido
  const partyRows = Object.entries(parties).map(([partyCode, partyName]) => {
    const partyMembers = membersArr.filter(member => member.party === partyCode);
    const partyVotes = partyMembers.map(member => member.votes_with_party_pct);
    const partyAverageVotes = partyVotes.reduce((a, c) => a + c, 0) / partyMembers.length;
    return [partyName, partyMembers.length, partyAverageVotes];
  });

  // Insertar filas en el tbody de la tabla
  partyRows.forEach(([partyName, partyCount, partyAverageVotes]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${partyName}</td>
      <td>${partyCount}</td>
      <td>${partyAverageVotes.toFixed(2)}%</td>
    `;
    tbody.appendChild(row);
  });
}

buildTable1(defMembersUp);

function buildTable1(membersArr) {
  const tbody1 = document.getElementById('tbody1');
  tbody1.innerHTML = "";

  // Construir filas de la tabla para los miembros con mayor porcentaje de votos a favor del partido
  membersArr.forEach(member => {
    const row = document.createElement("tr");
    const link = document.createElement("a");
    link.textContent = `${member.first_name} ${member.middle_name || ""} ${member.last_name}`;
    link.setAttribute("href", member.url);
    row.innerHTML = `
      <td>${link.outerHTML}</td>
      <td>${member.missed_votes}</td>
      <td>${member.missed_votes_pct}</td>
    `;
    tbody1.appendChild(row);
  });
}

buildTable2(defMembersDown);

function buildTable2(membersArr) {
  const tbody2 = document.getElementById('tbody2');
  tbody2.innerHTML = "";

  // Construir filas de la tabla para los miembros con menor porcentaje de votos a favor del partido
  membersArr.forEach(member => {
    const row = document.createElement("tr");
    const link = document.createElement("a");
    link.textContent = `${member.first_name} ${member.middle_name || ""} ${member.last_name}`;
    link.setAttribute("href", member.url);
    row.innerHTML = `
      <td>${link.outerHTML}</td>
      <td>${member.missed_votes}</td>
      <td>${member.missed_votes_pct}</td>
    `;
    tbody2.appendChild(row);
  });
}
