import { useParams } from "react-router-dom";
import './pages css/Profile.css';
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import Post from "../components/Post";

const Profile = () => {
  const { username } = useParams();
  const { user } = useAuthContext();
  const [userProfile, setUserProfile] = useState();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/username/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      const json = await response.json();

      if(response.ok) {
        setUserProfile(json.user);
      }
    }

    const fetchUserPosts = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/username/${user?.userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      const json = await response.json();

      if(response.ok) {
        setUserPosts(json);
      }
    }
    fetchUsername();
    fetchUserPosts();
  }, [user?.token, user?.userId, username])




  return (
    <div className="profile">
      <div className="profile-posts">
        { userProfile && (
          <div>
            <div className="profile-bar">
              {userProfile.firstName} {userProfile.lastName}
              <p>{userPosts && userPosts.length} posts</p>
            </div>
            <div className="profile-card">
              <div className="profile-logo">
                {userProfile.firstName.charAt(0)} {userProfile.lastName.charAt(0)}
              </div>
            </div>
            <div className="profile-infos">
              <p className="profile-names">{userProfile.firstName} {userProfile.lastName}</p>
              <p className="profile-username">@{userProfile.username}</p>
            </div>
          </div>
        )}

        { userPosts && userPosts.map((post) => {
          return <Post key={post._id} post={post}></Post>
        })}
      </div>
      <div className="profile-rightside">
        <div className="profile-quote">
          <h3>Quote of the day</h3>
          <p>“Does losing prove that you are weak? Isn't losing difficult for all of you? A challenge where, after ending up on your hands and knees, you must see if you can stand up again? If you stay on your hands and knees, that proves that you are weak.” - Haikyuu</p>
        </div>
        <div className="profile-highlight">
          <h3>Highlights</h3>
          <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2021/07/Haikyuu-Season-4.jpeg" alt="Haikyuu pic" width={400}></img>
        </div>
      </div>
    </div>

  )
}

export default Profile;
