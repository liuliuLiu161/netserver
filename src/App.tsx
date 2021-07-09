import "./App.css";
import CanvasContext from "components/CanvasContext";
import Main from "components";

const App = () => {
	return <CanvasContext>{(state: any, dispatch: any) => <Main state={state} dispatch={dispatch} />}</CanvasContext>;
};

export default App;
