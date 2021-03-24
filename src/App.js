import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ArtID } from './Art';
import Arts from './Arts';
import Artists from './Artists';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const apiHost = (process.env.NODE_ENV === "development" ? `http://localhost:8000` : `https://arte-de-rua-api.herokuapp.com`);

const client = new ApolloClient({
    uri: apiHost+"/graphql",
    cache: new InMemoryCache(),
    cors: {
        origin: '*' 
    }
});
function App() {
  return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
              <Route path="/art/:id">
                    <ArtID/>
              </Route>
              <Route path="/">
                  <div>
                      <Arts/>
                      <Artists/>
                  </div>
              </Route>
          </Switch>
      </Router>
      </ApolloProvider>
  );
}

export default App;
