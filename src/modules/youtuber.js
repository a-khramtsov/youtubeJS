export default function youtuber() {
    const youtuberItems = document.querySelectorAll('[data-youtuber]');
    const youTuberModal = document.querySelector('.youTuberModal');
    const youtuberContainer = document.querySelector('#youtuberContainer');

    //Possible sizes of userScreen
    const qualityWidth = [3840, 2560, 1920, 1290, 854, 640, 426, 256];
    const qualityHight = [2160, 1440, 1080, 720, 480, 360, 240, 144];

    const sizeVideo = () => {
        //Getting userScreen size
        let windowWidth = document.documentElement.clientWidth;
        let windowHight = document.documentElement.clientHeight;

        //Сompare of all possible sizes and making appropriate iframe and youtubeContainer width/height. 
        //Also making youtuberContainer location
        for (let i = 0; i < qualityWidth.length; i++) {
            if (windowWidth > qualityWidth[i]) {
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

    //Opening selected video
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

    //Clickng not on video = closing modal window with video
    youTuberModal.addEventListener('click', () => {
        youTuberModal.style.display = '';
        youtuberContainer.textContent = '';
        window.removeEventListener('resize', sizeVideo);
    });
}