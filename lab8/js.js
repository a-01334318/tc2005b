// Calcula promedio

function calcularPromedio(arreglo) {
    let suma = 0;
    for (let i = 0; i < arreglo.length; i++) {
        suma += arreglo[i];
    }
    const promedio = suma / arreglo.length;
    return promedio;
}

const numeros = [-3, -2, 1, 2, 6];
const promedio = calcularPromedio(numeros);
console.log(promedio); 

// Recibe string y regresa .txt

const fs = require("fs"); 
const http = require("http"); 

function escribirEnArchivo(stringAEscribir, rutaArchivo) {
    fs.writeFile(rutaArchivo, stringAEscribir, function (error) {
        if (error) {
            console.error(`Error al escribir en archivo: ${error}`);
            return;
        }
        console.log(`El archivo ${rutaArchivo} ha sido escrito correctamente.`);
    });
}

const stringAEscribir = "Hello World from node!";
const rutaArchivo = "ejemplo.txt";
escribirEnArchivo(stringAEscribir, rutaArchivo);

// Fibonacci

function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

console.log(fibonacci(6));

// Crear un servidor que devuelve index.html de lab6

const filesystem = require("fs"); 

filesystem.readFile("../lab6/index.html", function (err, html) { 
    if (err) { 
        throw err; 
    }
    const server = http.createServer((request, response) => { 
        console.log(request.url); 
        response.setHeader("Content-Type", "text/html"); 
        response.write(html); 
        response.end(); 
    });
    server.listen(3000); 
});