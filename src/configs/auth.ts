export default {
    meEndpoint: '/auth/me/v2',
    loginEndpoint: '/auth/login/v2',
    loginSilentEndpoint: '/auth/login/silent',
    registerEndpoint: '/jwt/register',
    storageTokenKeyName: 'accessToken',
    onTokenExpiration: 'refreshToken' // logout | refreshToken
}
