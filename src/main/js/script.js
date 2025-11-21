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
    questionAdd.querySelector('.name_text').value = '' 
    questionAdd.querySelector('.description_text').value = '' 
    questionEdit.querySelector('.name_text').value = '' 
    questionEdit.querySelector('.description_text').value = '' 
    questionAdd.classList.add('close');
    questionEdit.classList.add('close');
    questionRemove.classList.add('close');
}

document.querySelector('.delete_ticket').addEventListener('click', () => {
    closeAll();
    deleteTicket(actualDelete.target.getAttribute('id'), actualDelete.target)
});

document.querySelector('.edit_ticket').addEventListener('click', () => {
    if (questionEdit.querySelector('.name_text').value.trim() == '') { return; }
    
    if ((editTicket(actualDelete.target.getAttribute('id'), questionEdit.querySelector('.name_text').value, questionEdit.querySelector('.description_text').value, actualDelete.target.children[0].checked))) {
        actualDelete.target.querySelector('.name_card').textContent = questionEdit.querySelector('.name_text').value;
        actualDelete.target.querySelector('.description').textContent = questionEdit.querySelector('.description_text').value;
    }

    closeAll();
})

document.addEventListener('DOMContentLoaded', reloadPage);