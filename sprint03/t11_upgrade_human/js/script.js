class Human {
    constructor(firstName, lastName, gender, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.calories = 200;
        this.eatingMessages = [];
        this.message = '';
        this.isSuperhero = false;
        this.hungerInterval = null;
        this.render();
        this.startHunger();
        this.getHungryAfter5Seconds();
    }

    sleepFor() {
        let seconds = parseInt(
            prompt('How many seconds do you want to sleep?')
        );
        if (isNaN(seconds) || seconds <= 0) {
            alert('Enter a valid number of seconds.');
            return;
        }

        this.setMessage(`I'm sleeping for ${seconds} seconds...`);
        this.showActionImage('assets/images/sleep.jpg', seconds * 1000);

        setTimeout(() => {
            this.setMessage("I'm awake now after waking up");
        }, seconds * 1000);
    }

    feed() {
        if (this.calories > 500) {
            this.setMessage("I'm not hungry");
        } else {
            let id = Date.now();
            this.eatingMessages.push({
                id,
                text: 'Nom nom nom while eating...',
            });
            this.updateDisplay();
            this.showActionImage('assets/images/feed.jpg', 10000);

            setTimeout(() => {
                this.calories += 200;
                this.eatingMessages = this.eatingMessages.filter(
                    (msg) => msg.id !== id
                );
                this.updateDisplay();

                if (this.calories < 500) {
                    this.setMessage("I'm still hungry");
                } else {
                    this.setMessage(`Calories: ${this.calories}`);
                }
            }, 10000);
        }
    }

    startHunger() {
        if (this.hungerInterval) return;
        this.hungerInterval = setInterval(() => {
            if (this.isSuperhero) return;

            if (this.calories > 0) {
                this.calories = Math.max(0, this.calories - 200);
                this.setMessage(`Losing calories... Current: ${this.calories}`);
                this.updateDisplay();
            }
        }, 60000);
    }

    stopHunger() {
        if (this.hungerInterval) {
            clearInterval(this.hungerInterval);
            this.hungerInterval = null;
        }
    }

    getHungryAfter5Seconds() {
        setTimeout(() => {
            if (!this.isSuperhero) {
                this.setMessage("I'm getting hungry...");
            }
        }, 5000);
    }

    setMessage(message) {
        this.message = message;
        this.updateDisplay();
    }

    showActionImage(imageSrc, duration) {
        let actionImage = document.getElementById('action-image');
        actionImage.src = imageSrc;
        actionImage.style.display = 'block';

        setTimeout(() => {
            actionImage.style.display = 'none';
        }, duration);
    }

    updateDisplay() {
        let eatingMessagesHTML = this.eatingMessages
            .map((msg) => `<p>${msg.text}</p>`)
            .join('');

        document.getElementById('character-image').src = this.isSuperhero
            ? 'assets/images/hero.jpg'
            : 'assets/images/human.jpg';

        document.getElementById('character-display').innerHTML = `
            <p>${this.isSuperhero ? 'Superhero' : 'Human'}: ${this.firstName} ${
            this.lastName
        }</p>
            <p>Gender: ${this.gender}</p>
            <p>Age: ${this.age}</p>
            <p>Calories: ${this.calories}</p>
            ${eatingMessagesHTML}
            <p><strong>${this.message}</strong></p>
        `;

        document.getElementById('fly-button').style.display = this.isSuperhero
            ? 'inline-block'
            : 'none';
        document.getElementById('fight-button').style.display = this.isSuperhero
            ? 'inline-block'
            : 'none';
        document.getElementById('sleep-button').style.display = this.isSuperhero
            ? 'none'
            : 'inline-block';
        document.getElementById('feed-button').style.display = this.isSuperhero
            ? 'none'
            : 'inline-block';
        document.getElementById('turn-button').style.display = this.isSuperhero
            ? 'none'
            : 'inline-block';
    }

    render() {
        this.updateDisplay();
    }
}

class Superhero extends Human {
    constructor(firstName, lastName, gender, age) {
        super(firstName, lastName, gender, age);
        this.isSuperhero = true;
        this.setMessage('I am now a superhero!');
        this.stopHunger();
        this.updateDisplay();
    }

    fly() {
        this.setMessage("I'm flying for 10 seconds!");
        this.showActionImage(
            'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnpqZndoYmZ4eThjMmJzeWxpaXZ4Nm1jam12YTI3YjhucGxvdDFqZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6DECq1l3QJ6EKN0f2g/giphy.gif',
            10000
        );
        setTimeout(() => this.setMessage('Landed safely!'), 10000);
    }

    fightWithEvil() {
        this.setMessage('Khhh-chh... Bang-g-g-g. Evil is defeated!');
        this.showActionImage(
            'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnl3NTF1dWw1czgwcjd2MGkxZWc3cnVvOWxyMzMya2l6eDhoamQ2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/scRKVAaYYATE5Jsv5n/giphy.gif',
            5000
        );
    }
}

function turnIntoSuperhero() {
    if (human.calories > 500) {
        human.stopHunger();
        human = new Superhero(
            human.firstName,
            human.lastName,
            human.gender,
            human.age
        );
        human.updateDisplay();
    } else {
        human.setMessage('Not enough calories to transform!');
    }
}

let human = new Human('Sasha', 'Lopata', 'Female', 17);
