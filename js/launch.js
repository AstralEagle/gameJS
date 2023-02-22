import Plato from "./plato.js"

const tableInput = document.querySelector("#tableItem");
const tabScrore = document.querySelector("#infoGame");
const returnbtn = document.querySelector("#resetItem");

const plato = new Plato(tableInput,tabScrore);
plato.putMenuDifficulty();

returnbtn.addEventListener('click', () => {
    plato.putMenuDifficulty();
})