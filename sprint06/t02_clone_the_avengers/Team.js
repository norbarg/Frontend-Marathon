class Team {
    constructor(id, avengers) {
        this.id = id;
        this.avengers = avengers;
    }

    clone() {
        return new Team(
            this.id,
            this.avengers.map((a) => a.clone())
        );
    }

    battle({ damage }) {
        this.avengers = this.avengers
            .map((avenger) => {
                avenger.hp -= damage;
                return avenger;
            })
            .filter((avenger) => avenger.hp > 0);
    }

    calculateLosses(clonedTeam) {
        const originalCount = clonedTeam.avengers.length;
        const currentCount = this.avengers.length;
        const losses = originalCount - currentCount;

        if (losses === 0) {
            console.log("We haven't lost anyone in this battle!");
        } else {
            console.log(
                `In this battle we lost ${losses} Avenger${
                    losses > 1 ? 's' : ''
                }.`
            );
        }
    }
}

module.exports = { Team };
