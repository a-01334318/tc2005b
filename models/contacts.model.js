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

    save() {
        contacts.push(this);
    }

    static fetchAll() {
        return contacts;
    }
}

