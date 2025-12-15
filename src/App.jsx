import { BrowserRouter } from "react-router";
import Menu from './shared/Menu.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
    </BrowserRouter>
  );
};

export default App;
