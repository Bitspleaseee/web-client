export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING':
      return { ...state, pending: true }
    case 'USER':
      const { user_id, username, description, avatar } = action.payload
      return { ...state,
        pending: false,
        users: [...state.users,
          { user_id, username, description, avatar }
        ]
      }
    case 'CATEGORIES':
      return { ...state,
        pending: false,
        categories: [...action.payload]
      }
    case 'THREADS':
      return { ...state,
        pending: false,
        threads: [...action.payload]
      }
    default:
      return state
  }
}
