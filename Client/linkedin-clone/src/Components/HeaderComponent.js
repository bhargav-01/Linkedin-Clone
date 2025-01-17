import  React,{useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import {HiHome} from 'react-icons/hi';
import {FiLogOut} from 'react-icons/fi'
import {Button} from '@material-ui/core';
import {MdNotifications} from 'react-icons/md';
import {CgProfile} from 'react-icons/cg';
import {NavLink} from 'react-router-dom';
import './PostWithID.css'; 
import axios from 'axios';
import user from '../assets/images/user.png'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.black, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.black, 0.25),
  // },
  backgroundColor:"aliceblue",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    color:"black",
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openProfile=()=>{
    history.push('/profile');
  }

  const handlehome=()=>{
    history.push('/home');
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  

  const [profile,setProfile]=React.useState(null);
  const token=localStorage.getItem('token');
  const profileAPI = axios.create({
      baseURL: 'http://localhost:3001/users/',
      headers: {'Authorization': `Bearer ${token}`}
  });

  const handleLogout=(e)=>{

  }

  useEffect(() => {
    profileAPI.get('/profile')
    .then(response=>{
        console.log(response.data)
          setProfile(response.data.profile);
      });
    console.log(profile)
  },[])

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem   onClick={openProfile}>
        <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            style={{margin:"10px 0px 10px 15px",padding:"0px"}}>   
            <Avatar alt="Profile" src={profile==null?user:profile.profile_image} style={{width:"40px",height:"40px"}}/>
          </IconButton>
          <div style={{paddingRight:"10px"}}>{profile==null?null:profile.firstname+" "+profile.lastname}</div>
      </MenuItem><br/>
      <MenuItem style={{width: "-webkit-fill-available","justify-content": "flex-start"}}  onClick={(e)=>handleLogout(e)}>
        <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            style={{margin:"10px 20px 10px 15px",padding:"0px"}}>   
            <FiLogOut />
          </IconButton>
          <div style={{paddingRight:"10px"}}>Logout</div>
      </MenuItem><br/>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" className="m-3">
          <Badge badgeContent={4} color="error">
            <HiHome />
          </Badge>
        </IconButton>
        <p className="m-2">Home</p>
      </MenuItem><br/>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          className="m-3"
        >
          <Badge badgeContent={17} color="error">
            <MdNotifications />
          </Badge>
        </IconButton>
        <p className="m-2">Notifications</p>
      </MenuItem><br/>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          className="m-3"
        >
          <Avatar alt="Profile" src={profile==null?user:profile.profile_image} />
        </IconButton>
        <p className="m-2">Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} style={{"position": "fixed","z-index": "1000","width": "-webkit-fill-available"}}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor:"white"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            className="menu"
          >
            <MenuIcon style={{color:"black"}} onClick={handleMobileMenuOpen}/>
          </IconButton>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          */}
          <NavLink to="/home"><img src="icons8-linkedin-48.png"/></NavLink>
          <Search>
            <SearchIconWrapper>
              <SearchIcon style={{color:"black"}}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={handlehome}><HiHome style={{color:"black",fontSize: "25px"}}/></Button>
            <Button><Badge badgeContent={4} color="error"><MdNotifications style={{color:"black",fontSize: "25px"}}/></Badge></Button>
            <Button 
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}>
                <Avatar alt="Profile" src={profile==null?user:profile.profile_image} />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
