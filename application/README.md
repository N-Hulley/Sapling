# Application

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start expo


## Setup
You will need to create a config.js file in the root directory, in there add
```js
export const apiUrl = "";
export const api = {
    userValidation: `${apiUrl}/userValidation/validate`,
    firstInsert: `${apiUrl}/userValidation/firstInsert`,
    goalCompleted: `${apiUrl}/userValidation/goalCompleted`,
}


```
