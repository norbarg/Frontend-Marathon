let animal = prompt('What animal is the superhero most similar to?');
if (!/^[a-zA-Z]{1,20}$/.test(animal)) {
    alert('Name must contain letters only, be one word and <=20');
} else {
    let gender = prompt(
        ' Is the superhero male or female? Leave blank if unknown or other.'
    );
    if (!/^(male|female)$/i.test(gender) && gender) {
        alert('Gender must be male, female, or blank.');
    } else {
        let age = prompt('How old is the superhero?');
        if (!/^[1-9]\d{0,4}$/.test(age)) {
            alert('Age must contain numbers only, cannot start with 0 and <=5');
        } else {
            let description;
            switch (gender) {
                case '':
                    description = age >= 18 ? 'hero' : 'kid';
                    break;
                case 'male':
                    description = age >= 18 ? 'man' : 'boy';
                    break;
                case 'female':
                    description = age >= 18 ? 'woman' : 'girl';
                    break;
            }
            alert('The superhero name is: ' + animal + '-' + description + '!');
        }
    }
}
