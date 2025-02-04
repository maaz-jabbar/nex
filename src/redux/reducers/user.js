const INITIAL_STATES = {
  userType: null,
  user: null,
  profile: null,
  contacts: [],
  chats: []
};

export default function (state = INITIAL_STATES, action) {
  switch (action.type) {
    case 'SAVE_USER_TYPE':
      return {
        ...state,
        userType: action.payload,
      };
    case 'SAVE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SAVE_USER_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };
    case 'SAVE_USER_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
      };
    case 'SAVE_USER_CHATS':
      return {
        ...state,
        chats: action.payload,
      }
    case 'LOGOUT':
      return {
        ...INITIAL_STATES,
      };

    default:
      return state;
  }
}
