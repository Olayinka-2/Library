"use strict";
class BookRecord {
    constructor(Books) {
        this.Books = Books;
    }
    addBookToRecord(book) {
        this.Books.push(book);
    }
}
class TemplateDisplay extends BookRecord {
    constructor() {
        super([]);
        this.AddBookButton = this.getElement('.addBtn');
        this.templateElement = this.getElement('#book-input');
        this.hostElement = this.getElement('#My-Modal');
        // Clone the template content
        const importedNode = document.importNode(this.templateElement.content, true);
        this.templateContainer = importedNode.querySelector('.template-container');
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
    getElement(selector, parent = document) {
        const element = parent.querySelector(selector);
        if (!element) {
            throw new Error(`Element not found: ${selector}`);
        }
        return element;
    }
}
class BookPreview extends TemplateDisplay {
    constructor() {
        super();
        this.inputs = {
            title: this.getElement('#Title', this.templateContainer),
            author: this.getElement('#Author', this.templateContainer),
            genre: this.getElement('#genre', this.templateContainer),
            page: this.getElement('#Page-count', this.templateContainer),
        };
        this.outputs = {
            title: this.getElement('.book-title', this.templateContainer),
            author: this.getElement('.book-author', this.templateContainer),
            genre: this.getElement('.book-genre', this.templateContainer),
            page: this.getElement('.book-page', this.templateContainer),
        };
        this.setpInputListeners();
        this.getElement("form", this.templateContainer).addEventListener('submit', (event) => {
            const form = this.templateContainer.querySelector("form");
            if (!form.checkValidity()) {
                return;
            }
            event.preventDefault();
            const bookList = new BookList(this);
            if (this.Books.find((e) => e.title === bookList.BookData.title)) {
                console.log('Book already exist');
                form.reset();
                return;
            }
            this.hostElement.style.display = 'none';
            bookList.showBookList();
            this.Books.push(bookList.BookData);
            console.log(this.Books);
            form.reset();
        });
    }
    setpInputListeners() {
        for (const key in this.inputs) {
            this.inputs[key].addEventListener('input', () => {
                const value = this.inputs[key].value || this.getDefaultValue(key);
                this.outputs[key].textContent = value;
            });
        }
    }
    getDefaultValue(key) {
        const defaults = {
            title: 'The wizard of OZ',
            author: 'L. Frank Baum',
            genre: 'Fantasy',
            page: '0',
        };
        return defaults[key] || '';
    }
}
new BookPreview();
class BookList {
    constructor(bookPreview) {
        this.bookPreview = bookPreview;
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
        const tableBody = document.querySelector('#book-list');
        if (this.bookPreview.Books.length === 0) {
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
        if (tableBody) {
            tableBody.appendChild(newRow);
        }
    }
}
