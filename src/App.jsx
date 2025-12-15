import { BrowserRouter } from "react-router";
import Menu from './shared/Menu.jsx';
import Footer from "./shared/Footer.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
