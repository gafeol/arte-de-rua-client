import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Arts from './Arts';
import Artists from './Artists';

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
          <div>
              <Arts/>
              <Artists/>
          </div>
      </ApolloProvider>
  );
}

export default App;
