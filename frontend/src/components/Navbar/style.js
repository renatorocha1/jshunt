import styled from 'styled-components';

const Navbar = styled.div`
  margin: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  a {
    display: block;
    background-color: red;
  }

  svg {
    color: #FAE400;
    font-size: 35px;
  }
`;

export default Navbar;
