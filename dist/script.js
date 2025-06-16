"use strict";
class TemplateDisplay {
    constructor() {
        this.AddBookButton = document.querySelector('.addBtn');
        this.templateElement = document.querySelector('#book-input');
        this.hostElement = document.querySelector('#My-Modal');
        // Clone the template content
        const importedNode = document.importNode(this.templateElement.content, true);
        this.templateContainer = importedNode.querySelector('.template-container');
        // Append to DOM
        this.AddBookButton.addEventListener('click', (event) => {
            this.hostElement.style.display = 'block';
            this.hostElement.appendChild(this.templateContainer);
        });
        this.templateContainer.querySelector("form").addEventListener('submit', (event) => {
            if (!this.templateContainer.querySelector("form").checkValidity()) {
                return;
            }
            event.preventDefault();
            this.hostElement.style.display = 'none';
        });
    }
}
class BookPreview extends TemplateDisplay {
    constructor() {
        super();
        this.formElement = this.templateContainer.querySelector('form');
        this.bookTitleElement = this.templateContainer.querySelector('.book-title');
        this.bookAuthorElement = this.templateContainer.querySelector('.book-author');
        this.bookGenreElement = this.templateContainer.querySelector('.book-genre');
        this.bookPageCountElement = this.templateContainer.querySelector('.book-page');
        // get the input elements
        this.bookTitle = this.formElement.querySelector('#Title');
        this.bookAuthor = this.formElement.querySelector('#Author');
        this.bookGenre = this.formElement.querySelector('#genre');
        this.bookPageCount = this.formElement.querySelector('#Page-count');
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
