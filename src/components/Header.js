import React from 'react'
import styled from 'styled-components'
import { Avatar } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search'
import { HelpOutline } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Header() {
  const [user] = useAuthState(auth);

  return (
    <div>
        <HeaderContainer>
            {/* Header Left */}
            <HeaderLeft>
              <AccessTimeIcon/>
            </HeaderLeft>
            {/* Header Search */}
              <HeaderSearch>
                <SearchIcon/>
                <input type="text" placeholder='Search Slack Clone' />
              </HeaderSearch>
            {/* Header Right */}
              <HeaderRight>
                <HelpOutline/>
                <HeaderAvatar onClick={() => auth.signOut()} alt={user?.displayName}
              src={user?.photoURL}
              />
              </HeaderRight>
        </HeaderContainer>
    </div>
  )
}

export default Header;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  border-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  border: 1px solid gray;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: none;
  }
  > input::placeholder {
    color: white;
  }

  > input:focus::placeholder {
  color: transparent;
}
`;
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-right: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
  `;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;



const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;