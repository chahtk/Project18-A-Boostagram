import React from 'react';
import styled from 'styled-components';

const style = {};

style.StoryItems = styled.div`
  min-width: 66px;
  max-width: 66px;
  height: auto;
  margin-left: 10px;
  padding: 0px 4px;
  cursor: pointer;
`;

style.Item = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 70%;
  overflow: hidden;
`;

style.UserName = styled.div`
  max-width: 61px;
  max-height: 13px;
  color: #262626;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
`;

const StoryItems = (input) => {
  const { author } = input.data;
  const onClick = () => {
    // todo: 모달창
  };
  return (
    <>
      <style.StoryItems>
        <style.Item src={author.profileImg} onClick={onClick} />
        <style.UserName>{author.userName}</style.UserName>
      </style.StoryItems>
    </>
  );
};

export default StoryItems;
