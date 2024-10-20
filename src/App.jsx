import "./App.css";
import ToastExample from "./components/ToastExample";
import ApiExample from "./components/ApiExample";
import ToggleExample from "./components/ToggleExample";
import CopyToClipboardExample from "./components/CopyToClipboardExample";
import LocalStorageExample from "./components/LocalStorageExample";

const App = () => {
  return (
    <>
      <ToastExample />
      <ApiExample />
      <ToggleExample />
      <CopyToClipboardExample />
      <LocalStorageExample />
    </>
  );
};

export default App;
