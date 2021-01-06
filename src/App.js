import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';

import Home from './pages/Home/Home';
import Kanji from './pages/Kanji/Kanji';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:kanji" component={Kanji} />
      </Switch>
    </Router>
  );
}

export default App;
