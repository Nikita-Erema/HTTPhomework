import { date } from "./addCard.js";
import { questionAdd, questionEdit, questionRemove } from "./script.js";
import { actualDelete } from "./addCard.js";
import { editTicket } from "./serverRequest.js";
export function hideModalWindow(first, second) {
    first.classList.add('close');
    second.classList.add('close');
};

export function createTicket(nameText, descriptionText, id, status, time) {
    const ticket = document.createElement('div')
    ticket.classList.add('card');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox_card');
    checkbox.addEventListener('click', () => {
        editTicket(id, nameText, descriptionText, checkbox.checked);
    })
    if (status) { checkbox.checked = status};
    
    const name = document.createElement('p');
    name.classList.add('name_card'); 
    name.textContent = nameText;
    
    const timestamp = document.createElement('p');
    if (time) {
        timestamp.textContent = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${(time/31536000000+1970).toFixed(0)}`
    } else {
        timestamp.textContent = `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`+ " " + `${date.getUTCHours() + 3}:${date.getUTCMinutes()}`
    }
    timestamp.classList.add('timestamp_card');
    
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit_card', 'btn')
    buttonEdit.textContent = '✎'
    buttonEdit.addEventListener('click', () => {
        hideModalWindow(questionAdd, questionRemove);
        
        actualDelete.target = ticket;
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

    const boxButton = document.createElement('div');
    boxButton.classList.add('box_button');
    boxButton.append(buttonEdit);
    boxButton.append(buttonRemove);
    
    const description = document.createElement('div');
    description.classList.add('description');
    description.textContent = descriptionText;


    ticket.addEventListener('click', (e) => {
        if (e.target.localName == 'div' || e.target.localName == 'p') {
            description.classList.toggle('description_active')
        }
    });

    ticket.append(checkbox);
    ticket.append(name);
    ticket.append(timestamp);
    ticket.append(boxButton);
    ticket.append(description);

    document.querySelector('.box_card').append(ticket);
    

    if (id) {
        ticket.setAttribute('id', id)
    } else {
        return ticket
    }
}