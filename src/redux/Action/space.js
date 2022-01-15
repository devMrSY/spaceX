import axios from 'axios';

export function setspacexList() {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_SPACEXDATA' });
    axios
      .get('https://api.spacexdata.com/v2/launches')
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_SPACEXDATA`, payload: response.data });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_SPACEXDATA`, payload: [] });
      });
  };
}
