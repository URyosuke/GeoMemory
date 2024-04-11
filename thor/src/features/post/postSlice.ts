import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { PROPS_NEWPOST, PROPS_LIKED, PROPS_COMMENT } from "../types";
const API_URL = "http://localhost:8080/";
const apiUrlPost = `${API_URL}api/post/`;
const apiUrlComment = `${API_URL}api/comment/`;

export const fetchAsyncGetPosts = createAsyncThunk("post/get", async () => {
  const res = await axios.get(`${apiUrlPost}get/all`);
  return res.data;
});

export const fetchAsyncNewPost = createAsyncThunk(
  "post/post",
  async (newPost: PROPS_NEWPOST) => {
    // const uploadData = new FormData();
    // uploadData.append("title", newPost.title);
    // newPost.img && uploadData.append("img", newPost.img, newPost.img.name);
    console.log(newPost);
    const res = await axios.post(`${apiUrlPost}post`, newPost, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncPatchLiked = createAsyncThunk(
  "post/patch",
  async (liked: PROPS_LIKED) => {
    const currentLiked = liked.current;
    const uploadData = new FormData();

    let isOverlapped = false;
    currentLiked.forEach((current) => {
      if (current === liked.new) {
        isOverlapped = true;
      } else {
        uploadData.append("liked", String(current));
      }
    });

    if (!isOverlapped) {
      uploadData.append("liked", String(liked.new));
    } else if (currentLiked.length === 1) {
      uploadData.append("title", liked.title);
      const res = await axios.put(`${apiUrlPost}${liked.id}/`, uploadData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    }
    const res = await axios.patch(`${apiUrlPost}${liked.id}/`, uploadData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncGetComments = createAsyncThunk(
  "comment/get",
  async () => {
    const res = await axios.get(`${apiUrlComment}get/all`);
    return res.data;
  }
);

export const fetchAsyncPostComment = createAsyncThunk(
  "comment/post",
  async (comment: PROPS_COMMENT) => {
    const res = await axios.post(`${apiUrlComment}post`, comment);
    return res.data;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoadingPost: false,
    openNewPost: false,
    posts: [
      {
        postid: 0,
        content: "",
        postimg: null,
        datetime: "",
        latitude: 0,
        longitude: 0,
        userid: 0,
      },
    ],
    comments: [
      {
        id: 0,
        text: "",
        userComment: 0,
        post: 0,
      },
    ],
  },
  reducers: {
    fetchPostStart(state) {
      state.isLoadingPost = true;
    },
    fetchPostEnd(state) {
      state.isLoadingPost = false;
    },
    setOpenNewPost(state) {
      state.openNewPost = true;
    },
    resetOpenNewPost(state) {
      state.openNewPost = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    });
    builder.addCase(fetchAsyncNewPost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    });
    builder.addCase(fetchAsyncGetComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
      };
    });
    builder.addCase(fetchAsyncPostComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    });
    builder.addCase(fetchAsyncPatchLiked.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.postid === action.payload.id ? action.payload : post
        ),
      };
    });
  },
});

export const {
  fetchPostStart,
  fetchPostEnd,
  setOpenNewPost,
  resetOpenNewPost,
} = postSlice.actions;

export const selectIsLoadingPost = (state: RootState) =>
  state.post.isLoadingPost;
export const selectOpenNewPost = (state: RootState) => state.post.openNewPost;
export const selectPosts = (state: RootState) => state.post.posts;
export const selectComments = (state: RootState) => state.post.comments;

export default postSlice.reducer;
