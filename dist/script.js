"use strict";
class FormInput {
    constructor() {
        this.templateElement = document.querySelector('#project-input');
        this.hostElement = document.querySelector('.app');
        // Clone the template content
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.querySelector('form');
        // Append to DOM
        if (this.templateElement) {
            this.hostElement.appendChild(this.formElement);
            this.formElement.style.backgroundColor = 'lightblue';
        }
        // Now you can safely query the inputs inside the appended form
        this.titleInputElement = this.formElement.querySelector('#title');
        this.authorInputElement = this.formElement.querySelector('#author');
        this.genreInputElement = this.formElement.querySelector('#genre');
        this.pageCountInputElement = this.formElement.querySelector('#page-count');
    }
}
new FormInput();
