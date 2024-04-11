-- DROP TABLE IF EXISTS good;
-- DROP TABLE IF EXISTS comment;
-- DROP TABLE IF EXISTS post;
-- DROP TABLE IF EXISTS follow;
-- DROP TABLE IF EXISTS profile;
-- DROP TABLE IF EXISTS account;

CREATE TABLE IF NOT EXISTS account(
-- CREATE TABLE account(
    userId SERIAL NOT NULL,
    mailAddress VARCHAR(31) NOT NULL UNIQUE,
    password VARCHAR(31) NOT NULL,
    PRIMARY KEY (userId)
);

CREATE TABLE IF NOT EXISTS profile(
-- CREATE TABLE profile(
    profileId SERIAL NOT NULL,
    userId INT NOT NULL UNIQUE,
    userName VARCHAR(15) NOT NULL,
    -- profImg BYTEA,
    imgpath VARCHAR(255),
    -- followerNumber INT NOT NULL,
    -- followingNumber INT NOT NULL,
    -- postNumber INT NOT NULL,
    PRIMARY KEY (profileId),
    FOREIGN KEY (userId) REFERENCES account
);

CREATE TABLE IF NOT EXISTS follow(
-- CREATE TABLE follow(
    followId SERIAL NOT NULL,
    userId INT NOT NULL,
    followingUserId INT NOT NULL,
    PRIMARY KEY (followId),
    FOREIGN KEY (userId) REFERENCES account,
    FOREIGN KEY (followingUserId) REFERENCES account,
    CHECK (userId != followingUserId)
);

CREATE TABLE IF NOT EXISTS post(
-- CREATE TABLE post(
    postId SERIAL NOT NULL,
    content VARCHAR(511),
    -- postImg BYTEA,
    imgpath VARCHAR(255),
    datetime TIMESTAMP(0),
    latitude NUMERIC(5,2),
    longitude NUMERIC(5,2),
    userId INT NOT NULL,
    PRIMARY KEY (postId),
    FOREIGN KEY (userId) REFERENCES account
);

CREATE TABLE IF NOT EXISTS comment(
-- CREATE TABLE comment(
    commentId SERIAL NOT NULL,
    postId INT NOT NULL,
    userId INT NOT NULL,
    content VARCHAR(511),
    datetime TIMESTAMP(0),
    PRIMARY KEY (commentId),
    FOREIGN KEY (postId) REFERENCES post,
    FOREIGN KEY (userId) REFERENCES account
);

CREATE TABLE IF NOT EXISTS good(
-- CREATE TABLE good(
    goodId SERIAL NOT NULL,
    userId INT NOT NULL,
    postId INT NOT NULL,
    PRIMARY KEY (goodId),
    FOREIGN KEY (userId) REFERENCES account,
    FOREIGN KEY (postId) REFERENCES post
);
