const INITIAL_STATES = {
  galleries: [],
};

export default function (state = INITIAL_STATES, action) {
  switch (action.type) {
    case 'SAVE_GALLERIES':
      return {
        ...state,
        galleries: action.payload,
      };
    case 'LOGOUT':
      return {
        ...INITIAL_STATES,
      };

    default:
      return state;
  }
}
