import { createTicket } from "./function.js";
import { closeAll, } from "./script.js";
import { addCardServer } from "./serverRequest.js";
const addCard = document.querySelector('.add_ticket');
const formAdd = document.querySelector('.add_ticket_form');
export const actualDelete = {
    target: null
};

addCard.addEventListener('click', (e) => {
    const text = (number) => {
        return formAdd.children[number].children[0].value
    }
    if (text(0).trim() == '') return;
    
    let result = (createTicket(text(0), text(1)));

    addCardServer({
        description: text(1),
        name: text(0),
        status: false,
    }, result);
    
    closeAll();
});