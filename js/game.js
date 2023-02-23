export default class Game {

    constructor(nbrRec, timePush) {
        // Nombre de bouton a trouver
        this._nbrPush = 1;
        // Nombre de bouton sur le plato
        this._nbrRec = nbrRec;
        // Multiplicateur du temps pour retenir le bouton
        this._timePush = timePush;
    }

    // Fonction qui permet d'ajouter un bouton a prochaine sequence la sequence
    addSec() {
        this._nbrPush ++;
        // Reduit le temps pour retenir les boutons celon le niveau actuel (Impossible d'arriver a 0)
        if(this._nbrPush === 4){
            this._timePush = Math.ceil(this._timePush/2)
        }
        else if(this._nbrPush === 8){
            this._timePush = Math.ceil(this._timePush/2)
        }
        else if(this._nbrPush === 12){
            this._timePush = Math.ceil(this._timePush/2)
        }
    }

    // Fonction qui permet de créer une sequence
    creacteSec() {
        const result = []
        for(let i = 0; i < this.nbrPush; i++){
            result.push(Math.floor(Math.random() * this._nbrRec) + 1)
        }
        this._current = result
        return result
    }

    // Fonction qui permet de verifiersi l'index choisi par l'utilisateur est le bon
    testInput(input){
        return this._current.shift() === input;
    }

    // Fonction qui permet de verifier si la sequence est fini
    nextStep() {
        return this._current.length === 0
    }


    /*
        Getter
     */
    get nbrPush() {
        return this._nbrPush;
    }
    get nbrRec() {
        return this._nbrRec;
    }
    get timePush() {
        return this._timePush;
    }
    get nbrSec() {
        return this._current.length
    }

}

