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

function addBookToLibrary() {
   myLibrary.push(new Book("Robert Kiyosaki", "Rich Dad Poor Dad", "295 Pages"));
}

function joinNodes() {
   addBookToLibrary();
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

displayBook();