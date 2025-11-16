import { hideModalWindow } from "./function.js";
import { closeAll, questionAdd, questionEdit, questionRemove } from "./script.js";
const addCard = document.querySelector('.add_ticket');
const formAdd = document.querySelector('.add_ticket_form');
const date = new Date()
let countTicket = 0;
export let actualDelete;

addCard.addEventListener('click', (e) => {
    const text = (number) => {
        return formAdd.children[number].children[0].value
    }
    if (text(0).trim() == '' || text(1).trim() == '') return;

    const ticket = document.createElement('div')
    ticket.classList.add('card');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox_card');

    const name = document.createElement('p');
    name.classList.add('name_card');
    name.textContent = text(0);

    const timestamp = document.createElement('p');
    timestamp.textContent = `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`+ " " + `${date.getUTCHours() + 3}:${date.getUTCMinutes()}`
    timestamp.classList.add('timestamp_card');

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit_card', 'btn')
    buttonEdit.textContent = '✎'
    buttonEdit.addEventListener('click', () => {
        hideModalWindow(questionAdd, questionRemove);
    
        questionEdit.classList.toggle('close');
    });

    const buttonRemove = document.createElement('button');
    buttonRemove.classList.add('delete_card', 'btn');
    buttonRemove.textContent = 'x'
    buttonRemove.addEventListener('click', () => {
        hideModalWindow(questionAdd, questionEdit);
        actualDelete = ticket;
        questionRemove.classList.toggle('close');
    });

    ticket.append(checkbox);
    ticket.append(name);
    ticket.append(timestamp);
    ticket.append(buttonEdit);
    ticket.append(buttonRemove);

    document.querySelector('.box_card').append(ticket);
    closeAll();
});