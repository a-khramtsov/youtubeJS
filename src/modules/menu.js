export default function menu(){
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