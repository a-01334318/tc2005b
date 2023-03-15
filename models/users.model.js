const db = require('../util/database');

module.exports = class User {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(newUser) {
        this.username = newUser.name || 'John Doe';
        this.password = newUser.password || '1234';
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO users (username, password)
            VALUES (?, ?)
        `, [this.username, this.password]);
    }

}