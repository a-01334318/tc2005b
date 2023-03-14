const db = require('../util/database');

const contacts = [
{
    name: 'Erik',
    id: 'a01334318',
}
];

module.exports = class Contact {
    constructor(newContact) {
        this.name = newContact.name || 'Anonymous';
        this.id = newContact.id || 'a0'
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(
            `INSERT INTO contacts(name, enrollment_id) 
            VALUES(?, ?)`,
            [this.name, this.id]
        );   
    }
    
    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM contacts');;
    }

    //Este método servirá para devolver un objeto con id específico. 
    static fetchOne(id) {
        return db.execute(
            `SELECT * FROM contacts WHERE id = ?`, [id]
        );
    }
}

