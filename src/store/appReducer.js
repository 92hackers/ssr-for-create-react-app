/**
 * App Reducer
 */

import axios from 'axios'

const initialState = {
  message: null,
  data: null,
};

export const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return { ...state, message: action.message }

    case 'SET_MESSAGE_ASYNC':
      return { ...state, data: action.data }

    default:
      return state;
  }
}

export const setMessage = messageText => ({
  type: 'SET_MESSAGE',
  message: messageText,
})

export const setMessageAsync = () => dispatch => {
  const url = 'http://pypi.doubanio.com/'

  console.log('Request async data from remote api')

  axios.get(url)
    .then((data) => {
      console.log('response: ', data)

      dispatch({
        type: 'SET_MESSAGE_ASYNC',
        data,
      })
    })
    .catch((e) => {
      console.error(e)
    })
    .finally(() => {
      console.log('request finished')
    })
}
