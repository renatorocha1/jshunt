import styled from 'styled-components';
import Background from '../../assets/background.png'

export const Card = styled.article`
  margin: 20px auto;
  max-width: 330px;
  min-height: 180px;
  border-radius: 4px;
  background: #141414 no-repeat bottom/cover url(${props => props.avatar});
  color: white;
  cursor: pointer;
`;

export const Loading = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const MainWrapper = styled.main`
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image:
    linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)),
    url(${Background});
`;

export const Container = styled.div`
  padding: 20px;
  max-width: 700px;
  display: block;
  margin: 0 auto;

  p {
    color: white;
    text-align: center;
    font-size: 16px;
  }
`;
