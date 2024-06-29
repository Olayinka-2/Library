const authorNameInput = document.querySelector("#author-name");
const bookTitleInput = document.querySelector("#book-title");
const bookPageInput = document.querySelector("#book-page");
const submitBtn = document.querySelector("#submit");
const table = document.querySelector("table");
const tableBody = document.querySelector("tbody");
const form = document.querySelector("form");
const formSection = document.querySelector(".form-section");
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
   { title: "Spiritual Growth", author: "Chris Onayinka", pages: "20", read: "Yes" },
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
      const buttonForDeleteBook = document.createElement("button");
      const tdForReadComplete = document.createElement("td");

      tdForRead.dataset.index = index;

      // Create the elements
      const label = document.createElement("label");
      label.className = "switch";
   
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "toggleSwitch";
      input.dataset.index = index;
   
      const span = document.createElement("span");
      span.className = "slider round";
   
      // Append the elements
      label.appendChild(input);
      label.appendChild(span);
   
      // Append the label to the container div
      tdForReadComplete.appendChild(label);

      tdForSN.textContent = index + 1;

      buttonForDeleteBook.dataset.btnId = index;
      buttonForDeleteBook.textContent = "Delete Book";

      tdForButton.append(buttonForDeleteBook);

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
      
      if (tdForRead.textContent == "Yes") {
         input.checked = true;
      } else if (tdForRead.textContent == "No") {
         input.checked = false;
      }
      tableRow.append(tdForSN, tdForAuthor, tdForTitle, tdForPage, tdForRead, tdForReadComplete, tdForButton);
      tableBody.append(tableRow);
   });
}

function displayBook() {
   joinNodes();
}

submitBtn.addEventListener("click", event => {
   event.preventDefault(); 

   const readValueInput = document.querySelector('input[name="book-read"]:checked');
   if (readValueInput) {
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

tableBody.addEventListener('change', event => {
   if (event.target && event.target.matches("input.toggleSwitch")) {
      const index = event.target.dataset.index;
      const tdForRead = tableBody.querySelector(`td[data-index="${index}"]`);
      myLibrary[index].read = event.target.checked ? "Yes" : "No";
      tdForRead.textContent = myLibrary[index].read;
   }
});
