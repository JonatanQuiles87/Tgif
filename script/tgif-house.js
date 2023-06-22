import { houseData } from "./house.mjs";
import { states } from "./states.mjs";
// Obtener los datos de los miembros del senado
let members = houseData.results[0].members;
// Definir los partidos políticos
let parties = {
  D: 'Democrat',
  R: 'Republican',
  ID: 'Independent'
};
// Construir la tabla inicial con todos los miembros
console.log(members);
buildTable(members);
// Obtener referencia al contenedor de los checkboxes
var checkboxContainer = document.getElementById("checkbox-container");
var checkboxes = {};
// Crear dinámicamente los checkboxes para filtrar por partido político
for (var partyCode in parties) {
  var label = document.createElement("label");

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = partyCode;
  checkbox.addEventListener("change", handleCheckboxChange);

  checkboxes[partyCode] = checkbox;

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(parties[partyCode]));
  checkboxContainer.appendChild(label);
}
// Obtener referencia al dropdown de estados
var dropdown = document.getElementById("filterstates");
var allOption = document.createElement("option");
allOption.value = "";
allOption.textContent = "Select a state";
dropdown.appendChild(allOption);
// Llenar el dropdown con los estados
for (var stateCode in states) {
  var option = document.createElement("option");
  option.value = stateCode;
  option.textContent = states[stateCode];
  dropdown.appendChild(option);
}
// Agregar un evento de cambio al dropdown
dropdown.addEventListener("change", handleDropdownChange);
// Función para manejar el cambio en los checkboxes
function handleCheckboxChange() {
  // Obtener los partidos políticos seleccionados
  var selectedParties = Object.keys(checkboxes).filter(partyCode => checkboxes[partyCode].checked);

  // Filtrar los miembros por partido político seleccionado
  var filteredMembers = members.filter(member => selectedParties.includes(member.party));

  // Filtrar el middlearray por estado seleccionado si no se ha seleccionado "Select a state"
  var selectedState = dropdown.value;
  if (selectedState !== "") {
    filteredMembers = filteredMembers.filter(member => member.state === selectedState);
  }

  // Construir la tabla con los miembros filtrados
  buildTable(filteredMembers);
}
// Función para manejar el cambio en el dropdown
function handleDropdownChange() {
  var selectedState = dropdown.value;

  if (selectedState === "") {
    // Si se selecciona "Select a state", mostrar todos los miembros
    buildTable(members);
  } else {
    // Filtrar los miembros por el estado seleccionado
    var filteredMembers = members.filter(member => member.state === selectedState);

    // Construir la tabla con los miembros filtrados
    buildTable(filteredMembers);
  }
}
// Función para construir la tabla de miembros
function buildTable(membersArr) {
  var tbody = document.getElementById('tbody');
  tbody.innerHTML = "";
  // Iterar sobre los miembros y construir las filas de la tabla
  for (let i = 0; i < membersArr.length; i++) {
    var row = document.createElement("tr");
    var link = document.createElement("a");
    link.textContent = membersArr[i].first_name + " " + (membersArr[i].middle_name || "") + " " + membersArr[i].last_name;
    link.setAttribute("href", membersArr[i].url);
    row.insertCell().append(link);
    row.insertCell().innerHTML = membersArr[i].party;
    row.insertCell().innerHTML = membersArr[i].state;
    row.insertCell().innerHTML = membersArr[i].seniority;
    row.insertCell().innerHTML = membersArr[i].votes_with_party_pct;
    tbody.append(row);
  }
}
