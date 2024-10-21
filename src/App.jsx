import "./App.css";
import ToastExample from "./components/ToastExample";
import ApiExample from "./components/ApiExample";
import ToggleExample from "./components/ToggleExample";
import CopyToClipboardExample from "./components/CopyToClipboardExample";
import LocalStorageExample from "./components/LocalStorageExample";
import DebounceExample from "./components/DebounceExample";

const App = () => {
  return (
    <>
      <ToastExample />
      <ApiExample />
      <ToggleExample />
      <CopyToClipboardExample />
      <LocalStorageExample />
      <DebounceExample />
    </>
  );
};

export default App;
