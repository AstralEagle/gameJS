import Game from "./game.js"

export default class Plato {
    constructor(plato, scrore) {
        this._scrore = scrore;
        this._plato = plato;
        this._coordo = [1];

    }

    putMenuDifficulty() {
        this._plato.innerHTML = "";
        const template = document.querySelector("#selectDifficulty");
        const menuDiff = template.content.cloneNode(true);
        const buttons = menuDiff.querySelectorAll('button')
        buttons.forEach(x => {
            x.addEventListener("click", (e) => {
                this.selectDifficulty(parseInt(e.target.textContent));
            })
        })
        this._plato.append(menuDiff)
        this._scrore.innerHTML = `Best score : ${localStorage.getItem("score") || 0}`
    }

    selectDifficulty(difficulty) {
        let nbrCase = 4;
        let timeView = 12;
        if (difficulty > 1)
            nbrCase = 8
        if (difficulty > 2)
            timeView = 8
        if (difficulty > 3)
            nbrCase = 12
        if (difficulty > 4)
            nbrCase = 16
        if (difficulty > 5)
            timeView = 2
        this._game = new Game(nbrCase, timeView)
        this.putBtn()
        setTimeout(() => {
            this.launchSequence()
        }, 500)
    }

    putBtn() {
        this._plato.innerHTML = "";
        let colorBtn = 1
        for (let i = 1; i <= this._game.nbrRec; i++) {
            const button = document.createElement('button');
            button.id = `bouton-${i}`;
            button.value = i;
            button.classList.add("inputGame");
            button.addEventListener('click', (e) => {
                this.onBtnClickForGame(e)
            });
            this._plato.append(button);
            colorBtn === 4 ? colorBtn = 1 : colorBtn++
        }
    }

    onBtnClickForGame(e) {
        setTimeout(() => {
            e.target.classList.remove("goodChoise")
            e.target.classList.remove("wrongChoise")
        }, 250)
        if (this._game.testInput(parseInt(e.target.value))) {
            new Audio("/asset/sol.wav").play();
            e.target.classList.add("goodChoise")
            this.updatescore()
            if (this._game.nextStep()) {
                this._game.addSec();
                this._coordo = [...this._game.creacteSec()];
                this.launchSequence();
            }
        } else {
            new Audio("/asset/la.wav").play();
            e.target.classList.add("wrongChoise")
            setTimeout(() => {
                this.gameOver()
            }, 500)
        }
    }

    setEnabledBtn(bool) {
        [].slice.call(this._plato.children).forEach(x => x.disabled = bool)
    }

    launchSequence() {
        if (localStorage.getItem("score") < this._game.nbrPush - 1)
            localStorage.setItem("score", this._game.nbrPush - 1)
        this._coordo = [...this._game.creacteSec()]
        this.setEnabledBtn(true)
        this.updatescore()
        setTimeout(() => {
            this.viewOneSequence()
        }, 1500)
    }

    viewOneSequence() {
        new Audio("/asset/sol.wav").play();
        const inputSelector = this._plato.querySelector(`#bouton-${this._coordo.shift()}`)
        inputSelector.classList.add("infoSelectedInput");
        setTimeout(() => {
            inputSelector.classList.remove("infoSelectedInput");
            if (this._coordo.length) {
                setTimeout(() => {
                    this.viewOneSequence();
                }, 500)
            } else {
                this.setEnabledBtn(false)
            }
        }, this._game.timePush * 125)
    }

    updatescore() {
        this._scrore.innerHTML = `Sequence : ${this._game.nbrPush - this._game.nbrSec} / ${this._game.nbrPush}`
    }

    gameOver() {
        this.putMenuDifficulty()
    }
}
