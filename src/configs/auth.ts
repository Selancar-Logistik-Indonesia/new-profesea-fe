export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/auth/login',
  loginSilentEndpoint: '/auth/login/silent',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
