[![Static Badge](https://img.shields.io/badge/volver-blue?style=for-the-badge)](https://github.com/christian-herrera/curso-react)

<h1>Notas</h1>
<h2>Tabla de contenidos</h2>

- [Funciones de Javascript](#funciones-de-javascript)
  - [Map()](#map)
  - [Find()](#find)

<br><br>


# Funciones de Javascript
## Map()
Permite recorrer ***todos*** los elementos de un array y realizar por cada uno de ellos una operación. Retorna siempre el mismo array pero con las modificaciones hechas en cada item.

La sintaxis básica es:
```js
const numeros = [1, 2, 3, 4];

const cuadrados = numeros.map(num => num * num);

console.log(numeros);   // [1, 2, 3, 4]  -> el array original no se modificó
console.log(cuadrados); // [1, 4, 9, 16]
```

<br><br>

## Find()
find() es un método de los arrays en JavaScript que permite buscar un elemento que cumpla cierta condición.

Devuelve:
- El primer elemento que cumpla la condición.
- Si no existe coincidencia, devuelve `undefined`.

La sintaxis básica es:
```js
const productos = [
  { id: 1, nombre: "USB", precio: 50 },
  { id: 2, nombre: "Mouse", precio: 200 }
];

const existe1 = productos.find(p => p.id === 2); // La busqueda es que el item, tenga `id` = 2
const existe2 = productos.find(p => p.id === 5); // La busqueda es que el item, tenga `id` = 5

console.log(existe1); // => { id: 2, nombre: "Mouse", precio: 200 }
console.log(existe2); // => undefined
```

