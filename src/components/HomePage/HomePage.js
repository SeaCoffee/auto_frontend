import React, {useEffect, useState} from "react";
import axios from "axios";
import ListingListPage from "../Listings/Listings";
import Header from "../Header/Header";



const HomePage = () => {

  return (
    <div>
      <h2>Wellcome to Car Sales!</h2>
            <Header/>
            <ListingListPage/>

    </div>
  );
};

export default HomePage;