import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CharacterFormPage from './pages/character/character-form.page';
import CharacterListPage from './pages/character/character-list.page';
import ItemFormPage from './pages/item/item-form.page';
import ItemListPage from './pages/item/item-list.page';
import LoginPage from './pages/login/login.page';
import RegionFormPage from './pages/region/region-form.page';
import RegionListPage from './pages/region/region-list.page';

function App() {
  const isLoginPage = window?.location?.href?.includes('/login');

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      <ToastContainer />

      <Router>
        <div className={`${isLoginPage ? 'hidden' : 'flex'} items-center justify-center h-16 w-full bg-gray-700 text-white font-semibold`}>
          <NavLink to="/regioes" activeClassName="text-blue-400">Regiões</NavLink>
          <NavLink to="/itens" className="mx-12" activeClassName="text-blue-400">Itens</NavLink>
          <NavLink to="/personagens" activeClassName="text-blue-400">Personagens</NavLink>

          <p className="ml-12 text-red-400 cursor-pointer" onClick={logout}>Sair</p>
        </div>

        <Switch>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>

          <Route exact path="/regioes">
            <RegionListPage></RegionListPage>
          </Route>

          <Route path="/regioes/incluir">
            <RegionFormPage></RegionFormPage>
          </Route>

          <Route exact path="/personagens">
            <CharacterListPage></CharacterListPage>
          </Route>

          <Route path="/personagens/incluir">
            <CharacterFormPage></CharacterFormPage>
          </Route>

          <Route exact path="/itens">
            <ItemListPage></ItemListPage>
          </Route>

          <Route path="/itens/incluir">
            <ItemFormPage></ItemFormPage>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
