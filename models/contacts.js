const fs = require('fs/promises')
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsPath, "utf-8");
	return JSON.parse(data);
}

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const result = contacts.find(item => item.id === contactId)
	return result || null
}

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		...body,
	}
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
	return newContact
}

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(item => item.id === contactId);
	if (index === -1) {
		return null;
	}
  
	const result = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return result
}


const updateContact = async (contactId, body) => {
    const contacts = await listContacts();

    const contactIndex = contacts.findIndex(item => item.id === contactId);

    if (contactIndex !== -1) {
        const updatedContact = {
            id: contactId,
            ...contacts[contactIndex],
            ...body,
        };

        contacts[contactIndex] = updatedContact;

		console.log(contacts);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return updatedContact;
    }

    return null;
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

