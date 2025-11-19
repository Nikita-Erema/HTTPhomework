import { hideModalWindow } from "./function.js";
import { actualDelete } from "./addCard.js";
import { reloadPage, deleteTicket, editTicket } from "./serverRequest.js";
export const addTicketBtn = document.querySelector('.add_tiket_btn');
export const questionEdit = document.querySelector('.question_edit_card');
export const questionRemove = document.querySelector('.question_delete_card');
export const questionAdd = document.querySelector('.question_add_card');

addTicketBtn.addEventListener('click', () => {
    hideModalWindow(questionRemove, questionEdit);

    questionAdd.classList.toggle('close');
})

document.querySelectorAll('.close_module').forEach((e) => {
    e.addEventListener('click', () => {
        closeAll();
    })
})

export function closeAll() {
    questionAdd.classList.add('close');
    questionAdd.children[0].children[0].children[0].value = '' 
    questionAdd.children[0].children[1].children[0].value = '' 
    questionEdit.classList.add('close');
    questionEdit.children[0].children[0].value = '' 
    questionEdit.children[1].children[0].value = '' 
    questionRemove.classList.add('close');
}

document.querySelector('.delete_ticket').addEventListener('click', () => {
    closeAll();
    deleteTicket(actualDelete.target.getAttribute('id'), actualDelete.target)
});

document.querySelector('.edit_ticket').addEventListener('click', () => {
    if (questionEdit.children[0].children[0].value.trim() == '' || questionEdit.children[1].children[0].value.trim() == '') { return; }
    
    if ((editTicket(actualDelete.target.getAttribute('id'), questionEdit.children[0].children[0].value, questionEdit.children[1].children[0].value, actualDelete.target.children[0].checked))) {
        actualDelete.target.querySelector('.name_card').textContent = questionEdit.children[0].children[0].value;
        actualDelete.target.querySelector('.description').textContent = questionEdit.children[1].children[0].value;
    }

    closeAll();
})

document.addEventListener('DOMContentLoaded', reloadPage);