import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import {LandingPage} from './Components/landingPage'
import { VideogameDetail } from './Components/VideogameDetail/videogameDetail';
import { Videogames } from './Components/Videogames/videogames';
import { CreateVideogame } from './Components/CreateVideogame/createVideogame'

function App() {
  return (
    <BrowserRouter >
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Videogames}/>
        <Route path='/detail/:id' component={VideogameDetail}/>
        <Route path='/create' component={CreateVideogame}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
