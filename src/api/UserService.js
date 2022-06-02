import axios from 'axios';

const URL = 'https://dark-lexicon-352002.uc.r.appspot.com/';

async function saveUser(data){
    console.log(data)
    try {
        const response = axios({
            url: `${URL}user/create`,
            method: 'POST',
            data: data,
        })
    } catch (error) {
        console.log(error)
    }
}

export {saveUser}