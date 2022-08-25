import './css/App.css';
import Dashboard from './component/Dashboard';
import Footer from './component/Footer';
import Header from './component/Header';
import Menu from './component/Menu';

function App() {
  return (
    <div className="wrapper">
     <Header />
     <Menu />
     <Dashboard />
     <Footer />
     <aside className="control-sidebar control-sidebar-dark">

     </aside>
    </div>
  );
}

export default App;
