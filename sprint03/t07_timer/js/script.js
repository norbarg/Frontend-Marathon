class Timer {
    constructor(title, delay, stopCount) {
        this.title = title;
        this.delay = delay;
        this.stopCount = stopCount;
        this.flag = null;
    }
    stop() {
        clearInterval(this.flag);
        console.log(`Timer ${this.title} stopped`);
    }
    tick() {
        console.log(
            `Timer ${this.title} Tick! | cycles left ${--this.stopCount}`
        );
        if (this.stopCount === 0) {
            this.stop();
        }
    }
    start() {
        console.log(
            `Timer ${this.title} started (delay=${this.delay},  stopCount=${this.stopCount})`
        );
        this.flag = setInterval(() => {
            this.tick(), this.delay;
        });
    }
}
function runTimer(id, delay, counter) {
    const timer = new Timer(id, delay, counter);
    timer.start();
}
