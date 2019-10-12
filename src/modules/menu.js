export default function menu(){
    const burger = document.querySelector('.spinner');
    const sideBarMenu = document.querySelector('.sidebarMenu');

    //pressing burger - menu wrap
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        sideBarMenu.classList.toggle('rollUp');
    });

    //Click at any variant in menu - this - lighting, another variants - lighting off
    sideBarMenu.addEventListener('click', (event) => {
        
        let target = event.target.closest('li');

        if (target) {
            sideBarMenu.querySelectorAll('li').forEach((elem) => {                
                if (target === elem) {
                    elem.classList.add('active')
                } else {
                    elem.classList.remove('active')
                }
            });
        }
    });
}