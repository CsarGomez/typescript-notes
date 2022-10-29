// advanced types - Type casting
const userInputElement = document.getElementById('user-input');

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi There';
}

// decorators - building useful decorators
function withTemplate(template: string, hookId: string) {
  return function (target: any) {
    const hookElement = document.getElementById(hookId);
    const personName = new target();
    console.log(hookElement);
    if (hookElement) {
      hookElement.innerHTML = template;
      hookElement.querySelector('p')!.textContent = personName.name;
    }
  };
}

@withTemplate('<p>My person object<p/>', 'person-name')
class Person {
  name = 'cesar';

  constructor() {
    console.log('creating a person object');
  }
}

const personInstance = new Person();

console.log(personInstance);

// decorators - autobind example
const button = document.querySelector('button')!;

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  const adjustDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustDescriptor;
}
class Printer {
  message = 'this works';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
const prt = new Printer();

button.addEventListener('click', prt.showMessage);

// decorators - validation with decorators
interface ValidatorConfig {
  [property: string]: {
    [validatableProperty: string]: string[]; //['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [...(registeredValidators[target.constructor.name]?.[propertyName] ?? []), 'required'],
  };
}
function PositiveNumber(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [...(registeredValidators[target.constructor.name]?.[propertyName] ?? []), 'positive'],
  };
}
function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}
class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleElement = document.getElementById('formTitle') as HTMLInputElement;
  const priceElement = document.getElementById('formPrice') as HTMLInputElement;

  const title = titleElement.value;
  const price = +priceElement.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert('Invalid input, please try again');
    return;
  }
  console.log(createdCourse);
  courseForm.reset();
});
