let box = document.querySelector(".box");
let container = document.querySelector(".container");
import { getData, getSingleData } from "./service.js";

// local
const saveState = (key, data) => {
  const value = JSON.stringify(data);
  localStorage.setItem(key, value);
};

const getState = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};
// ////

const renderLocalData = () => {
  const data = getState("product");
  if(data != []){
    container.innerHTML = data.map(
      (item) => `<div>
      <img src="${item.url}" alt="img" />
      <button data-id = "${item.id}" >Delete </button>
    </div>`
    ).join("");
  }
  
};

container.addEventListener("click", (e) => {
  if(e.target.dataset.id){
    const data = getState("product");
      data.filter((value) => value.id !== e.target.dataset.id)
      saveState("product", data)
        renderLocalData("product")
    
  }
  console.log(e.target.dataset.id);
})


const render = async () => {
  const data = await getData();
  box.innerHTML = data.map(
    (item) => `
    <div>
      <img width="400" src="${item.url}" alt="img" />
      <h2>${item.title}</h2>
      <button data-id="${item.id}">add</button>
    </div>
  `
  ).join("");
};

render();

box.addEventListener("click", async (e) => {
  if (e.target.dataset.id) {
    const data = await getSingleData(e.target.dataset.id);
    const oldData = getState("product");
    const el = oldData.find((item) => item.id == e.target.dataset.id);
    if (!el) {
      saveState("product", [...oldData, data]);
      renderLocalData();
    }
  }
});

renderLocalData();

