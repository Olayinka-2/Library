interface FormInputStructure {
   name: string;
   value: string | number;
}

class FormInput {
   titleInputElement: HTMLInputElement;
   authorInputElement: HTMLInputElement;
   genreInputElement: HTMLInputElement;
   pageCountInputElement: HTMLInputElement;

   templateElement: HTMLTemplateElement;
   formElement: HTMLFormElement;
   hostElement: HTMLDivElement;

   constructor() {
  this.templateElement = document.querySelector('#project-input')! as HTMLTemplateElement;
  this.hostElement = document.querySelector('.app')! as HTMLDivElement;

  // Clone the template content
  const importedNode = document.importNode(this.templateElement.content, true);
  this.formElement = importedNode.querySelector('form')! as HTMLFormElement;

  // Append to DOM
  if(this.templateElement) {
   this.hostElement.appendChild(this.formElement);
   this.formElement.style.backgroundColor = 'lightblue';
  }

  // Now you can safely query the inputs inside the appended form
  this.titleInputElement = this.formElement.querySelector('#title') as HTMLInputElement;
  this.authorInputElement = this.formElement.querySelector('#author') as HTMLInputElement;
  this.genreInputElement = this.formElement.querySelector('#genre') as HTMLInputElement;
  this.pageCountInputElement = this.formElement.querySelector('#page-count') as HTMLInputElement;
}


}

new FormInput();