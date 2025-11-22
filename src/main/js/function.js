import { questionAdd, questionEdit, questionRemove } from "./script.js";
import { actualDelete } from "./addCard.js";
import { editTicket, editQuestion } from "./serverRequest.js";
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
    
    const timestamp = document.createElement('time');
    if (time) {
        const date = new Date(time);
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const h = date.getHours();
        const min = date.getMinutes();
    
        timestamp.textContent = `${d.toString().padStart(2, "0")}.${m.toString().padStart(2, "0")}.${y} ${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
    } else {
        const date = new Date();
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const h = date.getHours();
        const min = date.getMinutes();

        timestamp.textContent = `${d.toString().padStart(2, "0")}.${m.toString().padStart(2, "0")}.${y} ${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
    }
    timestamp.classList.add('timestamp_card');
    
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit_card', 'btn')
    buttonEdit.textContent = '✎'
    buttonEdit.addEventListener('click', async () => {
        hideModalWindow(questionAdd, questionRemove);
        
        actualDelete.target = ticket;
        const text = await editQuestion(actualDelete.target.id);
        console.log()
        questionEdit.querySelector('.name_text').value = text[0];
        questionEdit.querySelector('.description_text').value = text[1]
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
        if (descriptionText.trim() == '') {return;} 
        if (e.target.localName !== 'button' && e.target.localName !== 'input') {
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