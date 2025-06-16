"use strict";
class TemplateDisplay {
    constructor() {
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
        this.getElement("form", this.templateContainer).addEventListener('submit', (event) => {
            if (!this.templateContainer.querySelector("form").checkValidity()) {
                return;
            }
            event.preventDefault();
            this.hostElement.style.display = 'none';
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
            bookTitle: this.getElement('.book-title', this.templateContainer),
            bookAuthor: this.getElement('.book-author', this.templateContainer),
            bookGenre: this.getElement('.book-genre', this.templateContainer),
            bookPageCount: this.getElement('.book-page', this.templateContainer),
        };
        this.setpInputListeners();
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
