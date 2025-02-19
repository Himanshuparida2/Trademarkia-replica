import './App.css';
import Body from './components/Body';
import Sidebar from './components/Sidebar';
import Topbar from './components/TopBar';
import { SearchQueryProvider } from './context/SearchQuery';
function App() {
  return (
    <div className="App">
      <SearchQueryProvider>
      <Topbar/>
      <Sidebar/>
      <Body/>
      </SearchQueryProvider>
    </div>
  );
}

export default App;
