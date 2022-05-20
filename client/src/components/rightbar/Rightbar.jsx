import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import RightBox from '../rightbox/RightBox';

const Rightbar = ({ user }) => {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImage" />
          <span className="birthdayText">
            {' '}
            <strong>Foisal Hasan</strong> and <strong>3 Others</strong> have
            birthdays today.
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City : </span>
            <span className="rightbarInfoValue">{user.city || "Dhaka"}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From : </span>
            <span className="rightbarInfoValue">{user.from || "Kushtia"}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship : </span>
            <span className="rightbarInfoValue">
              {user.relationship || 'single'}
            </span>
          </div>
        </div>

        <h4 className="rightbarTitle">Followings</h4>
        <div className="rightbarFollowings">
          {
            Users.map((u) => (
              <RightBox key={u.id} user={u} />
            ))
          }
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
