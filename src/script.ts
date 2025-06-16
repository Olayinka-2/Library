class TemplateDisplay {

   templateElement: HTMLTemplateElement;
   templateContainer: HTMLFormElement;
   hostElement: HTMLDivElement;
   AddBookButton: HTMLButtonElement;

   constructor() {
      this.AddBookButton = document.querySelector('.addBtn')! as HTMLButtonElement;

      this.templateElement = document.querySelector('#book-input')! as HTMLTemplateElement;
      this.hostElement = document.querySelector('#My-Modal')! as HTMLDivElement;

      // Clone the template content
      const importedNode = document.importNode(this.templateElement.content, true);
      this.templateContainer = importedNode.querySelector('.template-container')! as HTMLFormElement;

      // Append to DOM
      this.AddBookButton.addEventListener('click', ( event) => {
         this.hostElement.style.display = 'block';
         this.hostElement.appendChild(this.templateContainer);
      });

      this.templateContainer.querySelector("form")!.addEventListener('submit', 
            (event) => {
               if(!this.templateContainer.querySelector("form")!.checkValidity()) {
                 return
               }
               event.preventDefault();
               this.hostElement.style.display = 'none';
            }
         )
}


}

class BookPreview extends TemplateDisplay {
   formElement: HTMLFormElement

   // Inputs
   bookTitle: HTMLInputElement
   bookAuthor: HTMLInputElement;
   bookGenre: HTMLInputElement;
   bookPageCount:HTMLInputElement;

   // HTML Elements
   bookTitleElement: HTMLElement;
   bookAuthorElement: HTMLElement;
   bookGenreElement: HTMLElement;
   bookPageCountElement: HTMLElement;

   constructor() {
      super();
      this.formElement = this.templateContainer.querySelector('form')! as HTMLFormElement;

      this.bookTitleElement = this.templateContainer.querySelector('.book-title')! as HTMLElement;
      this.bookAuthorElement = this.templateContainer.querySelector('.book-author')! as HTMLElement;
      this.bookGenreElement = this.templateContainer.querySelector('.book-genre')! as HTMLElement;
      this.bookPageCountElement = this.templateContainer.querySelector('.book-page')! as HTMLElement;

      // get the input elements
      this.bookTitle= this.formElement.querySelector('#Title')! as HTMLInputElement;
      this.bookAuthor = this.formElement.querySelector('#Author')! as HTMLInputElement;
      this.bookGenre = this.formElement.querySelector('#genre')! as HTMLInputElement;
      this.bookPageCount = this.formElement.querySelector('#Page-count')! as HTMLInputElement;

      console.log(this.bookTitle, this.bookAuthor, this.bookGenre, this.bookPageCount);

      this.updatePreviewData();
   }

   updatePreviewData() {
      this.bookTitle.addEventListener('input', () => {
      this.bookTitleElement.textContent = this.bookTitle.value || 'The wizard of OZ';
      });

      this.bookAuthor.addEventListener('input', () => {
      this.bookAuthorElement.textContent = this.bookAuthor.value;
      });

      this.bookGenre.addEventListener('input', () => {
      this.bookGenreElement.textContent = this.bookGenre.value;
      });

      this.bookPageCount.addEventListener('input', () => {
      this.bookPageCountElement.textContent = this.bookPageCount.value;
      });
   }
}

new BookPreview();