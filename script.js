
let authorName = document.querySelector("#author-name");
let bookTitle = document.querySelector("#book-title");
let bookPage = document.querySelector("#book-page");
let submitBtn = document.querySelector("#submit");
let table = document.getElementsByTagName("table");
let tableBody = document.querySelector("tbody");


const myLibrary = [
   {title:"Eat that frog", author:"Brian Tracy", pages:"220"},
   {title:"Spiritual Growth", author:"Chris Onayinka", pages:"20"},
   
];


function Book(author, title, numberOfPage) {
   this.author = author,
   this.title = title,
   this.pages = numberOfPage
}

function addBookToLibrary(title, author, pages) {
   if(title == "" || author == "" || pages == "") {
      return;
   }
   myLibrary.push(new Book(author, title, pages));
   return;
}



function joinNodes() {
   for(let i = 0; i < myLibrary.length; i++) {
      const trForSN = document.createElement("td");
      const trForTitle = document.createElement("td");
      const trForPage = document.createElement("td");
      const trForAuthor = document.createElement("td");
      const tableRow = document.createElement("tr");
      trForSN.textContent = i + 1;
      for(let props in myLibrary[i]) {
         switch(props){
            case "title":
               trForTitle.textContent = myLibrary[i][props];
               break;
            case "author":
               trForAuthor.textContent = myLibrary[i][props];
               break;
            case "pages":
               trForPage.textContent = myLibrary[i][props];
               break;
         }
      }
      tableRow.append(trForSN,trForAuthor,trForTitle, trForPage);
      tableBody.append(tableRow);
   }
}

function displayBook() {

   joinNodes();
}

submitBtn.addEventListener("click", event => {
   // event.preventDefault(); 
   tableBody.innerHTML = "";
   addBookToLibrary(authorName.value, bookTitle.value, bookPage.value);
   displayBook();
   
   authorName.value = '';
   bookTitle.value = '';
   bookPage.value = '';
});

window.addEventListener('load', displayBook);
