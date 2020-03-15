function createChips(message, color, timeRemoveChips = 3000) {
    let chips = document.createElement('div');
    chips.classList.add('chips');
    chips.innerHTML += message;
    chips.style.backgroundColor = color;
    addChips(chips);
    setTimeout(() => removeChips(chips), timeRemoveChips);
}

function removeChips(chips) {
    chips.remove();
    let allChips = document.querySelectorAll('.chips-field .chips');
    if (allChips.length == 0) document.querySelector('.chips-field').remove();
}

function addChips(chips) {
    let chipsField = document.querySelector('.chips-field');
    if (chipsField) {
        chipsField.appendChild(chips);
    } else {
        let chipsField = document.createElement('div');
        chipsField.classList.add('chips-field');
        document.querySelector('body').appendChild(chipsField);
        chipsField.appendChild(chips);
    }
}