// 1. Tabla con cuadrados y cubos
let numero = prompt("Ingresa un número: ");
    for (let i = 1; i <= numero; i ++) {
        document.write(i + "," + (i * i) + "," + (i * i * i), "<br>");
    }
// 2. Suma de dos números aleatorios
const n1 = Math.round(Math.random() * 10);
const n2 = Math.round(Math.random() * 10);
const sum = n1 + n2;

const start = new Date ();
let ans = prompt("Resultado de: " + n1 + " + " + n2);
const finish = new Date();

const time = (finish - start) / 1000;
    
if (ans == sum) {
    document.write("<br> Correcto!", "<br>");
}
    
else { 
    document.write("<br> Incorrecto :(", "<br>");
}
    
document.write("Tiempo en segundos: ", time, "<br>");



// 3. Regresa cantidad de zeros, positivos y negativos en un arreglo
function counter (arr){
    let positive = 0;
    let negative = 0;
    let zero = 0;

    arr.forEach(element => {
        if (element > 0) positive++;
        if (element < 0) negative++;
        if (element == 0) zero++;
    });

    document.write("<br> El arreglo es: " + arr, "<br>");
    document.write("Números positivos: " + positive, "<br>");
    document.write("Números negativos: " + negative, "<br>");
    document.write("Ceros: " + zero, "<br>");
    
}
const arr1 =[-3, -2, -1, 0, 1, 2, 3];
counter(arr1);

// 4. Promedio de subarreglos
function promedio(matrix) {
    document.write("<br> Los promedios de los subarreglos son: ", "<br>");
    matrix.forEach(fila => {
        let sum = 0;
        let lenght = 0;
        fila.forEach(element => {
            sum = sum + element;
            lenght++;
        })
        let promedio = sum / lenght;
        document.write(promedio, "<br>");
    })
}

const matrix = [[1,2,3,4],[1,1,1,1],[5,6,7,0]];
promedio(matrix);

// 5. Regresa el inverso de un número.
function inverse(n) {
    const numString = n.toString();
    let arr = numString.split("");
    let inverso = arr.reverse();
    let finalNum = inverso.join("");

    document.write("<br> El número original es: " + n);
    document.write("<br> El número inverso es: " + finalNum);
}
 inverse(39274);