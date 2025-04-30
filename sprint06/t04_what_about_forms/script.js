document.getElementById('quiz-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const selected = document.querySelector('input[name="answer"]:checked');
    const resultEl = document.getElementById('result');

    if (!selected) {
        resultEl.textContent = 'Please select an answer.';
        return;
    }

    const userAnswer = selected.value;

    const correctAnswer = 'pushed';
    const message =
        userAnswer === correctAnswer
            ? 'Correct!'
            : 'Shame on you! Go and watch Avengers!';

    await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `answer=${encodeURIComponent(userAnswer)}`,
    });

    resultEl.textContent = message;
});
