import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


// USER COMPONENT
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';


// ORDER COMPONENT
import MyOrders from './components/order/UserAllOrders/UserOrders'
import USOCard from './components/order/UserSingleOrder/UserSingleOrder'
import AdminAllOrders from './components/order/AdminAllOrders/AdminOrdersUI';
import AdminOrderSearch from './components/order/AdminAllOrders/AdminOrderSearch';
import AdminSingleOrderView from './components/order/AdminSingleOrderView/AdminSingleOrderView';
import UserCartUI from './components/order/UserCart/UserCart';
import OrderSummary from './components/order/OrderSummary/OrderSummary';
import orderSuccessUI from './components/order/UserOrderSuccess/orderSuccessPage';

// MOVIE COMPONENT
import Menu from "./components/Menu";
import MovieDetails from './components/movie/MovieDetails/MovieDetails';

// THEATER COMPONENT
import AllTheaters from './components/AllTheaters'
import TheaterDetails from './components/theater/TheaterDetails';


// ADMIN
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';

import MoviesList from './components/admin/MoviesList'
import NewMovie from './components/admin/NewMovie'
import UpdateMovie from './components/admin/UpdateMovie'
import TheatersList from './components/admin/TheatersList';
import NewTheater from './components/admin/NewTheater';
import UpdateTheater from './components/admin/UpdateTheater';

// ADMIN DASHBOARD
import adminDash from './components/admin/adminDash/adminDash';
import adminOrder from './components/admin/adminDash/adminDash';



import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser, updatePassword } from './actions/userActions'
import store from './store'



// REPORTS
import report from './components/admin/adminDash/report'

// FOR PAYMENT
import Billlist from "./components/Bill/Bill-list.component";
import newbill from "./components/Bill/Bill-Create.component";
import editbill from "./components/Bill/Bill-Update.component";



import PaymentHome from "./components/Home/Home";

import Report from "./components/report/Report";




function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (

    <Router>
      <div className="App">

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />

        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
        <ProtectedRoute path="/password/update" component={UpdatePassword} exact />

        <Route path="/admin/users" component={UsersList} exact />
        <Route path="/admin/user/:id" component={UpdateUser} exact />

      
        <Route path="/" component={Menu} exact />
        <Route path="/search/:keyword" component={Menu} />
        <Route path="/movie/:id" component={MovieDetails} exact />
        <Route path="/theaters" component={AllTheaters} exact />
        <Route path="/theater/:id" component={TheaterDetails} exact />
        <ProtectedRoute path="/admin/movies" isAdmin={true} component={MoviesList} exact />
        <ProtectedRoute path="/admin/movie" isAdmin={true} component={NewMovie} exact />
        <ProtectedRoute path="/admin/movie/:id" isAdmin={true} component={UpdateMovie} exact />
        <ProtectedRoute path="/admin/theaters" isAdmin={true} component={TheatersList} exact />
        <ProtectedRoute path="/admin/theater" isAdmin={true} component={NewTheater} exact />
        <ProtectedRoute path="/admin/theater/:id" isAdmin={true} component={UpdateTheater} exact />

        {/* OrderComponent */}
        {/* user */}
        <ProtectedRoute path="/orders/me" component={MyOrders} exact />
        <ProtectedRoute path="/order/:id" component={USOCard} exact />
        <Route path="/cart" component={UserCartUI} exact />
        <ProtectedRoute path="/confirm_order" component={OrderSummary} />
        <ProtectedRoute path="/success" component={orderSuccessUI} />

        {/* admin */}
        <ProtectedRoute path="/admin/orders" isAdmin={true} component={AdminAllOrders} exact />
        <Route path="/admin/order/:id" isAdmin={true} component={AdminSingleOrderView} exact />
        <Route path="/admin/orders/search/:keyword" isAdmin={true} component={AdminAllOrders} exact />


        

        <ProtectedRoute path="/admin/Dashboard" isAdmin={true} component={adminDash} exact />
        <ProtectedRoute path="/admin/Admin_Order" isAdmin={true} component={adminOrder} exact />


      


        {/* REPORTS */}
        <Route path="/admin/report" component={report} exact />
      


        {/* PAYMENT */}
        <Route path="/PaymentHome" exact component={PaymentHome} />
        <Route path="/listbill/" exact component={Billlist} />
        <Route path="/newbill/" exact component={newbill} />
        <Route path="/editbill/:id" exact component={editbill} />
        <Route path="/Finacereport/" exact component={Report} />

      

      </div>
    </Router>
  );
}

export default App;



