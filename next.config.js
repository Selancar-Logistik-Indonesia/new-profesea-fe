/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const withTM = require('next-transpile-modules')(['@mui/x-charts'])

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = withTM({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.staging.profesea.id',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'apifix.profesea.id',
        port: '',
        pathname: '**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/landingpage-trainer',
        destination: '/trainings',
        permanent: true
      },
      {
        source: '/landingpage-recruiter',
        destination: '/employer',
        permanent: true
      },
      {
        source: '/register/recruiter',
        destination: '/register/employer',
        permanent: true
      }
    ]
  },
  trailingSlash: true,
  reactStrictMode: false,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['id', 'en'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'id',
    localeDetection: false
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
})
