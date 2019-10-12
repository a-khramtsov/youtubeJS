import youtuber from '../modules/youtuber';
export default function requests(){
    const logo = document.querySelector('.logo');
    const channelLogo = document.querySelector('.main-logo');
    const main = document.querySelector('#yt_main');
    const trends = document.querySelector('#yt_trend');
    const like = document.querySelector('#yt_like');
    const subscriptions = document.querySelector('#yt_subscriptions');
    const searchForm = document.querySelector('.search-form');

    function request(options) {
        gapi.client.youtube[options.method]
            .list(options)
            .then(response => response.result.items)
            .then(data => options.method === 'subscriptions' ? renderSub(data) : render(data)) //If method == subscriptions then start another method renderSub(data)
            .catch(err => console.log('Error: ' + err));
    }

    //Printing all videos at the page
    function render(data) {
        console.log(data);

        const ytWrapper = document.querySelector('#yt-wrapper');
        ytWrapper.textContent = '';
        data.forEach(item => {
            try {
                const {
                    id,
                    id: {
                        videoId
                    },
                    snippet: {
                        channelTitle,
                        title,
                        resourceId: {
                            videoId: likedVideoId
                        } = {},
                        thumbnails: {
                            high: {
                                url
                            }
                        }
                    }
                } = item;
                //Making innerHTML with appropriate values
                ytWrapper.innerHTML += `
                    <div class="yt" data-youtuber="${likedVideoId || videoId || id}">
                        <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                            <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
                        </div>
                        <div class="yt-title">${title}</div>
                        <div class="yt-channel">${channelTitle}</div>
                    </div>
                `;
            } catch (err) {
                console.error('Error: ' + err);
            }

        });
        youtuber();
    }

    //Printing all subs at the page
    function renderSub(data) {
        console.log(data);

        const ytWrapper = document.querySelector('#yt-wrapper');
        ytWrapper.textContent = '';
        data.forEach(item => {
            try {
                const {
                    snippet: {
                        resourceId: {
                            channelId
                        },
                        description,
                        title,
                        thumbnails: {
                            high: {
                                url
                            }
                        }
                    }
                } = item;
                ytWrapper.innerHTML += `
                    <div class="yt" data-youtuber="${channelId}">
                        <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                            <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
                        </div>
                        <div class="yt-title">${title}</div>
                        <div class="yt-channel">${description}</div>
                    </div>
                `;
            } catch (err) {
                console.error('Error: ' + err);
            }
        });

        //Opening video
        ytWrapper.querySelectorAll('.yt').forEach(item => {
            item.addEventListener('click', () => {
                request({
                    method: 'search',
                    part: 'snippet',
                    channelId: item.dataset.youtuber,
                    order: 'date',
                    maxResults: 24,
                });
            });
        });

    };

    //Function for showing chosen channel(my) videos official YT - UCLXo7UDZvByw2ixzpQCufnA
    function mainPage() {            
        request({
            method: 'search',
            part: 'snippet',
            channelId: 'UCLXo7UDZvByw2ixzpQCufnA',
            order: 'date',
            maxResults: 24,
        });
        
        if (this.className == 'logo') {
            //Adding to main "active" and removing "active" at another variants
            const sideBarMenu = document.querySelectorAll('.sidebarMenu li');
            sideBarMenu[0].classList.add('active');
            sideBarMenu[1].classList.remove('active');
            sideBarMenu[2].classList.remove('active');
            sideBarMenu[3].classList.remove('active');
        }
    }

    
    //Youtube music chnnel  when you press main or yt-logo
    main.addEventListener('click', mainPage);
    logo.addEventListener('click', mainPage);


    //Opening chosen yt channel UC0C-w0YjGpqDXGB8IHb662A - Ed Sheran
    channelLogo.addEventListener('click', () => {
        request({
            method: 'search',
            part: 'snippet',
            channelId: 'UC0C-w0YjGpqDXGB8IHb662A',
            order: 'date',
            maxResults: 24,
        });
    });

    //Showing trends
    trends.addEventListener('click', () => {
        request({
            method: 'videos',
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 24,
            regionCode: 'US',

        });
    });

    //Showing liked videos
    like.addEventListener('click', () => {
        request({
            method: 'playlistItems',
            part: 'snippet',
            playlistId: 'LL_VtimcBd8pAWrmsclIvpvQ',
            maxResults: 24,
        });
    });

    //Showing subscribes
    subscriptions.addEventListener('click', () => {
        request({
            method: 'subscriptions',
            part: 'snippet',
            mine: 'true',
            maxResults: 24,
        });
    });

    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const valueInput = searchForm.elements[0].value;
        if (!valueInput) {
            searchForm.style.border = '1px solid red';
            return;
        }
        searchForm.style.border = '';
        request({
            method: 'search',
            part: 'snippet',
            order: 'relevance',
            maxResults: 24,
            q: valueInput,
        });
        searchForm.elements[0].value = '';
    });
}