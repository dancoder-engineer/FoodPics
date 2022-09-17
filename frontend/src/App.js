import logo from './logo.svg';
import './App.css';

function App() {

  const oldThing = (
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

  )
  return (
    <div className="App">
      {oldThing}
    </div>
  );
}

export default App;
