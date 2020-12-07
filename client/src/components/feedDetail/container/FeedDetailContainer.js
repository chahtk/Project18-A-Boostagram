import React from 'react';
import styled from 'styled-components';

const style = {};

style.FeedDetailContainer = styled.div`
  display: ${(props) => (props.active ? 'flex' : 'none')};
  background-color: ${(props) => props.theme.color.background};
  width: 900px;
  height: 600px;
  z-index: 3;
  background-color: white;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 35px;
`;

const FeedDetailContainer = ({ modalActive, handleModal }) => {
  return <style.FeedDetailContainer active={modalActive} />;
};

export default FeedDetailContainer;
