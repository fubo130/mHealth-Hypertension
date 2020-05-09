
class Progress {

    constructor() {

        this.learningProgress = 0;
        this.compP1 = false;
        this.compP2 = false;
        this.compP3 = false;
        this.compP4 = false;
    }

    incrementProgress() {
        this.learningProgress = this.learningProgress + 25;
    }

    getProgress() {
        return this.learningProgress;
    }

    completePart1() {
        this.compP1 = true;
    }
    completePart2() {
        this.compP2 = true;
    }
    completePart3() {
        this.compP3 = true;
    }
    completePart4() {
        this.compP4 = true;
    }
}

export default Progress;