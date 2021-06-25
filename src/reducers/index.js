import { combineReducers } from "redux";
import { authentication } from "./authReducer";
import { alert } from "./alertReducer";
import { registration } from "./registerReducer"

const rootReducer = combineReducers({
	authentication,
	registration,
	alert
});

export default rootReducer;