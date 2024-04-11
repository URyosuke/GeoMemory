import React, { useState } from "react";
// import styles from "./Post.module.css";
import Auth from '../auth/Auth'
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Divider, Checkbox } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

import AvatarGroup from "@material-ui/lab/AvatarGroup";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { selectProfiles } from "../auth/authSlice";

import {
  selectComments,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncPostComment,
  fetchAsyncPatchLiked,
} from "./postSlice";

import { PROPS_POST } from "../types";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

const Post: React.FC<PROPS_POST> = ({
  postId,
  loginId,
  userPost,
  title,
  // imageUrl,
  // liked,
}) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
  const [text, setText] = useState("");

  const commentsOnPost = comments.filter((com) => {
    return com.post === postId;
  });

  const prof = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { userid: loginId, content: text, postid: postId, datetime: new Date().toISOString()};
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPostComment(packet));
    await dispatch(fetchPostEnd());
    setText("");
  };

  const handlerLiked = async () => {
    const packet = {
      id: postId,
      title: title,
      // current: liked,
      new: loginId,
    };
    await dispatch(fetchPostStart());
    // await dispatch(fetchAsyncPatchLiked(packet));
    await dispatch(fetchPostEnd());
  };

  if (title) {
    return (
      <>
        <div className="">
          <div className="">
            <Avatar className="" src={prof[0]?.img} />
            <h3>{prof[0]?.nickName}</h3>
          </div>
          {/* <img className="" src={imageUrl} alt="" /> */}

          <h4 className="">
            {/* <Checkbox
              className=""
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              checked={liked.some((like) => like === loginId)}
              onChange={handlerLiked}
            /> */}
            <strong> {prof[0]?.nickName}</strong> {title}
            {/* <AvatarGroup max={7}>
              {liked.map((like) => (
                <Avatar
                  className=""
                  key={like}
                  src={profiles.find((prof) => prof.userProfile === like)?.img}
                />
              ))}
            </AvatarGroup> */}
          </h4>

          <Divider />
          <div className="">
            {commentsOnPost.map((comment) => (
              <div key={comment.id} className="">
                <Avatar
                  src={
                    profiles.find(
                      (prof) => prof.userProfile === comment.userComment
                    )?.img
                  }
                  className={classes.small}
                />
                <p>
                  <strong className="">
                    {
                      profiles.find(
                        (prof) => prof.userProfile === comment.userComment
                      )?.nickName
                    }
                  </strong>
                  {comment.text}
                </p>
              </div>
            ))}
          </div>

          <form className="">
            <input
              className=""
              type="text"
              placeholder="add a comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              disabled={!text.length}
              className=""
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
        </div>
      </>
    );
  }
  return null;
};

export default Post;