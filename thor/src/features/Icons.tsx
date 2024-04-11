import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";
import './Icons.css';
import { AppDispatch } from "./../app/store";
import { useSelector, useDispatch } from "react-redux";


//import { Button } from "@material-ui/core";

import {
  selectPosts,
  selectIsLoadingPost,
  setOpenNewPost,
  resetOpenNewPost,
  fetchAsyncGetPosts,
  fetchAsyncGetComments,
} from "./post/postSlice";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('Home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const dispatch: AppDispatch = useDispatch();

  return (
    <BottomNavigation  value={value} onChange={handleChange} className="icons">
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        component={Link}
        to="/features/home/Home"
      />
    <BottomNavigationAction
      label="Post"
      value="post"
      icon={<AddCircleOutlineIcon/>}
      component={Link}
      to="/features/post/NewPost"
    />
      <BottomNavigationAction
        label="Compasss"
        value="Conpus"
        icon={<ExploreIcon />}
        component={Link}
        to="/features/compus/Compus"
      />
      <BottomNavigationAction 
        label="Profile" 
        value="profile" 
        icon={<AccountCircleIcon />}
        component={Link}
        to="/features/profile/Profile"
      />
    </BottomNavigation>
  );
}




// import React from 'react'

// function Icons() {
//   return (
//     <div>Icons</div>
//   )
// }

// export default Icons