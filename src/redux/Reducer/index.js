import { combineReducers } from "redux";
import space from "../Reducer/space";

const appReducer = combineReducers({
  space,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
