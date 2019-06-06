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
  const url = 'https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty'

  console.log('Requesting async data from remote api')

  axios.get(url)
    .then((data) => {
      dispatch({
        type: 'SET_MESSAGE_ASYNC',
        data: data.data,
      })
    })
    .catch((e) => {
      console.error(e)
    })
    .finally(() => {
      console.log('request finished')
    })
}
