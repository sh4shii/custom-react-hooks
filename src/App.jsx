import "./App.css";
import { useToast } from "./hooks/useToast";

function App() {
  const { showToast } = useToast();
  const handleShowToast = () => {
    showToast({
      message: "Toast created successfully!",
      severity: "success",
      duration: 3000,
    });
  };

  return (
    <>
      <button onClick={handleShowToast}>Show Toast</button>
    </>
  );
}

export default App;
