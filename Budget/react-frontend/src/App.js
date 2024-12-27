import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom'
import ListTransactionComponent from './components/ListTransactionComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateTransactionComponent from './components/CreateTransactionComponent';
import UpdateTransactionComponent from './components/UpdateTransactionComponent';
import ViewTransactionComponent from './components/ViewTransactionComponent';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DashBoardComponent from './components/DashBoardComponent';
import Register from './components/login/Register';
import LoginForm from './components/login/LoginForm';
import HeaderComponentLogin from './components/HeaderComponentLogin';



function App() {

  const location = useLocation();

    const renderNavbar = () => {
        if (location.pathname === '/' || location.pathname === '/register') {
            return <HeaderComponentLogin/>;
        }
        if (location.pathname === '/transactions' || location.pathname === '/add-transaction/:id '|| location.pathname === '/view-transaction/:id' || location.pathname === '/dashboard') {
        return <HeaderComponent />;
      }
    };
  return (
    <div>
        <Router>
          
            

                {renderNavbar()}
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {LoginForm}></Route>
                          <Route path = "/transactions" component = {ListTransactionComponent}></Route>
                          <Route path = "/add-transaction/:id" component = {CreateTransactionComponent}></Route>
                          <Route path = "/view-transaction/:id" component = {ViewTransactionComponent}></Route>
                          <Route path = "/dashboard" component = {DashBoardComponent}></Route>
                          <Route path='/register' component = {Register} />

                          {/* <Route path = "/update-transaction/:id" component = {UpdateTransactionComponent}></Route> */}
                    </Switch>
                </div>

        </Router>
    </div>
    
  );
}

export default App;
