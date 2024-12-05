const INITIAL_STATE = false;

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOADER_TRUE':
      return true;
    case 'LOADER_FALSE':
      return false;

    default:
      return INITIAL_STATE;
  }
}
