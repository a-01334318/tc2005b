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
    static fetch(id) {
        let query = 'SELECT * FROM contacts';
        if (id != 0) {
            query += ' WHERE enrrolment_id = ?';
            return db.execute(query, [id]);
        }
    return db.execute(query);
    }
}

