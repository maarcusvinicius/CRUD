const tbody = document.querySelector("tbody");
const sFirst = document.querySelector("#m-first");
const sLast = document.querySelector("#m-last");
const sGender = document.querySelector("#m-gender");
const sAddress = document.querySelector("#m-address");
const sDate = document.querySelector("#m-date");
const btnSalvar = document.querySelector("#btnSalvar");
var exampleModal = document.getElementById("exampleModal");

let itens;
let id;

function openModal(edit = false, index = 0) {
  if (edit) {
    sFirst.value = itens[index].first;
    sLast.value = itens[index].last;
    sGender.value = itens[index].gender;
    sAddress.value = itens[index].address;
    sDate.value = itens[index].date;
    id = index;
  } else {
    sFirst.value = "";
    sLast.value = "";
    sGender.value = "";
    sAddress.value = "";
    sDate.value = "";
  }
}

function editItem(index) {

  openModal(true, index)
  // console.log("edit active");
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.first}</td>
    <td>${item.last}</td>
    <td>${item.gender}</td>
    <td>${item.address}</td>
    <td>${item.date}</td>
    <td class="acao">
      <button onclick="editItem(${index})" type="button"  id="new" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever=""><i class='bx bx-edit'></i>Edit</button>
      <button class="btn btn-danger" onclick="deleteItem(${index})"><i class='bx bx-trash'></i>Delete</button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = (e) => {
  if (sFirst.value == "" || sLast.value == "" || sGender.value == "" || sAddress.value == "" || sDate.value == "" ) {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].first = sFirst.value;
    itens[id].last = sLast.value;
    itens[id].gender = sGender.value;
    itens[id].address = sAddress.value;
    itens[id].date = sDate.value;
  } else {
    itens.push({
      first: sFirst.value,
      last: sLast.value,
      gender: sGender.value,
      address: sAddress.value,
      date: sDate.value,
    });
  }

  setItensBD();

  loadItens();
  id = undefined;
};

var exampleModal = document.getElementById("exampleModal");
exampleModal.addEventListener("show.bs.modal", function (event) {
  var button = event.relatedTarget;

  var recipient = button.getAttribute("data-bs-whatever");

  var modalTitle = exampleModal.querySelector(".modal-title");
  var modalBodyInput = exampleModal.querySelector(".modal-body input");

  modalTitle.textContent = "Add Person ";
  modalBodyInput.value = recipient;
});

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens));

loadItens();