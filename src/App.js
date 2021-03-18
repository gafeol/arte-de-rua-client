import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from '@apollo/client';

const apiHost = `http://localhost:8000`

const client = new ApolloClient({
    uri: apiHost+"/graphql",
    cache: new InMemoryCache(),
    cors: {
        origin: '*' 
    }
});

const GET_ARTS = gql`
    query GetArts {
        arts {
            id
            frase
        }
    }`;

        
function Arts() {
    const { loading, error, data } = useQuery(GET_ARTS);
    if(loading) return "loading....";
    if(error) return error.message
    console.log(data)
    return "got data" + JSON.stringify(data)
}

function App() {
/*    useEffect(() => {
        fetch(apiHost + '/graphql', 
            {
                method: "POST",
                mode: "cors"
            })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    })*/
  return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <Arts/>
        </div>
      </ApolloProvider>
  );
}

export default App;
