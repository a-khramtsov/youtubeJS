//Authorization(from https://developers.google.com/youtube/v3/docs/channels/list?apix=true)
export default function auth(){
    const API_KEY = 'AIzaSyDtd0XrsYM4si_Hcy7mU1tHg5fjimCab-E';
    const CLIENT_ID = '469696203160-742nuvvdc2gf741o72bftrcj01uebj31.apps.googleusercontent.com';

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