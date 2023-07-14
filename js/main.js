// input tags

let title = document.getElementById("title");
let price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

console.log(
  "title ,price ,taxes ,price ,ads ,discount ,total ,count ,category ,submit "
);

// create button
// const btncreate = document.getElementById("btn-create");
// const btnread = document.getElementById("btn-read");
// const btnupdate = document.getElementById("btn-update");
// const btndelete = document.getElementById("btn-delete");

let mood = "create";
//Dummy Variable
let tmp;

//get prouduct of data
function getTotal() {
  if (price.value != null && taxes.value != null && ads.value != null) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.color = "#040";
    // console.log("RESULT DONE")
  } else total.innerHTML = null;
  total.style.color = "#00D100";
}
//create producte

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  // console.log(dataPro);
  clearData();
  displayData();
};

// clear inputs

function clearData() {
  (title.value = null),
    (price.value = null),
    (taxes.value = null),
    (ads.value = null),
    (discount.value = null),
    (total.innerHTML = null),
    (count.value = null),
    (category.value = null);
}

// read product of data
function displayData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
        <th>${i}</th>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        
        <td><button onclick="updateData(${i})" id="update" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete" class="btn btn-outline-danger">Delete</button></td>
        </tr>
        `;
    // console.log(table);
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick="deleteAll()" class="btn btn-danger btn-lg btn-block"> Delete Data All (${dataPro.length}) </button>`;
  } else btnDeleteAll.innerHTML = null;
}
displayData();

// delete product of data
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  displayData();
  console.log("DELETED DONE");
}

function deleteAll() {
  dataPro.splice(0);
  localStorage.clear();
  displayData();
}
// update product of data

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  // to get total when clicked on the UPDATE button
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  //After defining the variable as a generic variable,
  // we will assign (i) to the variable (tmp) so that The (i) is visible to all functions ..etc
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search of data
let searchMood = "title";

function getSearchMood() {}
