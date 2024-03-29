import * as actions from './actionTypes';

export const getUrlAuthTwitch = (params) => ({
  type: actions.GET_URL_AUTH_TWITCH,
  params
});

export const setUrlAuthTwitch = (url) => ({
    type: actions.SET_URL_AUTH_TWITCH,
    url:url
});

export const authCodeTwitch = (code) => ({
    type: actions.AUTH_CODE_TWITCH,
    params:{code:code}
});


export const setLoading = (loading) => ({
    type: actions.SET_LOADING_LOGIN,
    loading:loading
});

export const setResponse = (response) => ({
    type: actions.SET_RESPONSE_LOGIN,
    response:response
});

export const setStatus = (status) => ({
    type: actions.SET_STATUS_LOGIN,
    status:status
});

export const setError = (errors) => ({
    type: actions.SET_ERROR_LOGIN,
    errors:errors
});