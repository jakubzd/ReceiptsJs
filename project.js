const table = document.getElementById("tableBody");
function onAdd(e) {
    let existingParagons = JSON.parse(localStorage.getItem("allParagons"));
    if (existingParagons == null) {
        existingParagons = [];
    }
    const addForm = document.forms.newParagonForm;
    if (isNaN(addForm.price.value) || addForm.price.value < 0.01) {
        alert("Wprowadź poprawną cenę!");
        return false;
      }
      if (isNaN(addForm.quantity.value) || addForm.quantity.value < 0.000001) {
        alert("Wprowadź poprawną ilość!");
        return false;
      }

    const newParagon = {
        name: addForm.name.value,
        quantity: parseFloat(addForm.quantity.value),
        price: parseFloat(addForm.price.value)
    }

    localStorage.setItem("newParagon", JSON.stringify(newParagon));
    existingParagons.push(newParagon);
    localStorage.setItem("allParagons", JSON.stringify(existingParagons));
    addForm.reset();
    drawTable();
    return false;
}
document.forms.newParagonForm.addEventListener("submit", onAdd);

function onDeleteRow(e) {
    
    let existingParagons = [];
    const deleteForm = document.forms.deleteParagonForm;
    existingParagons = JSON.parse(localStorage.getItem("allParagons"));
    let index = deleteForm.deleteIndex.value;

    if  (!Number.isInteger(parseFloat(index)) || index < 1 || index > existingParagons.length) {
        alert("Wprowadź odpowiedni indeks");
        return false;
    }
    existingParagons.splice(index - 1, 1);
    localStorage.setItem("allParagons", JSON.stringify(existingParagons));
    drawTable();
    deleteForm.reset();
    return false;
} 

document.forms.deleteParagonForm.addEventListener("submit", onDeleteRow);

function drawTable() {
    const total = document.getElementById("suma");
    $("#paragonTable tbody #dataRow").remove();
    let sum = 0;
    let existingParagons = JSON.parse(localStorage.getItem("allParagons"));
    for (let i = 0; i < existingParagons.length; i++) {
        let totalForProduct = (existingParagons[i].price) * (existingParagons[i].quantity);
        sum += totalForProduct;
        let row = 
        `<tr id="dataRow">
            <td id="rowIndex">${i + 1}</td>
            <td>${existingParagons[i].name}</td>
            <td>${existingParagons[i].quantity}</td>
            <td>${existingParagons[i].price.toFixed(2) + "zł"}</td>
            <td>${totalForProduct.toFixed(2) + "zł"}</td>
        </tr>`
        table.innerHTML += row;
    }
    total.innerHTML = sum.toFixed(2) + "zł";
}

function onEdit(e) {
    const editForm = document.forms.editParagonForm;
    const index = parseFloat(editForm.editIndex.value);
    let existingParagons = [];
    existingParagons = JSON.parse(localStorage.getItem("allParagons"));
  
    if (!Number.isInteger(index) || index < 1 || index > existingParagons.length) {
      alert("Wprowadź poprawny indeks!");
      return false;
    }
  
    const newName = editForm.name.value;
    const newQuantity = parseFloat(editForm.quantity.value);
    const newPrice = parseFloat(editForm.price.value);
  
    if (isNaN(newPrice) || newPrice < 0.01) {
      alert("Wprowadź poprawną cenę!");
      return false;
    }
    if (isNaN(newQuantity) || newQuantity < 0.000001) {
      alert("Wprowadź poprawną ilość!");
      return false;
    }
  
    existingParagons[index - 1].name = newName;
    existingParagons[index - 1].quantity = newQuantity;
    existingParagons[index - 1].price = newPrice;
    localStorage.setItem("allParagons", JSON.stringify(existingParagons));
    drawTable();
    editForm.reset();
    return false;
  };

document.forms.editParagonForm.addEventListener("submit", onEdit);

drawTable();