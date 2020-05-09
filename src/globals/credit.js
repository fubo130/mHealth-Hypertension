
class Credit {
    constructor() {
        this.totalCredits = 10000;
        this.achieve1 = false;
        this.achieve2 = false;
        this.achieve3 = false;
    }


    reduceCredit(c) {
        let temp = this.totalCredits;

        // if (temp - c >= 0) {
            this.totalCredits = this.totalCredits - c;
        // }
    }

    addCredit(c) {
        this.totalCredits = this.totalCredits + c;
    }

    getTotalCredit() {
        return this.totalCredits;
    }

    completeAch1() {
        this.achieve1 = true;
    }

    completeAch2() {
        this.achieve2 = true;
    }
    completeAch3() {
        this.achieve3 = true;
    }

}

export default Credit;