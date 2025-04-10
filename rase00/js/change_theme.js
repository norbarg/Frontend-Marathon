document.addEventListener('DOMContentLoaded', function () {
    const themeBtn = document.getElementById('change-theme-btn');
    let darkMode = false;

    const images = [
        {
            selector: 'img[alt="face"]',
            light: 'https://kappa.lol/svYA_n',
            dark: 'https://kappa.lol/FmnDzA',
        },
        {
            selector: '.blueEll',
            light: 'https://kappa.lol/C3h46c',
            dark: 'https://kappa.lol/2iDrO_',
        },
        {
            selector: '.greeenEll',
            light: 'https://kappa.lol/Z4SsBb',
            dark: 'https://kappa.lol/6G4fhU',
        },
        {
            selector: '.pinkEll',
            light: 'https://kappa.lol/Ebx0Wg',
            dark: 'https://kappa.lol/lxi_pb',
        },
        {
            selector: '.bluePolyg',
            light: 'https://kappa.lol/3rtzTu',
            dark: 'https://kappa.lol/mha0x9',
        },
        {
            selector: '.blueRect1',
            light: 'https://kappa.lol/CK972m',
            dark: 'https://kappa.lol/LNhww9',
        },
        {
            selector: '.blueRect2',
            light: 'https://kappa.lol/CK972m',
            dark: 'https://kappa.lol/LNhww9',
        },
        {
            selector: '.greenRect',
            light: 'https://kappa.lol/IaM7Vn',
            dark: 'https://kappa.lol/cX_4MN',
        },
        {
            selector: '.yellowPlus',
            light: 'https://kappa.lol/vgcJfe',
            dark: 'https://kappa.lol/VkT00U',
        },
        {
            selector: '.arm1',
            light: 'https://kappa.lol/_ekPOx',
            dark: 'https://kappa.lol/63blX8',
        },
        {
            selector: '.arm2',
            light: 'https://kappa.lol/_ekPOx',
            dark: 'https://kappa.lol/63blX8',
        },
        {
            selector: '.leg1',
            light: 'https://kappa.lol/-lVqH1',
            dark: 'https://kappa.lol/iVZrkl',
        },
        {
            selector: '.leg2',
            light: 'https://kappa.lol/-lVqH1',
            dark: 'https://kappa.lol/iVZrkl',
        },
    ];

    themeBtn.addEventListener('click', () => {
        const existingTheme = document.getElementById('theme-style');

        if (!darkMode) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/evil_theme.css';
            link.id = 'theme-style';
            document.head.appendChild(link);

            images.forEach(({ selector, dark }) => {
                const el = document.querySelector(selector);
                if (el) el.src = dark;
            });
        } else {
            if (existingTheme) {
                existingTheme.remove();
            }

            images.forEach(({ selector, light }) => {
                const el = document.querySelector(selector);
                if (el) el.src = light;
            });
        }

        darkMode = !darkMode;
    });
});
