'use strict';
import keyboard from './modules/keyboard';
import menu from './modules/menu';
import modalWindow from './modules/modalWindow';
import youtuber from './modules/youtuber';
import ytAPI from './modules/ytAPI';


document.addEventListener('DOMContentLoaded', () => { //Working after loading all DOM
    keyboard();
    menu();
    modalWindow();
    youtuber();
    ytAPI();
});