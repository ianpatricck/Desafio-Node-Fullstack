import { Avatar, useMediaQuery, Menu as MenuItems, MenuItem, Divider } from "@mui/material";
import onentreeLogoBranco from "@/assets/images/onentree-logo-branco.svg";
import { ExpandMore, Logout, Settings, Menu } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  HeaderAvatar, 
  HeaderAvatarMessage, 
  HeaderContainer, 
  HeaderContent, 
  HeaderLinks, 
  HeaderLogo, 
  HeaderMenu, 
  HeaderMobile, 
  HeaderMobileAvatar, 
  HeaderMobileAvatarMessage, 
  HeaderMobileLinks, 
  HeaderMobileNavLink, 
  HeaderNavLink, 
  HeaderWrapper, 
  MenuAvatarMobile,
  MenuAvatarMobileItem
} from "./HeaderStyle";

export default function Header() {

  const matches = useMediaQuery("(max-width:700px)");
  const location = useLocation();

  const [showHeader, setShowHeader] = useState(false);

  const getRoutePathname = () => {
    if (location.pathname == "/")
    return "/";

    return location.pathname.split("/")[1];
  }  

  const [anchorEl, setAnchorEl] = useState(null);
  const avatarOptionsOpen = Boolean(anchorEl);

  const handleAvatarOptionsOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleAvatarOptionsClose = () => {
    setAnchorEl(null);
  }

  const avatarProps = {
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&::before": {
        content: "''",
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "white",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
  };

  const [avatarOptionsMobile, setAvatarOptionsMobile] = useState(false);

  return (
    <HeaderWrapper>

      <HeaderContainer>

        <HeaderContent>
          <Link to="/">
            <HeaderLogo src={onentreeLogoBranco} alt="Logotipo" />
          </Link>

          <HeaderLinks>
            <HeaderNavLink className={getRoutePathname() == "/" ? "checked" : null} to="/">Home</HeaderNavLink> 
            <HeaderNavLink className={getRoutePathname() == "events" ? "checked" : null} to="/events">Eventos</HeaderNavLink> 
            <HeaderNavLink className={getRoutePathname() == "places" ? "checked" : null} to="/places">Locais</HeaderNavLink> 
          </HeaderLinks>
        </HeaderContent>

        <HeaderAvatar onClick={handleAvatarOptionsOpen}>
          <Avatar alt="Ian Patrick" src="ianpatrick" />
          <HeaderAvatarMessage>Olá, Ian</HeaderAvatarMessage>
          <ExpandMore 
            sx={{
              color: "var(--secondary)",
              transitionDuration: "1s",
              transform: avatarOptionsOpen ? "rotate(90deg)" : "rotate(0)",
              transition: "transform .5s"
            }} 

            fontSize="medium" 
          />
        </HeaderAvatar>

        {!matches ? (
          <MenuItems
            anchorEl={anchorEl}
            open={avatarOptionsOpen}
            onClose={handleAvatarOptionsClose}
            onClick={handleAvatarOptionsClose}
            slotProps={{ paper: avatarProps }}
            disableScrollLock={true}
          >
            <MenuItem>
              <Avatar /> 
              Meu Perfil
            </MenuItem>

            <MenuItem>
              <Avatar alt="Ian Patrick" src="ianpatrick" /> 
              Minha Conta
            </MenuItem>

            <Divider />

            <MenuItem>
              <Settings /> 
              Configurações
            </MenuItem>

            <MenuItem>
              <Logout /> 
              Sair
            </MenuItem>
          </MenuItems>

        ) : null}

        <HeaderMenu onClick={() => setShowHeader(!showHeader)}>
          <Menu sx={{ color: "var(--primary)"}} />
        </HeaderMenu>

        {showHeader && matches ? (
          <HeaderMobile>

            <HeaderMobileAvatar onClick={() => setAvatarOptionsMobile(!avatarOptionsMobile)}>
              <Avatar alt="Ian Patrick" src="test" />
              <HeaderMobileAvatarMessage>Olá, Ian</HeaderMobileAvatarMessage>
              <ExpandMore 
                sx={{ 
                  color: "var(--secondary)", 
                  transitionDuration: "1s",
                  transform: avatarOptionsMobile ? "rotate(90deg)" : "rotate(0)",
                  transition: "transform .5s"
                }} 

                fontSize="medium" 
              />
            </HeaderMobileAvatar>

            {avatarOptionsMobile ? (
              <MenuAvatarMobile> 
                <MenuAvatarMobileItem>
                  <Avatar sx={{ height: 30, width: 30, marginRight: 1 }} />
                  Meu Perfil
                </MenuAvatarMobileItem>

                <MenuAvatarMobileItem>
                  <Avatar alt="Ian Patrick" src="ianpatricck" sx={{ height: 30, width: 30, marginRight: 1 }} />
                  Minha Conta
                </MenuAvatarMobileItem>

                <MenuAvatarMobileItem>
                  <Settings sx={{ height: 30, width: 30, marginRight: 1 }} />
                  Configurações
                </MenuAvatarMobileItem>

                <MenuAvatarMobileItem>
                  <Logout sx={{ height: 30, width: 30, marginRight: 1 }} />
                  Sair
                </MenuAvatarMobileItem>
              </MenuAvatarMobile> 
            ) : null}

            <HeaderMobileLinks>
              <HeaderMobileNavLink to="/">Home</HeaderMobileNavLink> 
              <HeaderMobileNavLink to="/events">Eventos</HeaderMobileNavLink> 
              <HeaderMobileNavLink to="places">Locais</HeaderMobileNavLink> 
            </HeaderMobileLinks>

          </HeaderMobile>

        ) : null}

      </HeaderContainer>

    </HeaderWrapper>
  )
}
