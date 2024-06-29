// Selecting DOM elements
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

// Event listener for closing the form section
closeButton.addEventListener("click", event => {
   formSection.style.display = "none"; // Hide the form section on close button click
});

// Event listener for displaying the form section
addBtn.addEventListener("click", event => {
   formSection.style.display = "flex"; // Display the form section on add button click
});

// Initial library of books
const myLibrary = [
   { title: "Eat that frog", author: "Brian Tracy", pages: "220", read: "Yes" },
   { title: "Spiritual Growth", author: "Chris Onayinka", pages: "20", read: "Yes" },
];

// Book constructor function
function Book(author, title, numberOfPage, read) {
   this.author = author;
   this.title = title;
   this.pages = numberOfPage;
   this.read = read;
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, read) {
   if (title === "" || author === "" || pages === "") {
      return; // Exit function if any required fields are empty
   }
   myLibrary.push(new Book(author, title, pages, read)); // Add new book to the library array
}

// Function to render all books in the library to the table
function joinNodes() {
   tableBody.innerHTML = ''; // Clear existing rows in the table

   myLibrary.forEach((book, index) => {
      // Create table cells for each book attribute
      const tdForSN = document.createElement("td");
      const tdForTitle = document.createElement("td");
      const tdForPage = document.createElement("td");
      const tdForAuthor = document.createElement("td");
      const tdForRead = document.createElement("td");
      const tableRow = document.createElement("tr");
      const tdForButton = document.createElement("td");
      const buttonForDeleteBook = document.createElement("button");
      const tdForReadComplete = document.createElement("td");

      // Assign index to the read status cell for reference
      tdForRead.dataset.index = index;

      // Create a switch toggle for read status
      const label = document.createElement("label");
      label.className = "switch";
   
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "toggleSwitch";
      input.dataset.index = index;
   
      const span = document.createElement("span");
      span.className = "slider round";
   
      // Append elements for the toggle switch
      label.appendChild(input);
      label.appendChild(span);
      tdForReadComplete.appendChild(label);

      // Populate table cells with book information
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
      
      // Set initial checked state for the toggle switch based on read status
      if (tdForRead.textContent == "Yes") {
         input.checked = true;
      } else if (tdForRead.textContent == "No") {
         input.checked = false;
      }

      // Append table cells to the table row and then to the table body
      tableRow.append(tdForSN, tdForAuthor, tdForTitle, tdForPage, tdForRead, tdForReadComplete, tdForButton);
      tableBody.append(tableRow);
   });
}

// Function to display all books when the page loads
function displayBook() {
   joinNodes();
}

// Event listener for adding a new book on form submission
submitBtn.addEventListener("click", event => {
   event.preventDefault(); // Prevent form submission from reloading the page

   // Get the selected read value from the form
   const readValueInput = document.querySelector('input[name="book-read"]:checked');
   if (readValueInput) {
      // Add new book to the library with form input values
      addBookToLibrary(bookTitleInput.value, authorNameInput.value, bookPageInput.value, readValueInput.value);
   }
   
   displayBook(); // Update the displayed books in the table
   
   form.reset(); // Clear the form fields after submission
});

// Event listener for handling book deletion from the table
tableBody.addEventListener('click', event => {
   if (event.target && event.target.matches('button[data-btn-id]')) {
      const btnId = event.target.dataset.btnId;
      myLibrary.splice(btnId, 1); // Remove book from library array
      displayBook(); // Update the displayed books in the table
   }
});

// Event listener for toggling read status using the toggle switches
tableBody.addEventListener('change', event => {
   if (event.target && event.target.matches("input.toggleSwitch")) {
      const index = event.target.dataset.index;
      const tdForRead = tableBody.querySelector(`td[data-index="${index}"]`);
      myLibrary[index].read = event.target.checked ? "Yes" : "No"; // Update book read status in the library
      tdForRead.textContent = myLibrary[index].read; // Update displayed read status in the table
   }
});

// Display all books when the page initially loads
window.addEventListener('load', displayBook);
