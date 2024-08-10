import React, { useState } from 'react'
import { LightModeOutlined, DarkModeOutlined, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import FlexBetween from 'components/Flexbox/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode, setSearchValue } from 'state';
import profileImage from "assets/profile.jpeg";
import { AppBar, IconButton, Toolbar, useTheme, InputBase, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';


const Navbar = ({
  user, isSidebarOpen, setIsSidebarOpen
}) => {

  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const isOpen = Boolean(anchorEl);
  const {pathname} = useLocation()
  const isProductsPage = pathname === "/products"
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue)
    dispatch(setSearchValue(searchValue));
  };

  return (
    <div>
      <AppBar
        sx={{
          position: 'static',
          background: 'none',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between" }}
        >
          {/* left side */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} >
              <MenuIcon />
            </IconButton>
            <FlexBetween
              backgroundColor={theme.palette.background.alt}
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem"
            >
              <InputBase placeholder='Search...' onChange={handleSearch} value={search} disabled={!isProductsPage} />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          </FlexBetween>

          {/* Right side */}

          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )
              }
            </IconButton>

            <IconButton>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>

            <FlexBetween  >
              <Button onClick={handleClick} sx={{
                display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "1rem"
              }}>
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="32px"
                  width="32px"
                  borderRadius="50%" sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left" >
                  <Typography fontWeight="bold" fontSize="0.85rem"
                    sx={{
                      color: theme.palette.secondary[100]
                    }}  >
                    {user.name}
                  </Typography>

                  <Typography fontWeight="bold" fontSize="0.75rem"
                    sx={{
                      color: theme.palette.secondary[100]
                    }}  >
                    {user.occupation}
                  </Typography>

                </Box>
                <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} />
              </Button>
              <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{verticle: "bottom", horizontal: "center"}} >
                <MenuItem onClick={handleClose}>LogOut</MenuItem>
              </Menu>
            </FlexBetween>

          </FlexBetween>


        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
