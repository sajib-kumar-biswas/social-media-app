import './post.css';
import { MoreVert } from '@material-ui/icons';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [comment, setComment] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    setLike(() => (isLiked ? like - 1 : like + 1));
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {}
    setIsLiked(() => !isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture || '/assets/noAvatar.png'}
                alt=""
                className="postProfileImage"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>

          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img
            src={'/assets/post/' + post.img || '/assets/hi1.png'}
            alt=""
            className="postImage"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src="/assets/like.png"
              alt=""
              className="postLikeIcon"
              onClick={likeHandler}
            />
            <img
              src="/assets/heart.png"
              alt=""
              className="postLikeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentCounter">
              {comment} people commented
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
