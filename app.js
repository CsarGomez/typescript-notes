"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// advanced types - Type casting
const userInputElement = document.getElementById('user-input');
if (userInputElement) {
    userInputElement.value = 'Hi There';
}
// decorators - building useful decorators
function withTemplate(template, hookId) {
    return function (target) {
        const hookElement = document.getElementById(hookId);
        const personName = new target();
        console.log(hookElement);
        if (hookElement) {
            hookElement.innerHTML = template;
            hookElement.querySelector('p').textContent = personName.name;
        }
    };
}
let Person = class Person {
    constructor() {
        this.name = 'cesar';
        console.log('creating a person object');
    }
};
Person = __decorate([
    withTemplate('<p>My person object<p/>', 'person-name'),
    __metadata("design:paramtypes", [])
], Person);
const personInstance = new Person();
console.log(personInstance);
// decorators - autobind example
const button = document.querySelector('button');
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjustDescriptor = {
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
    constructor() {
        this.message = 'this works';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Printer.prototype, "showMessage", null);
const prt = new Printer();
button.addEventListener('click', prt.showMessage);
const registeredValidators = {};
function Required(target, propertyName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propertyName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propertyName]) !== null && _b !== void 0 ? _b : []), 'required'] });
}
function PositiveNumber(target, propertyName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propertyName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propertyName]) !== null && _b !== void 0 ? _b : []), 'positive'] });
}
function validate(obj) {
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
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    Required,
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber,
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleElement = document.getElementById('formTitle');
    const priceElement = document.getElementById('formPrice');
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
