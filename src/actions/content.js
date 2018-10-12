import { postToRedux, getToRedux, payload } from './'

// A GET request to the host specified in 'actions/index.js'
// This function returns a function which looks like:
//
// type => data => dispatch => { .. }
const getRequest = getToRedux('/api')('LOCAL_CONTENT_ERROR')

const postRequest = postToRedux('/api/content')('LOCAL_CONTENT_ERROR')

// All of these functions below this point return a function when called. The
// returning function looks like:
//
// dispatch => { .. }

export const search = query => getRequest('SEARCH_QUERY')(`/search?q=${query}`)
export const getUser = user_id => (dispatch, getState) => {
  const { content } = getState()
  if (!content.users.find(({ id }) => id === user_id)) {
    return getRequest('GET_USER')(`/user/${user_id}`)(dispatch)
  }
}
export const getCategory = cat_id => (dispatch, getState) => {
  const { content } = getState()
  if (!content.categories.find(({ id }) => id === cat_id)) {
    return getRequest('GET_CATEGORY')(`/category/${cat_id}`)(dispatch)
  }
}
export const getAllCategories = _ => getRequest('GET_ALL_CATEGORIES')(`/categories`)
export const getThread = thr_id => (dispatch, getState) => {
  const { content } = getState()
  if (!content.threads.find(({ id }) => id === thr_id)) {
    getRequest('GET_THREAD')(`/thread/${thr_id}`)(dispatch)
  }
}
export const getAllThreads = _ => getRequest('GET_ALL_THREADS')(`/threads`)
export const getThreadsInCategory = cat_id => getRequest('GET_THREADS_IN_CATEGORY')(`/category/${cat_id}/threads`)
export const getComment = cmd_id => getRequest('GET_COMMENT')(`/comment/${cmd_id}`)
export const getAllComments = _ => getRequest('GET_ALL_COMMENTS')(`/comments`)
export const getCommentsInThread = thr_id => getRequest('GET_COMMENTS_IN_THREAD')(`/thread/${thr_id}/comments`)

export const editUser = ({ description, avatar }) =>
  postRequest('EDIT_USER')({ description, avatar })
export const addCategory = ({ title, description }) =>
  postRequest('ADD_CATEGORY')({ title, description })
export const editCategory = ({ id, title, description }) =>
  postRequest('EDIT_CATEGORY')({ id, title, description })
export const addThread = ({ category_id, title, description }) =>
  postRequest('ADD_THREAD')({ category_id, title, description })
export const editThread = ({ id, title, description }) =>
  postRequest('EDIT_THREAD')({ id, title, description })
export const addComment = ({ thread_id, parent_id, content }) =>
  postRequest('ADD_COMMENT')({ thread_id, parent_id, content })
export const editComment = ({ id, content }) =>
  postRequest('EDIT_COMMENT')({ id, content })

export const acceptError = _ =>
  payload('ACCEPTED_ERROR')()
