import { date } from "./addCard.js";
import { questionAdd, questionEdit, questionRemove } from "./script.js";
import { actualDelete } from "./addCard.js";
export function hideModalWindow(first, second) {
    first.classList.add('close');
    second.classList.add('close');
};

export function createTicket(nameText, id) {
    const ticket = document.createElement('div')
    ticket.classList.add('card');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox_card');

    const name = document.createElement('p');
    name.classList.add('name_card');
    name.textContent = nameText;

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

        actualDelete.target = ticket;
        questionRemove.classList.toggle('close');
    });
    ticket.append(checkbox);
    ticket.append(name);
    ticket.append(timestamp);
    ticket.append(buttonEdit);
    ticket.append(buttonRemove);

    document.querySelector('.box_card').append(ticket);
    
    if (id) {
        ticket.setAttribute('id', id)
    } else {
        return ticket
    }

}