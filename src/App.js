import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './AxiosConfig';
import LogIn from './components/LogIn/LogIn';
import HomePage from './components/HomePage/HomePage';
import ActivateAccount from './components/ActivateAccount/ActivateAccount';
import UsersProfile from "./components/UsersProfile/UsersProfile";
import RemoveFromBlackList from "./components/BlackListUsersPage/RemoveFromBlackList";
import AddToBlacklist from "./components/BlackListUsersPage/AddToBlacklist";
import AddAvatar from "./components/AddAvatar/AddAvatar";
import CreateManager from "./components/CreateManager/CreateManager";
import UpgradeAccount from "./components/UpgradeAccount/UpgradeAccount";
import DeleteAccount from "./components/UserDelete/UserDelete";
import LogOut from "./components/LogOut/LogOut";
import ListingCreate from "./components/ListingCreate/ListingCreate";
import UpdateListingPage from "./components/UpdateListingPage/UpdateListingPage";
import ListingsUserPage from "./components/ListingsUserPage/ListingsUserPage";
import ListingDetailPage from "./components/ListingDetailPage/ListingDetailPage";
import CarListingDetailPage from "./components/CarListingDetailsPage/CarListingsDetailsPage";
import CarListingsListPage from "./components/CarListingsListPage/CarListingsListPage";
import DeleteListingPage from "./components/ListingsDeletion/ListingsDeletion";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import PasswordRecoveryRequest from "./components/RecoveryPassword/PasswordRecoveryRequest";
import PasswordReset from "./components/RecoveryPassword/PasswordReset";





export const App = () => {
    return (
        <Router>
            <Routes>
                 <Route path="/" element={<HomePage />} />
               <Route path="/logIn" element={<LogIn />} />

                 <Route path="/activate/:token" element={<ActivateAccount />} />
                 <Route path="/profile" element={<UsersProfile />} />
                <Route path="/addblacklist" element={<AddToBlacklist />} />
                <Route path="/removeblacklist" element={<RemoveFromBlackList />} />
              <Route path="/addavatar" element={<AddAvatar />} />
                <Route path="/recoverpassword" element={<PasswordRecoveryRequest/>} />
                <Route path="/recovery/:token" element={<PasswordReset/>} />
                <Route path="/createmanager" element={<CreateManager />} />
                <Route path="/upgradeaccount" element={<UpgradeAccount />} />
                <Route path="/deleteaccount" element={<DeleteAccount />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/listingcreate" element={<ListingCreate />} />
                <Route path="/listingsuser" element={<ListingsUserPage />} />
                <Route path="/listings/update/:id" element={<UpdateListingPage />} />
                 <Route path="/listings/:id" element={<ListingDetailPage />} />
                 <Route path="/list" element={<CarListingsListPage />} />
                 <Route path="/details/:id" element={<CarListingDetailPage />} />
                <Route path="/delete/:id" element={<DeleteListingPage />} />
                <Route path="/registration" element={<RegistrationPage />} />


            </Routes>
        </Router>
    );
};

export default App;

