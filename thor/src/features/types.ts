export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
  }
  /*authSlice.ts*/
  export interface PROPS_AUTHEN {
    mailaddress: string;
    password: string;
  }
  
  export interface PROPS_PROFIEL {
    id: number;
    nickName: string;
    img: File | null;
  }
  
  export interface PROPS_NICKNAME {
    username: string;
    userid: number;
  }
  
  /*postSlice.ts*/
  export interface PROPS_NEWPOST {
    userid: number;
    content: string;
    latitude: string;
    longitude: string;
    datetime: string;
  }
  export interface PROPS_LIKED {
    id: number;
    title: string;
    current: number[];
    new: number;
  }
  export interface PROPS_COMMENT {
    userid: number;
    content: string;
    postid: number;
    datetime: string;
  }
  /*Post.tsx*/
  export interface PROPS_POST {
    postId: number;
    loginId: number;
    userPost: number;
    title: string;
    // imageUrl: string;
    // liked: number[];
  }