import axios from 'axios'

export const APIInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const api_key = 'b72f01423c617f99db15bb46a8285ccb'