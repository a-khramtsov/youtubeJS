export default function keyboard(){
    const keyboardButton = document.querySelector('.search-form__keyboard')
    const keyboard = document.querySelector('.keyboard');
    const closeKeyboard = document.querySelector('#close-keyboard');
    const searchInput = document.querySelector('.search-form__input');

    const toggleKeyboard = () => {
        keyboard.style.top = keyboard.style.top ? '' : '50%'; //Showing keyboard
    };

    const changeLang = (btn, lang) => {
        //Arrays of Ru and En languages
        const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
            'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
            'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
            'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
            'en', ' '
        ];
        const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
            'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
            'ru', ' '
        ];

        if (lang === 'en') {
            btn.forEach((elem, i) => {
                elem.textContent = langEn[i];
            })
        } else {
            btn.forEach((elem, i) => {
                elem.textContent = langRu[i];
            })
        }
    };
    const typing = (event) => {
        const target = event.target;

        if (target.tagName.toLowerCase() === 'button') { //If pressed button 
            const buttons = [...keyboard.querySelectorAll('button')] //Using all buttons with visibility = hidden
                .filter(elem => elem.style.visibility !== 'hidden');

            console.log(buttons);
            const contentButton = target.textContent.trim();
            if (contentButton === '')
                searchInput.value += ' ';
            else if (contentButton === '⬅')
                searchInput.value = searchInput.value.slice(0, -1);
            else if (contentButton === 'en' || contentButton === 'ru') {
                changeLang(buttons, contentButton); //Changing buttons language
            } else
                searchInput.value += contentButton; //Getting button's value
        }
    };

    keyboardButton.addEventListener('click', toggleKeyboard);
    closeKeyboard.addEventListener('click', toggleKeyboard);

    keyboard.addEventListener('click', typing);
}