import youtuber from '../modules/youtuber';
export default function ytAPI() {
    const API_KEY = 'AIzaSyBKy16ms61TM-3TDR8__iSYEwKcwGrSzEU';
    const CLIENT_ID = '364729478546-rh8auatgl0s0d0cegm5h8umd5g2ubak2.apps.googleusercontent.com';
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
        const logo = document.querySelector('.main-logo');
        const trends = document.querySelector('#yt_trend');
        const like = document.querySelector('#like');
        const subscriptions = document.querySelector('#subscriptions');
        const searchForm = document.querySelector('.search-form');

        function request(options) {
            gapi.client.youtube[options.method]
                .list(options)
                .then(response => response.result.items)
                .then(data => options.method === 'subscriptions' ? renderSub(data) : render(data)) //If method == subscriptions then start another method renderSub(data)
                .catch(err => console.log('Error: ' + err));
        }

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

        function renderSub(data) {
            console.log(data);

            const ytWrapper = document.querySelector('#yt-wrapper');
            ytWrapper.textContent = '';
            data.forEach(item => {
                console.log('sub');
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
            ytWrapper.querySelectorAll('.yt').forEach(item => {
                item.addEventListener('click', () => {
                    request({
                        method: 'search',
                        part: 'snippet',
                        channelId: item.dataset.youtuber,
                        order: 'date',
                        maxResults: 12,
                    });
                });
            });

        };

        //Showing chosen channel videos
        logo.addEventListener('click', () => {
            request({
                method: 'search',
                part: 'snippet',
                channelId: 'UC0C-w0YjGpqDXGB8IHb662A',
                order: 'date',
                maxResults: 12,
            });
        });


        //Showing trends
        trends.addEventListener('click', () => {
            request({
                method: 'videos',
                part: 'snippet',
                chart: 'mostPopular',
                maxResults: 12,
                regionCode: 'US',

            });
        });

        //Showing liked videos
        like.addEventListener('click', () => {
            request({
                method: 'playlistItems',
                part: 'snippet',
                playlistId: 'LL_VtimcBd8pAWrmsclIvpvQ',
                maxResults: 12,


            });
        });

        //Showing subscribes
        subscriptions.addEventListener('click', () => {
            request({
                method: 'subscriptions',
                part: 'snippet',
                mine: 'true',
                maxResults: 12,


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
                maxResults: 8,
                q: valueInput,
            });
            searchForm.elements[0].value = '';
        });
    }
}