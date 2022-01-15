const INITIAL_STATE = {
  spaceXlist: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REQUEST_SPACEXDATA':
      return {
        ...state,
        loading: true,
      };
    case 'SET_SPACEXDATA':
      return {
        ...state,
        loading: false,
        spaceXlist: action.payload,
      };
    default:
      return state;
  }
};
