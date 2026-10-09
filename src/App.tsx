import { ThemeProvider } from "./context/ThemeContext";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { CountriesProvider } from "./context/CountriesContext";

function App() {

  return (
    <ThemeProvider>
      <CountriesProvider>
        <RouterProvider router={router} />
      </CountriesProvider>
    </ThemeProvider>
  );
}

export default App;
