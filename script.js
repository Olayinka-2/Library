const authorNameInput = document.querySelector("#author-name");
const bookTitleInput = document.querySelector("#book-title");
const bookPageInput = document.querySelector("#book-page");
const submitBtn = document.querySelector("#submit");
const table = document.querySelector("table");
const tableBody = document.querySelector("tbody");
const form = document.querySelector("form");
const formSection = document.querySelector(".form-section")
const closeButton = document.querySelector("#closeButton");
const addBtn = document.querySelector(".addBtn");

closeButton.addEventListener("click", event => {
   formSection.style.display = "none";
});
addBtn.addEventListener("click", event => {
   formSection.style.display = "flex";
});


const myLibrary = [
   { title: "Eat that frog", author: "Brian Tracy", pages: "220", read: "Yes" },
   { title: "Spiritual Growth", author: "Chris Onayinka", pages: "20",read: "Yes" },
];

function Book(author, title, numberOfPage, read) {
   this.author = author;
   this.title = title;
   this.pages = numberOfPage;
   this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
   if (title === "" || author === "" || pages === "") {
      return;
   }
   myLibrary.push(new Book(author, title, pages, read));
}

function joinNodes() {
   tableBody.innerHTML = ''; // Clear existing rows

   myLibrary.forEach((book, index) => {
      const tdForSN = document.createElement("td");
      const tdForTitle = document.createElement("td");
      const tdForPage = document.createElement("td");
      const tdForAuthor = document.createElement("td");
      const tdForRead = document.createElement("td");
      const tableRow = document.createElement("tr");
      const tdForButton = document.createElement("td");
      const button = document.createElement("button");

      tdForSN.textContent = index + 1;

      button.dataset.btnId = index;
      button.textContent = "Delete Book"

      tdForButton.append(button);

      for (let prop in book) {
         switch (prop) {
            case "title":
               tdForTitle.textContent = book[prop];
               break;
            case "author":
               tdForAuthor.textContent = book[prop];
               break;
            case "pages":
               tdForPage.textContent = book[prop];
               break;
            case "read":
               tdForRead.textContent = book[prop];
         }
      }
      tableRow.append(tdForSN, tdForAuthor, tdForTitle, tdForPage, tdForRead, tdForButton);
      tableBody.append(tableRow);
   });
}

function displayBook() {
   joinNodes();
}

submitBtn.addEventListener("click", event => {
   event.preventDefault(); // Prevent form submission

   const readValueInput = document.querySelector('input[name="book-read"]:checked');
   if(readValueInput) {
      addBookToLibrary(bookTitleInput.value, authorNameInput.value, bookPageInput.value, readValueInput.value);
   }
   
   displayBook();
   
   form.reset();
});

window.addEventListener('load', displayBook);

tableBody.addEventListener('click', event => {
   if (event.target && event.target.matches('button[data-btn-id]')) {
      const btnId = event.target.dataset.btnId;
      myLibrary.splice(btnId, 1);
      displayBook();
   }
});