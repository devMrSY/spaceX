import axios from 'axios';

export function setspacexList() {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_PARTICIPANTS' });
    axios
      .get('https://api.spacexdata.com/v2/launches')
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_PARTICIPANTS`, payload: response.data });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_PARTICIPANTS`, payload: [] });
      });
  };
}
