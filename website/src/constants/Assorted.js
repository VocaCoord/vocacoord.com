export const apiURL =
  process.env.NODE_ENV === 'production'
    ? 'https://temp-vocacoord.herokuapp.com/api'
    : '/api';

export const localStorageKey = 'https://vocacoord.com:state';
