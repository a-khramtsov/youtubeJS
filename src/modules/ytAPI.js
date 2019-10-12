import auth from '../modules/auth';
import youtuber from '../modules/youtuber';
import requests from './requests';

export default function ytAPI() {     
    auth();
    requests();    
}