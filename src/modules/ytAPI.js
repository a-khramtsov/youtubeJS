import youtuber from '../modules/youtuber';
export default function ytAPI() {
    const API_KEY = 'AIzaSyDtd0XrsYM4si_Hcy7mU1tHg5fjimCab-E';
    const CLIENT_ID = '469696203160-742nuvvdc2gf741o72bftrcj01uebj31.apps.googleusercontent.com';
    //Authorization(from https://developers.google.com/youtube/v3/docs/channels/list?apix=true)
    {
        const buttonAuth = document.querySelector('#authorize');
        const authBlock = document.querySelector('.auth');
        //Showing error and closing pop-up
        const errorAuth = err => {
            console.error(err);
            authBlock.style.display = '';
        }
        gapi.load("client:auth2", () => {
            gapi.auth2.init({
                client_id: CLIENT_ID
            });
        });

        const authenticate = () => {
            return gapi.auth2.getAuthInstance()
                .signIn({
                    scope: "https://www.googleapis.com/auth/youtube.readonly"
                })
                .then(() => {
                    console.log("Sign-in successful");
                })
                .catch(errorAuth);
        }

        const loadClient = () => {
            gapi.client.setApiKey(API_KEY);
            return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                .then(() => {
                    console.log("GAPI client loaded for API")
                })
                .then(() => {
                    authBlock.style.display = 'none';
                })
                .catch(errorAuth);
        }

        //Press button and authenticate
        buttonAuth.addEventListener('click', () => {
            authenticate().then(loadClient);
        });
    }

    //request
    {
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

        //Function for showing chosen channel(my) videos official YT -UCBR8-60-B28hp2BmDPdntcQ
        function myPage() {            
            request({
                method: 'search',
                part: 'snippet',
                channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
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
        main.addEventListener('click', myPage);
        logo.addEventListener('click', myPage);


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
}