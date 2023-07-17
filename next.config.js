/**
 * @type {import('next').NextConfig}
 */
require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  env: {
    API_MOVIE_KEY: process.env.API_MOVIE_KEY
  },
  images: {
    domains: ['image.tmdb.org'],
  }
}