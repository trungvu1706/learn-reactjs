import Header from 'components/Header';
import ProductFeature from 'features/Product';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/todo';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/count" component={CounterFeature} />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/" component={ProductFeature} exact />
        <Route path="/products" component={ProductFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
