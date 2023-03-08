const filesystem = require("fs");
const http = require('http');
const server = http.createServer( (request, response) => {
    
    console.log(request.url);

    if (request.url === "/") {
        response.setHeader('Content-Type', 'text/html');
        response.write('<!DOCTYPE html>');
        response.write('<html>');
        response.write('<head><meta charset="utf-8"></head><body>');
        response.write('<title>Laboratorio 10</title>');
        response.write('<h2>Opciones</h2>')
        response.write('<a href ="/a">A</a><br>');
        response.write('<a href ="/b">B</a><br>');
        response.write('<a href ="/c">C</a><br>');
    }

    else if (request.url === "/a" && request.method === "GET"){
        response.setHeader('Content-Type', 'text/html');
        response.write('<!DOCTYPE html>');
        response.write('<html>');
        response.write('<head><meta charset="utf-8"></head><body>');
        response.write('<title>A</title>');
        response.write('<h2 style="color: blue;">Elegiste A</h2>');
    }

    else if (request.url === "/b" && request.method === "GET"){
        response.setHeader('Content-Type', 'text/html');
        response.write('<!DOCTYPE html>');
        response.write('<html>');
        response.write('<head><meta charset="utf-8"></head><body>');
        response.write('<title>B</title>');
        response.write('<h2 style="color: blue;">Elegiste B</h2>');
    }

    else if (request.url === "/c" && request.method === "GET"){
        response.setHeader('Content-Type', 'text/html');
        response.write('<!DOCTYPE html>');
        response.write('<html>');
        response.write('<head><meta charset="utf-8"></head><body>');
        response.write('<title>C</title>');
        response.write('<h2 style="color: blue;">Elegiste C</h2>');
    }

    else if (request.url === "/aboutme" && request.method == "GET") {
        response.setHeader("Content-Type", "text/html");
        response.write("<!DOCTYPE html>"); 
        response.write("<html>"); 
        response.write('<head><meta charset="utf-8"></head><body>');
        response.write("<h1>Hola</h1>");
        response.write('<form action="/aboutme" method="POST">');

        let form = `
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre"><br>
        <label for="matricula">Matrícula</label>
        <input type="text" id="matricula" name="matricula"><br>
        <input type="submit" value="Submit">
            `;

        response.write(form);
        response.write("</form>");
        response.write("</body></html>");
        response.end();
    }
    else if (request.url === "/aboutme" && request.method == "POST") {
        const datos = [];
        request.on("data", (dato) => {
            datos.push(dato);
        });

        return request.on("end", () => {
            const datos_completos = Buffer.concat(datos).toString();
            console.log(datos_completos);
            response.setHeader("Content-Type", "text/html");
            response.write("<!DOCTYPE html>"); 
            response.write("<html>");
            response.write('<head><meta charset="utf-8"></head><body>');
            response.write("<h1>Gracias por darme tus datos</h1>");

            let respuesta = "<ul>";

            const nombre = datos_completos.split("=")[1].split("&")[0]; 
            const matricula = datos_completos.split("=")[2].split("&")[0];

            respuesta += "<li>Nombre: " + nombre + "</li>";
            respuesta += "<li>Numero: " + matricula + "</li>"; 

            respuesta += "</ul><br><br>";

            response.write(respuesta);
            response.write("</body></html>"); 

            filesystem.appendFile("datos.txt", respuesta, function (err) {
                if (err) throw err;
                console.log("Ya te robé tus datos!"); 
            });
            response.end(); 
        });
    }

    else {
        response.statusCode = 404;
        response.setHeader("Content-Type", "text/html");
        response.write("<!DOCTYPE html>");
        response.write("<html>");
        response.write('<head><meta charset="utf-8"></head><body>');
        response.write("<h1>Game over</h1>");
        response.write("</body></html>");
        response.end();
    }
});

server.listen(3000);