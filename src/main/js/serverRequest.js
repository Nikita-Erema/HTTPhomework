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
            createTicket(element.name, element.id)
        }
    } else {
        console.log('error')
    }
};

export async function deleteTicket(id, target) {
    let responce = await fetch(`http://localhost:7070/?method=deleteById&id=${id}`)
    if (responce.ok) {
        console.log('DELETED');
        target.remove();
    } else {
        console.log('error');
    }
}
