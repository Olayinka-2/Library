let authorName = document.querySelector("#author-name");
let bookTitle = document.querySelector("#book-title");
let bookPage = document.querySelector("#book-page");
let submitBtn = document.querySelector("#submit");
let table = document.getElementsByTagName("table")[0];
let tableBody = document.querySelector("tbody");

const myLibrary = [
   { title: "Eat that frog", author: "Brian Tracy", pages: "220" },
   { title: "Spiritual Growth", author: "Chris Onayinka", pages: "20" },
];

function Book(author, title, numberOfPage) {
   this.author = author;
   this.title = title;
   this.pages = numberOfPage;
}

function addBookToLibrary(title, author, pages) {
   if (title === "" || author === "" || pages === "") {
      return;
   }
   myLibrary.push(new Book(author, title, pages));
}

function joinNodes() {
   tableBody.innerHTML = ''; // Clear existing rows

   myLibrary.forEach((book, index) => {
      const trForSN = document.createElement("td");
      const trForTitle = document.createElement("td");
      const trForPage = document.createElement("td");
      const trForAuthor = document.createElement("td");
      const tableRow = document.createElement("tr");

      trForSN.textContent = index + 1;

      for (let prop in book) {
         switch (prop) {
            case "title":
               trForTitle.textContent = book[prop];
               break;
            case "author":
               trForAuthor.textContent = book[prop];
               break;
            case "pages":
               trForPage.textContent = book[prop];
               break;
         }
      }
      tableRow.append(trForSN, trForAuthor, trForTitle, trForPage);
      tableBody.append(tableRow);
   });
}

function displayBook() {
   joinNodes();
}

submitBtn.addEventListener("click", event => {
   event.preventDefault(); // Prevent form submission
   addBookToLibrary(bookTitle.value, authorName.value, bookPage.value);
   displayBook();
   
   authorName.value = '';
   bookTitle.value = '';
   bookPage.value = '';
});

window.addEventListener('load', displayBook);
