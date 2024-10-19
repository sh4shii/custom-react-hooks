import useToggle from "../hooks/useToggle";

const ToggleExample = () => {
  const [isToggled, toggle] = useToggle(false);
  const [isDarkTheme, toggleTheme] = useToggle(false); // false for light theme

  const themeClass = isDarkTheme ? "dark-theme" : "light-theme";

  return (
    <>
      <div>
        <p>The current state is: {isToggled ? "ON" : "OFF"}</p>
        <button onClick={toggle}>Toggle</button>
        <button onClick={() => toggle(true)}>Set ON</button>
        <button onClick={() => toggle(false)}>Set OFF</button>
      </div>

      <div className={themeClass}>
        <h1>{isDarkTheme ? "Dark Theme" : "Light Theme"}</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </>
  );
};

export default ToggleExample;
