export default class Game {



    constructor(nbrRec, timePush) {
        this._nbrPush = 1;
        this._nbrRec = nbrRec;
        this._timePush = timePush;
    }

    addSec() {
        this._nbrPush ++;
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

    creacteSec() {
        const result = []
        for(let i = 0; i < this.nbrPush; i++){
            result.push(Math.floor(Math.random() * this._nbrRec) + 1)
        }
        this._current = result
        return result
    }

    testInput(input){
        return this._current.shift() === input;
    }

    nextStep() {
        return this._current.length === 0
    }

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

