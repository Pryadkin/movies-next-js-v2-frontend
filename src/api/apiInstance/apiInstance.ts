import axios from 'axios'

export const APIInstance = axios.create({
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
})