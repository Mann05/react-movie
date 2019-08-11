import React from 'react';
import Header from  '../elements/Header/Header';
import Home from '../Home/Home';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import NotFound from '../elements/NotFound/NotFound'
import Movie from '../Movie/Movie'
const App=() =>{
    return(
        <Router>
            <React.Fragment>
                <Header />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/:movieId" component={Movie} exact />
                    <Route component={NotFound} />
                </Switch>
            </React.Fragment>
        </Router>
    )
}
export default App;