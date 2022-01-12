import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../Reducers";
import thunk from "redux-thunk";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) //Me permite usar las redux dev tools, y el thunk es para poder realizar acciones asincrónicas
);

export default store;