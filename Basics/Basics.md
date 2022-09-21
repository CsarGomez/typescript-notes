# TypeScript

| type    | example          | notes                                                                     |
| ------- | ---------------- | ------------------------------------------------------------------------- |
| number  | 1, 5.3, -10      | all numbers, no difference between integers or floats                     |
| string  | 'Hi', "Hi", `Hi` | all text values                                                           |
| boolean | true, false      | just these two, no "truthy" or "falsy" values                             |
| object  | {age: 30}        | any js object, more specific types (type of object) are possible          |
| array   | [1, 2, 3]        | any js array, type can be flexible or strict (element types)              |
| tuple   | [1, 2]           | added by typescript: fixed-length array                                   |
| enum    | {NEW, OLD}       | added by typescript: automatically enumerated global constant identifiers |
| any     | ' \* '           | any kind of value, no specific type assignment                            |

## assign types

```TS
let first: string;
let age: number;
let isLoading: boolean

// object
let person : {
  first: string;
  age: number;
  hobbies: string[];
} = {
  first: 'cesar',
  age: 37,
  hobbies: ['guitar', 'volleyball']
}

// string array
let hobbies : string []

// enum
emun Role {
  ADMIN, USER, READ_ONLY
}
```

## union types

union is represented with the pipe "|" and can accept any types as needed

```TS
function combine ( input1: number | string, input2: number | string ) {
  let result;
  if(typeof input1 === 'number' && typeof input2 === 'number'){
    result = input1 + input2;
  }else{
    result = input1.toString() + input2.toString();
  }
}

const combineAges = combine(30, 25);
console.log(combineAges);
const combineNames = combine('cesar', 'other name');
console.log(combineNames);
```

## type aliases or custom types
