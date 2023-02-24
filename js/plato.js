import Game from "./game.js"


export default class Plato {
    constructor(plato, scrore, body) {
        this._scrore = scrore;
        this._plato = plato;
        this._coordo = [1];
        this._bodyContainer = body;
    }

    // Affiche la selection de difficulter
    putMenuDifficulty() {
        this._bodyContainer.style.color = "white"
        this._plato.innerHTML = "";
        // On recupère un template HTML et on défini un action a chaque bounton du template celon son textContent
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

    // Fonction qui définie les paramètre de la partie celon le niveau de difficulter choisi
    selectDifficulty(difficulty) {
        // Paramètre de base qui sera modifier si la difficulter évolu
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
        this._scrore.innerHTML = `Sequence : 0 / ${this._game.nbrPush}`
        this.putBtn()
        // On lance la sequence
        setTimeout(() => {
            this.launchSequence()
        }, 1500)
    }

    // Affiche les boutons sur le plato
    putBtn() {
        this._plato.innerHTML = "";
        for (let i = 1; i <= this._game.nbrRec; i++) {
            const button = document.createElement('button');
            button.id = `bouton-${i}`;
            button.value = i;
            button.classList.add("inputGame");
            button.addEventListener('click', (e) => {
                this.onBtnClickForGame(e)
            });
            this._plato.append(button);
        }
    }

    // action des bouton lors du clique
    onBtnClickForGame(e) {
        setTimeout(() => {
            e.target.classList.remove("goodChoise")
            e.target.classList.remove("wrongChoise")
        }, 250)
        if (this._game.testInput(parseInt(e.target.value))) {
            new Audio("../asset/sol.wav").play();
            e.target.classList.add("goodChoise")
            this.updatescore()
            if (this._game.nextStep()) {
                this.updateNbrSequence();
            }
        } else {
            new Audio("../asset/la.wav").play();
            e.target.classList.add("wrongChoise")
            this._plato.classList.add("menuWrongResponce")
            setTimeout(() => {
                this._plato.classList.remove("menuWrongResponce")
                this.gameOver()
            }, 1500)
        }
    }

    // Active / desactive les boutons selon la valueur en paramètre
    setEnabledBtn(bool) {
        [].slice.call(this._plato.children).forEach(x => x.disabled = bool)
    }

    // Lancement de la sequence a retenir
    launchSequence() {
        // on va gérer le stockage du score maximum
        if (localStorage.getItem("score") < this._game.nbrPush - 1)
            localStorage.setItem("score", this._game.nbrPush - 1)
        // On créer la sequence et on sauvegarde une copie dans une variable pour afficher sur le plato
        this._coordo = [...this._game.creacteSec()]
        this.setEnabledBtn(true)
        setTimeout(() => {
            this.updatescore()
            this.viewOneSequence()
        }, 1500)
    }

    // Affichage du bouton a retenir
    viewOneSequence() {
        new Audio("../asset/sol.wav").play();
        const inputSelector = this._plato.querySelector(`#bouton-${this._coordo.shift()}`)
        // On donne une class au bouton a retenir
        inputSelector.classList.add("infoSelectedInput");
        // Après un certain temps on retire la class et on verifie si il y a d'autre element a afficher avant le tour du joueur
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

    // Fonction qui augmente le niveau de la partie
    updateNbrSequence() {
        this._game.addSec();
        this._coordo = [...this._game.creacteSec()];
        switch (this._game.nbrPush) {
            case 2:
                this._bodyContainer.style.color = "#B2FF00"
                break;
            case 5:
                this._bodyContainer.style.color = "#FFC100"
                break;
            case 7:
                this._bodyContainer.style.color = "#FF7C00"
                break;
            case 10:
                this._bodyContainer.style.color = "#E20805"
                break;
            case 13:
                this._bodyContainer.style.color = "#000000"
                break;
            default:
                break ;
        }
        this.launchSequence();
    }

    // Fonction qui permet d'afficher le nombre de bouton trouvé sur la sequence
    updatescore() {
        this._scrore.innerHTML = `Sequence : ${this._game.nbrPush - this._game.nbrSec} / ${this._game.nbrPush}`
    }

    // Fonction de game over ( possibiliter de rajouter des action ici (ne sert a rien))
    gameOver() {
        this.putMenuDifficulty()
    }
}
