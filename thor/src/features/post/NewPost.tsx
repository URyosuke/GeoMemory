import React, { useState ,useEffect} from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import Auth from "../auth/Auth";


import { File } from "../types";

import {
  selectOpenNewPost,
  resetOpenNewPost,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncNewPost,
} from "../post/postSlice";

import { Button, TextField, IconButton } from "@material-ui/core";
import { MdAddAPhoto } from "react-icons/md";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",

    width: 280,
    height: 220,
    padding: "50px",

    transform: "translate(-50%, -50%)",
  },
};

let packet = { content: "a", datetime: new Date().toISOString(), latitude:"+137.1", longitude:"+35.1", userid: 1 };
let postLatitude = 0;
let postLongitude = 0;

const NewPost: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openNewPost = useSelector(selectOpenNewPost);

  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };

  const newPost = async (e: React.MouseEvent<HTMLElement>) => {

    
    e.preventDefault();
    //ダミーデータです
    console.log(postLatitude,postLongitude);
    packet = { content: title, datetime: new Date().toISOString(), latitude:postLatitude.toString(), longitude:postLongitude.toString(), userid: Number(localStorage.getItem('userid'))};
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncNewPost(packet));
    await dispatch(fetchPostEnd());
    setTitle("");
    setImage(null);
    dispatch(resetOpenNewPost());
  };

  // const newPost = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   //ダミーデータです
  //   const packet = { content: title, datetime: new Date().toISOString(), latitude:"+137.1", longitude:"+35.1", userid: 1 };
  //   await dispatch(fetchPostStart());
  //   await dispatch(fetchAsyncNewPost(packet));
  //   await dispatch(fetchPostEnd());
  //   setTitle("");
  //   setImage(null);
  //   dispatch(resetOpenNewPost());
  // };

  interface UserPosition {
    latitude: number;
    longitude: number;
  }

async function getCurrentLocation(): Promise<UserPosition> {
      return new Promise<UserPosition>((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude });
            },
            (error) => {
              reject(new Error(`位置情報の取得に失敗しました: ${error.message}`));
            }
          );
        } else {
          reject(new Error('ブラウザが位置情報をサポートしていません'));
        }
      });
    }



    useEffect(() => {
      getCurrentLocation()
        .then((position) => {
          postLatitude = position.latitude;
          postLongitude = position.longitude;
          
        })
        .catch((error) => {
          console.error(error.message);
        });
    }, []);

  return (
    <>
      <Auth />
      <form >
        <h1 >GeoMemory</h1>
        <br />
        <TextField
          placeholder="Please enter caption"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          id="imageInput"
          hidden={true}
          onChange={(e) => setImage(e.target.files![0])}
        />
        <br />
        <IconButton onClick={handlerEditPicture}>
          <MdAddAPhoto />
        </IconButton>
        <br />
        <Button
          disabled={!title}
          variant="contained"
          color="primary"
          onClick={newPost}
        >
          New post
        </Button>
      </form>
      
    </>
  );
};

export default NewPost;