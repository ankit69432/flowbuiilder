import { Provider } from "react-redux";
import "./App.css";
import Builder from "./components/builder/Builder";
import store from "./components/redux/store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Builder />
      </Provider>
    </div>
  );
}

export default App;
