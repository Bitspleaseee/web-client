import { postJson, getJson, payload } from './'

const getRequest = s => getJson('/api' + s)
const postRequest = postJson('/api/content')

const requestError = payload('CONTENT_REQUEST_ERROR')

//
// SEARCH
//

export const search = query => dispatch => {
  dispatch(payload('SEARCH_PENDING'))
  getJson(`/search?q=${query}`)()
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

//
//  USER
//

export const getUser = id => dispatch => {
  dispatch(payload('GET_USER_PENDING')())
  getRequest(`/user/${id}`)
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const editUser = (description, avatar) => dispatch => {
  dispatch(payload('EDIT_USER_PENDING')())
  postRequest(payload('EDIT_USER')({ description, avatar }))
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

//
//  CATEGORIES
//

export const addCategory = (title, description) => dispatch => {
  dispatch(payload('ADD_CATEGORY_PENDING')())
  postRequest(payload('ADD_CATEGORY')({ title, description }))
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const editCategory = (id, title, description) => dispatch => {
  dispatch(payload('EDIT_CATEGORY_PENDING')())
  postRequest(payload('EDIT_CATEGORY')({ id, title, description }))
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const getCategory = id => dispatch => {
  dispatch(payload('GET_CATEGORY_PENDING')())
  getRequest(`/category/${id}`)
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const getAllCategories = _ => dispatch => {
  dispatch(payload('GET_ALL_CATEGORIES_PENDING')())
  getRequest(`/categories`)
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

//
// THREADS
//

export const addThread = (categoryId, userId, title, description) => dispatch => {
  dispatch(payload('ADD_THREAD_PENDING')())
  postRequest(payload('ADD_THREAD')({ categoryId, userId, title, description }))
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const editThread = (id, title, description) => dispatch => {
  dispatch(payload('EDIT_THREAD_PENDING')())
  postRequest(payload('EDIT_THREAD')({ id, title, description }))
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const getThread = id => dispatch => {
  dispatch(payload('GET_THREAD_PENDING')())
  getRequest(`/thread/${id}`)
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const getAllThreads = _ => dispatch => {
  dispatch(payload('GET_ALL_THREADS_PENDING')())
  getRequest(`/threads`)
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const getThreadsOfCategory = id => dispatch => {
  dispatch(payload('GET_THREADS_OF_CATEGORY_PENDING')({ id }))
  getRequest(`/category/${id}/threads`)
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

//
// COMMENTS
//

export const addComment = (threadId, userId, parentId, content) => dispatch => {
  dispatch(payload('ADD_COMMENT_PENDING')())
  postRequest(payload('ADD_COMMENT')({ threadId, userId, parentId, content }))
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const editComment = (id, content) => dispatch => {
  dispatch(payload('EDIT_COMMENT_PENDING')())
  postRequest(payload('EDIT_COMMENT')({ id, content }))
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const getComment = id => dispatch => {
  dispatch(payload('GET_COMMENT_PENDING')())
  getRequest(`/comment/${id}`)
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const getAllComments = _ => dispatch => {
  dispatch(payload('GET_ALL_COMMENTS_PENDING')())
  getRequest(`/comments`)
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}

export const getCommentsOfThread = id => dispatch => {
  dispatch(payload('GET_COMMENTS_OF_THREAD_PENDING')({ id }))
  getRequest(`/thread/${id}/comments`)
    .then(res => dispatch(res))
    .catch(e => dispatch(requestError(e)))
}
