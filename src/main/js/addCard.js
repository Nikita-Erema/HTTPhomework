import { hideModalWindow, createTicket } from "./function.js";
import { closeAll, questionAdd, questionEdit, questionRemove } from "./script.js";
import { addCardServer } from "./serverRequest.js";
const addCard = document.querySelector('.add_ticket');
const formAdd = document.querySelector('.add_ticket_form');
export const date = new Date()
export const actualDelete = {
    target: null
};

addCard.addEventListener('click', (e) => {
    const text = (number) => {
        return formAdd.children[number].children[0].value
    }
    if (text(0).trim() == '' || text(1).trim() == '') return;
    
    let result = (createTicket(text(0)));

    addCardServer({
        description: text(1),
        name: text(0),
        status: false,
    }, result);
    
    closeAll();
});