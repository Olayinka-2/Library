class TemplateDisplay {

   private templateElement: HTMLTemplateElement;
   protected templateContainer: HTMLFormElement;
   protected hostElement: HTMLDivElement;
   private AddBookButton: HTMLButtonElement;

   constructor() {
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

      this.getElement<HTMLFormElement>("form", this.templateContainer).addEventListener('submit', 
            (event) => {
               if(!this.templateContainer.querySelector("form")!.checkValidity()) {
                 return
               }
               event.preventDefault();
               this.hostElement.style.display = 'none';
            }
         )
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
   private inputs: Record<string, HTMLInputElement>;
   private outputs: Record<string, HTMLElement>;

   constructor() {
      super();

      this.inputs = {
         title: this.getElement<HTMLInputElement>('#Title', this.templateContainer),
         author: this.getElement<HTMLInputElement>('#Author', this.templateContainer),
         genre: this.getElement<HTMLInputElement>('#genre', this.templateContainer),
         page: this.getElement<HTMLInputElement>('#Page-count', this.templateContainer),
      };

      this.outputs = {
         bookTitle: this.getElement<HTMLElement>('.book-title', this.templateContainer),
         bookAuthor: this.getElement<HTMLElement>('.book-author', this.templateContainer),   
         bookGenre: this.getElement<HTMLElement>('.book-genre', this.templateContainer),
         bookPageCount: this.getElement<HTMLElement>('.book-page', this.templateContainer),
      };

      this.setpInputListeners();
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