import { createTicket } from "./function.js";
export async function addCardServer(bodyTicket, ticket) {
    let responce = await fetch('http://localhost:7070?method=createTicket', {
        method: 'POST',
        body: JSON.stringify(bodyTicket)
    });

    if (responce.ok) {
        console.log('save ticket on server')
        let parse = await responce.json();
        await ticket.setAttribute('id', parse.id)
    } else {
        console.log('error')
    }
};

export async function reloadPage() {
    let responce = await fetch('http://localhost:7070/?method=allTickets')
    let result = await responce.json();
    if (responce.ok) {
        for (let element of result) {
            createTicket(element.name, element.description, element.id, element.status, element.created)
        }
    } else {
        console.log('error')
    }
};

export async function deleteTicket(id, ticket) {
    let responce = await fetch(`http://localhost:7070/?method=deleteById&id=${id}`)
    if (responce.ok) {
        console.log('DELETED');
        ticket.remove();
    } else {
        console.log('error');
    }
}

export async function editTicket(id, nameText, descriptionText, statusCheckbox) {
    let responce = await fetch(`http://localhost:7070/?method=updateById&id=${id}`, {
        method: 'POST',
        body: JSON.stringify({
            description: descriptionText,
            name: nameText,
            status: statusCheckbox,
        })
    })
    if (responce.ok) {
        console.log('Edited');
        return true
    } else {
        console.log('error');
    }
}