import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Burger from '../assets/icons/burger.png';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/icons/logo.png';
import close from '../assets/icons/close.png';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

type Anchor = 'left';

const StyledDivider = styled(Divider)({
  margin: '0 auto', 
  width: '80%', 
  marginTop: '10px', 
  marginBottom:'10px', 
  backgroundColor:'#333333',
});

const StyledBurger = styled("img")({
  width: '40px', 
  height: '40px', 
  marginTop:'10px',
});

interface HamburgerProps {
  openDialog: () => void;
}

const HamburgerMenu: React.FC<HamburgerProps> = ({openDialog}) => {
  const [state, setState] = React.useState({ left: false });

  const handleOpenDialog = () => {
    openDialog();
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
      <Box
        sx={{ width: '100vw'}}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <StyledDivider sx={{ marginTop: '45px'}}/>
          <ListItem key="Add New Term" disablePadding>
            <ListItemButton onClick={() => handleOpenDialog()}>
                <ListItemText primaryTypographyProps={{ align: 'center', sx: { fontWeight: 'bold', fontSize: '35px', color:'#333333', fontfamily: 'MD Primer' } }} primary="Add New Term" />
            </ListItemButton>
          </ListItem>
          <StyledDivider />
          <ListItem key="Login" disablePadding>
            <ListItemButton>
                <ListItemText primaryTypographyProps={{ align: 'center', sx: { fontWeight: 'bold', fontSize: '35px', color:'#333333', fontfamily: 'MD Primer' } }} primary="Login" />
            </ListItemButton>
          </ListItem>
          <StyledDivider />          
        </List>
        <div style={{ position: 'absolute', bottom: 0, marginLeft:'30px', marginBottom:'20px' }}>
          <List>
            <ListItem key="Copyright" disablePadding sx={{ marginTop: 'auto' }}>
              <ListItemText primaryTypographyProps={{ align: 'left', sx: { fontSize: '16px', color:'#000000', fontfamily: 'Trim' } }} primary="© HiQ 2022 PROPREITARY" />
            </ListItem>
          </List>
        </div>
      </Box>
    );
  
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <IconButton onClick={toggleDrawer('left', true)}>
        <StyledBurger src={Burger} alt="Hamburger Menu" />
      </IconButton>
      <Drawer
        anchor="left"
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        PaperProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(5px)',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '255px', height: '30px', marginTop:'20px', marginLeft:'5px' }} />
          </Box>
          <IconButton onClick={toggleDrawer('left', false)} sx={{ marginRight: '5px', marginTop: '10px' }}>
            <img src={close} alt="Close" style={{ width: '30px', height: '30px' }} />
          </IconButton>
        </Box>
        {list('left')}
      </Drawer>
    </div>
  );
}

export default HamburgerMenu;