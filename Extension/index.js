let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabSaveBtn = document.getElementById("tabsave-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabSaveBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.removeItem("myLeads");
  myLeads = [];
  render(myLeads);
});

const inputBtn = document.getElementById("input-btn");
inputBtn.addEventListener("click", function () {
  if (inputEl.value !== "") {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    inputEl.placeholder = "";
  } else {
    inputEl.placeholder = "You should write URL here.";
  }
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
          <a target='_blank' href='${leads[i]}'> 
              ${leads[i]} 
          </a>
          <div id="deletethis" class="deletethis" data-index="${i}">X</div>
      </li>
    `;
  }
  ulEl.innerHTML = listItems;

  const deleteBtns = document.getElementsByClassName("deletethis");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      deleteLead(index);
    });
  }
}

function deleteLead(index) {
  myLeads.splice(index, 1);
  localStorage.removeItem("myLeads");
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}
