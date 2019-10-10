'use strict';
document.addEventListener('DOMContentLoaded', () => { //Working after loading all DOM
    //Keyboard
    {

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


    //Menu
    {
        const burger = document.querySelector('.spinner');
        const sideBarMenu = document.querySelector('.sidebarMenu');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            sideBarMenu.classList.toggle('rollUp');
        });

        sideBarMenu.addEventListener('click', (event) => {
            let target = event.target.closest('a[href="#"]');

            if (target) {
                const parentTarget = target.parentElement;

                sideBarMenu.querySelectorAll('li').forEach((elem) => {
                    if (parentTarget === elem) {
                        elem.classList.add('active')
                    } else {
                        elem.classList.remove('active')
                    }
                });
            }
        });
    }

    //Modal window
    {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="youTuberModal">
            <div id="youtuberClose">&#215;</div>
            <div id="youtuberContainer"></div>
        </div>
        `);

        const youtuberItems = document.querySelectorAll('[data-youtuber]');
        const youTuberModal = document.querySelector('.youTuberModal');
        const youtuberContainer = document.querySelector('#youtuberContainer');


        const qualityWidth = [3840, 2560, 1920, 1290, 854, 640, 426, 256];
        const qualityHight = [2160, 1440, 1080, 720, 480, 360, 240, 144];

        const sizeVideo = () => {
            let windowWidth = document.documentElement.clientWidth;
            let windowHight = document.documentElement.clientHeight;

            for (let i = 0; i < qualityWidth.length; i++){
                if (windowWidth > qualityWidth[i]){
                    youtuberContainer.querySelector('iframe').style.cssText = `
                        width: ${qualityWidth[i]}px;
                        height: ${qualityHight[i]}px;    
                    `;
                    
                    youtuberContainer.style.cssText = `
                        width: ${qualityWidth[i]}px;
                        height: ${qualityHight[i]}px;  
                        top: ${(windowHight - qualityHight[i]) / 2}px;  
                        left: ${(windowWidth - qualityWidth[i]) / 2}px;  
                    `;
                    break;
                }
            }
        };  

        youtuberItems.forEach(elem => {
            elem.addEventListener('click', () => {
                const idVideo = elem.dataset.youtuber;
                youTuberModal.style.display = 'block';

                const youTuberFrame = document.createElement('iframe');
                youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
                youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);

                window.addEventListener('resize', sizeVideo);

                sizeVideo();
            });
        });


        youTuberModal.addEventListener('click', () => {
            youTuberModal.style.display = '';
            youtuberContainer.textContent = '';
            window.removeEventListener('resize',sizeVideo);
        });
     }

     //youtube API
     {
         
     }






});