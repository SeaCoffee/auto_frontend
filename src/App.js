import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import HomePage from './components/HomePage/HomePage';
import ActivateAccount from './components/ActivateAccount/ActivateAccount';
import UsersProfile from "./components/UsersProfile/UsersProfile";

import './AxiosConfig';
import RemoveFromBlackList from "./components/BlackListUsersPage/RemoveFromBlackList";
import AddToBlacklist from "./components/BlackListUsersPage/AddToBlacklist";
import AddAvatar from "./components/AddAvatar/AddAvatar";
import CreateManager from "./components/CreateManager/CreateManager";
import UpgradeAccount from "./components/UpgradeAccount/UpgradeAccount";
import DeleteAccount from "./components/UserDelete/UserDelete";
import LogOut from "./components/LogOut/LogOut";



export const App = () => {
    return (
        <Router>
            <Routes>
               <Route path="/logIn" element={<LogIn />} />
                <Route path="/" element={<HomePage />} />
                 <Route path="/activate/:token" element={<ActivateAccount />} />
                 <Route path="/profile" element={<UsersProfile />} />
                <Route path="/addblacklist" element={<AddToBlacklist />} />
                <Route path="/removeblacklist" element={<RemoveFromBlackList />} />
              <Route path="/addavatar" element={<AddAvatar />} />
                <Route path="/createmanager" element={<CreateManager />} />
                <Route path="/upgradeaccount" element={<UpgradeAccount />} />
                <Route path="/deleteaccount" element={<DeleteAccount />} />
                <Route path="/logout" element={<LogOut />} />
            </Routes>
        </Router>
    );
};

export default App;

