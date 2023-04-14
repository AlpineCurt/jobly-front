import './App.css';
import Routes from './Routes';
import NavBar from './NavBar';
import CurrentUserProvider from './CurrentUserProvider';

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <NavBar />
        <Routes />
      </CurrentUserProvider>
    </div>
  );
}

export default App;
