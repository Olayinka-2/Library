interface Book {
   title: string | null;
   author: string | null;
   genre: string | null;
   page: string | null;
}

class BookRecord<T> {
   constructor(public Books: T[]) {}
   addBookToRecord(book: T): void {
      this.Books.push(book);
   }
}

class TemplateDisplay extends BookRecord<Book> {
   
   private templateElement: HTMLTemplateElement;
   protected templateContainer: HTMLFormElement;
   protected hostElement: HTMLDivElement;
   private AddBookButton: HTMLButtonElement;

   constructor() {
      super([]);
      this.AddBookButton = this.getElement<HTMLButtonElement>('.addBtn');

      this.templateElement = this.getElement<HTMLTemplateElement>('#book-input');
      this.hostElement = this.getElement<HTMLDivElement>('#My-Modal');

      // Clone the template content
      const importedNode = document.importNode(this.templateElement.content, true);
      this.templateContainer = importedNode.querySelector('.template-container')! as HTMLFormElement;

      // Append to DOM
      this.AddBookButton.addEventListener('click', () => {
         this.hostElement.style.display = 'block';
         this.hostElement.appendChild(this.templateContainer);
      });

      document.body.addEventListener('click', (event) => {
         if (event.target === this.hostElement) {
            this.hostElement.style.display = 'none';
         }
      });
   }

   
         protected getElement<T extends Element>(selector: string, parent: Document | HTMLElement = document): T {
            const element = parent.querySelector(selector) 
               if(!element) {
                  throw new Error(`Element not found: ${selector}`);
               }
               return element as T;
            }
}

class BookPreview extends TemplateDisplay {
   public inputs: Record<string, HTMLInputElement>;
   public outputs: Record<string, HTMLElement>;

   constructor() {
      super();

      this.inputs = {
         title: this.getElement<HTMLInputElement>('#Title', this.templateContainer),
         author: this.getElement<HTMLInputElement>('#Author', this.templateContainer),
         genre: this.getElement<HTMLInputElement>('#genre', this.templateContainer),
         page: this.getElement<HTMLInputElement>('#Page-count', this.templateContainer),
      };

      this.outputs = {
         title: this.getElement<HTMLElement>('.book-title', this.templateContainer),
         author: this.getElement<HTMLElement>('.book-author', this.templateContainer),   
         genre: this.getElement<HTMLElement>('.book-genre', this.templateContainer),
         page: this.getElement<HTMLElement>('.book-page', this.templateContainer),
      };

      this.setpInputListeners();

      this.getElement<HTMLFormElement>("form", this.templateContainer).addEventListener('submit', (event) => {
         const form = this.templateContainer.querySelector("form")!;
         if(!form.checkValidity()) {
                  return
               }
            event.preventDefault();
               const bookList = new BookList(this);
               if(this.Books.find((e) => e.title === bookList.BookData.title)) {
                  console.log('Book already exist');
                  form.reset();
                  return
               }

               
               this.hostElement.style.display = 'none';
               
               bookList.showBookList();
               this.Books.push(bookList.BookData);
               console.log(this.Books)
               form.reset();
      })
   }

   private setpInputListeners() {
      for(const key in this.inputs) {
         this.inputs[key].addEventListener('input', () => {
            const value = this.inputs[key].value || this.getDefaultValue(key);
            this.outputs[key].textContent = value;
         });
      }
   }

   private getDefaultValue(key: string): string {
      const defaults: Record<string, string> = {
         title: 'The wizard of OZ',
         author: 'L. Frank Baum',
         genre: 'Fantasy',
         page: '0',
   }
   return defaults[key] || '';
}

}

new BookPreview();

class BookList {
   constructor(private bookPreview: BookPreview) {
   }

   get BookData() {
      return {
         title: this.bookPreview.outputs.title.textContent,
         author: this.bookPreview.outputs.author.textContent,
         genre: this.bookPreview.outputs.genre.textContent,
         page: this.bookPreview.outputs.page.textContent,
      };
   }

   showBookList() {
      const outputTableData = this.BookData;
      const tableBody = document.querySelector('#book-list') as HTMLTableSectionElement;
      if(this.bookPreview.Books.length === 0) { 
         tableBody.innerHTML = ''; // Clear the table if no books
      }
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
         <td>
                     <div class="book-name-item">
                        <i class="material-icons">book</i>
                        <p>${outputTableData.title}</p>
                     </div>
                  </td>
                  <td>${outputTableData.author}</td>
                  <td>${outputTableData.genre}</td>
                  <td><span>
                     Available
                  </span></td>
      `;

      if(tableBody) {   
      tableBody.appendChild(newRow);
      }
   }
}
