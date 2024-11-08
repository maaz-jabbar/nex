const INITIAL_STATES = {
  userType: null,
};

export default function (state = INITIAL_STATES, action) {
  switch (action.type) {
    case 'SAVE_USER_TYPE':
      return {
        ...state,
        userType: action.payload,
    }
    case 'LOGOUT':
      return {
        ...INITIAL_STATES,
      };

    default:
      return state;
  }
}
