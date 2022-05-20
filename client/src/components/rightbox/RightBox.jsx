import './rightbox.css';

const RightBox = ({ user }) => {
  return (
    <div className="rightbarFollowing">
      <img
        src={user.profilePicture}
        alt=""
        className="rightbarFollowingImage"
      />
      <span className="rightbarFollowingName">{user.username}</span>
    </div>
  );
};

export default RightBox;
