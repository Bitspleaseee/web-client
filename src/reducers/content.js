export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING':
    case 'GET_ALL_USERS_PENDING':
    case 'GET_CATEGORY_PENDING':
    case 'GET_ALL_CATEGORIES_PENDING':
    case 'GET_THREAD_PENDING':
    case 'GET_ALL_THREADS_PENDING':
    case 'GET_THREADS_IN_CATEGORY_PENDING':
    case 'GET_COMMENT_PENDING':
    case 'GET_ALL_COMMENTS_PENDING':
    case 'GET_COMMENTS_IN_THREAD_PENDING':
      return { ...state, pending: (state.pending || 0) + 1 }
    case 'USER':
      return { ...state,
        pending: state.pending - 1,
        users: [...state.users, action.payload]
      }
    case 'USERS':
      return { ...state,
        pending: state.pending - 1,
        users: [...state.users, ...action.payload]
      }
    case 'CATEGORY':
      return { ...state,
        pending: state.pending - 1,
        categories: [...state.categories, action.payload]
      }
    case 'CATEGORIES':
      return { ...state,
        pending: state.pending - 1,
        categories: [...state.categories, ...action.payload]
      }
    case 'THREADS':
      return { ...state,
        pending: state.pending - 1,
        threads: [...state.threads, ...action.payload]
      }
    case 'THREAD':
      return { ...state,
        pending: state.pending - 1,
        threads: [...state.threads, action.payload]
      }
    case 'COMMENTS':
      return { ...state,
        pending: state.pending - 1,
        comments: [...state.comments, ...action.payload]
      }
    case 'COMMENT':
      return { ...state,
        pending: state.pending - 1,
        comments: [...state.comments, action.payload]
      }
    case 'LOCAL_CONTENT_ERROR':
    case 'CONTENT_REQUEST_ERROR':
      return { ...state,
        pending: state.pending - 1,
        error: action.payload
      }
    case 'INTERNAL_SERVER_ERROR':
      return { ...state, error: 'Internal server error occured', pending: state.pending - 1 }
    case 'ACCEPTED_ERROR':
      return { ...state, error: null }
    default:
      return {
        categories: [],
        threads: [],
        comments: [],
        ...state
      }
  }
}
