import React, { useEffect, useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import theme from '@style/Theme';
import pathURI from '@constants/path';
import UserContext from '@context/user';

const style = {};

style.ProfileInfo = styled.div`
  display: flex;
  margin-top: 32px;
`;

style.ProfileImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  overflow: hidden;
  margin: 0 80px;
`;

style.ProfileDetail = styled.div``;

style.NameAndSettings = styled.div`
  display: flex;
  align-items: center;
`;

style.Name = styled.div`
  font-size: 30px;
  margin-right: 20px;
`;

style.FeedAndFollow = styled.div`
  display: flex;
  margin-top: 20px;
`;

style.FeedCountTitle = styled.div`
  margin-right: 5px;
`;

style.FeedCountDetail = styled.div`
  font-weight: bold;
  margin-right: 30px;
`;

style.FollowerTitle = styled.div`
  margin-right: 5px;
`;

style.FollowerDetail = styled.div`
  font-weight: bold;
  margin-right: 30px;
`;

style.FollowingTitle = styled.div`
  margin-right: 5px;
`;

style.FollowingDetail = styled.div`
  font-weight: bold;
  margin-right: 30px;
`;

style.UserName = styled.div`
  font-weight: bold;
  margin-top: 20px;
`;

style.FollowBtn = styled.div`
  background-color: #0095f6;
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  padding: 4px 20px;
  cursor: pointer;
`;

style.UnfollowBtn = styled.div`
  background-color: transparent;
  border: 1px solid ${theme.color.border};
  border-radius: 3px;
  font-weight: bold;
  padding: 4px 20px;
  cursor: pointer;
`;

const ProfileInfo = (input) => {
  const { data, userInfo } = input;
  const { login, setLogin } = useContext(UserContext);
  const followNum = data.userInfo.follow.length;
  const [followerNum, setFollowerNumState] = useState();
  const checkFollowing = () => {
    const result = login.follow?.find((f) => f.userName === userInfo.userName);
    return result !== undefined;
  };

  const [isFollowed, setIsFollowed] = useState();
  const [followStatus, setFollowState] = useState();

  useEffect(() => {
    const check = checkFollowing();
    setFollowerNumState(data.userInfo.follower.length);
    setFollowState(check);
    setIsFollowed(check);
  }, [data, login]);

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      if (isFollowed && !checkFollowing()) {
        setFollowerNumState(followerNum - 1);
        setIsFollowed(!isFollowed);
      } else if (!isFollowed && checkFollowing()) {
        setFollowerNumState(followerNum + 1);
        setIsFollowed(!isFollowed);
      }
      setFollowState(checkFollowing());
    } else if (login.follow) {
      isMounted.current = true;
    }
  }, [login]);

  const clickHandler = () => {
    const { name, userName, profileImg } = login;
    const followData = {
      author: {
        name,
        userName,
        profileImg,
      },
      status: followStatus ? 0 : 1,
    };
    fetch(pathURI.IP + pathURI.API_FOLLOW + userInfo.userName, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.jwt}`,
      },
      body: JSON.stringify(followData),
    }).then((res) => {
      if (res.status === 204) {
        if (followStatus) {
          const newFollow = login.follow.filter(
            (ele) => ele.userName !== userInfo.userName,
          );
          setLogin({ ...login, follow: newFollow });
        } else {
          login.follow.push({
            userName: userInfo.userName,
            profileImg: userInfo.profileImg,
          });
          setLogin({ ...login });
        }
        setFollowerNumState(followStatus ? followerNum - 1 : followerNum + 1);
        setFollowState(!followStatus);
      }
    });
  };
  const FollowOrUnfollow = followStatus ? (
    <style.UnfollowBtn onClick={clickHandler}>언팔로우</style.UnfollowBtn>
  ) : (
    <style.FollowBtn onClick={clickHandler}>팔로우</style.FollowBtn>
  );

  return (
    <style.ProfileInfo>
      <style.ProfileImg src={userInfo.profileImg} />
      <style.ProfileDetail>
        <style.NameAndSettings>
          <style.Name>{userInfo.userName}</style.Name>
          {login.userName === userInfo.userName ? <></> : FollowOrUnfollow}
        </style.NameAndSettings>
        <style.FeedAndFollow>
          <style.FeedCountTitle>게시물</style.FeedCountTitle>
          <style.FeedCountDetail>{userInfo.feedCount}</style.FeedCountDetail>
          <style.FollowerTitle>팔로워</style.FollowerTitle>
          <style.FollowerDetail>{followerNum}</style.FollowerDetail>
          <style.FollowingTitle>팔로우</style.FollowingTitle>
          <style.FollowingDetail>{followNum}</style.FollowingDetail>
        </style.FeedAndFollow>
        <style.UserName>{userInfo.name}</style.UserName>
      </style.ProfileDetail>
    </style.ProfileInfo>
  );
};

export default ProfileInfo;
