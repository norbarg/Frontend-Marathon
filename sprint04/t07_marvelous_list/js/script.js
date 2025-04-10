const movies = {
    seven: {
        title: 'Se7en',
        year: '1995',
        description:
            'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives. The grim atmosphere, suspenseful storytelling, and shocking twists make this film an unforgettable crime thriller.',
        actors: 'Brad Pitt, Morgan Freeman, Kevin Spacey',
        poster: 'assets/images/seven.jpg',
        header: 'assets/images/seven-header.jpg',
        bgClass: 'seven-bg',
    },
    prisoners: {
        title: 'Prisoners',
        year: '2013',
        description:
            'When two young girls go missing, a desperate father takes matters into his own hands. As Detective Loki investigates, secrets unravel, leading to a nerve-wracking and emotional thriller about justice and morality.',
        actors: 'Hugh Jackman, Jake Gyllenhaal, Viola Davis',
        poster: 'assets/images/prisoners.jpg',
        header: 'assets/images/prisoners-header.jpg',
        bgClass: 'prisoners-bg',
    },
    cuckoo: {
        title: "One Flew Over the Cuckoo's Nest",
        year: '1975',
        description:
            'A rebellious convict fakes insanity to escape prison labor, landing in a mental institution where he clashes with the tyrannical Nurse Ratched. A powerful exploration of freedom, oppression, and human resilience.',
        actors: 'Jack Nicholson, Louise Fletcher, William Redfield',
        poster: 'assets/images/cuckoo.jpg',
        header: 'assets/images/cuckoo-header.jpg',
        bgClass: 'cuckoo-bg',
    },
};

document.querySelectorAll('.movie-list li').forEach((item) => {
    item.addEventListener('click', () => {
        const movieKey = item.getAttribute('data-movie');
        const movie = movies[movieKey];

        document.getElementById('movie-title').textContent = movie.title;
        document.getElementById('movie-year').textContent = movie.year;
        document.getElementById('movie-description').textContent =
            movie.description;
        document.getElementById('movie-actors').textContent = movie.actors;
        document.getElementById('movie-poster').src = movie.poster;
        document.getElementById('header-image').src = movie.header;

        document.body.className = movie.bgClass;

        document
            .querySelectorAll('.movie-list li')
            .forEach((li) => li.classList.remove('active'));
        item.classList.add('active');
    });
});
