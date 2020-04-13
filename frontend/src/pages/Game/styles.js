import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 700px;
  display: block;
  margin: 0 auto;

  p {
    color: white;
  }
`;

export const Avatar = styled.div`
  width: 100%;
  min-height: 320px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image:
    linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)),
    url(${props => props.url});
`;

export const Article = styled.div`
  margin: 0px 20px;

  section {
    margin-top: 20px;

    a {
      display: block;
      margin: 0 auto 25px auto;
      text-align: center;
      color: #FAE400;
      text-decoration: none;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-bottom: 15px;

  h2 {
    color: white;
    font-size: 16px;
  }

  svg {
    color: #FAE400;
    font-size: 22px;
  }
`;

export const Button = styled.button`
  background-color: #222222;
  border: 1px solid #707070;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px 20px;
  color: #707070;
  flex: 1 0;

  & + button {
    margin-left: 10px;
  }
`;

export const WrapperScroll= styled.div`
  display: flex;
  overflow-x: auto;

  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    background-color: #141414;
    border: 1px solid #272727;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    border: 1px solid #272727;
    background: #000;
  }
`;

export const Card = styled.div`
  margin: 10px 0px;
  min-width: 300px;
  width: 100%;
  background-color: #1A1A1A;
  border: 1px solid #272727;
  border-radius: 5px;
  flex: 1 0;

  & + div {
    margin-left: 10px;
  }

  header {
    img {
      width: 100%;
      display: block;
      margin: 0 auto;
    }

  }

  p {
    padding: 20px;
    background-color: #141414;
    border-top: 1px solid #272727;
    border-radius: 5px;
  }

  strong {
    display: block;
  }
`;

export const Map = styled.div`
  margin-bottom: 20px;

  h3 {
    color: white;
    text-align: left;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #707070;
  }

  img {
    width: 100%;
    max-width: 700px;
    border-radius: 5px;
  }
`;
