import youtuber from '../modules/youtuber';
export default function modalWindow(){
    document.body.insertAdjacentHTML('beforeend', `
    <div class="youTuberModal">
        <div id="youtuberClose">&#215;</div>
        <div id="youtuberContainer"></div>
    </div>
    `);
    youtuber();
}