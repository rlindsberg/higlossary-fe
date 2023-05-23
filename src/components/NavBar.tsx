import { styled } from "../stitches.config";
import Logo from "../assets/icons/logo.png";
import { PrimaryButton } from "./Button";
import useIsDesktop from "../hooks/useIsDesktop";
import HamburgerMenu from "./Hamburger";
import AddTerm from "./AddTerm";
import { useState } from "react";


const Navbar = styled("nav", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "transparent",
  padding: "10px 10px 10px",
  maxWidth: "100vw",
});

const NavigationSection = styled("section", {
  display: "flex",
  alignItems: "center",
});

const LogoImage = styled("img", {
    height: "30px",
    marginRight: "0",
    marginLeft: "5px",
    marginTop: '13px',
    flexGrow: 1, 
    "@md": {
      height: "40px",
      marginRight: "40px",
      marginLeft: "20px",
      },
    "@lg": {
      marginTop: 0,
    },
});

const Separator = styled("span", {
  fontSize: "20px",
  marginRight: "40px",
  marginLeft: "10px",
  color: "#333333",
});

const AddNewTerm = styled("button", {
  marginRight: "10px",
  textDecoration: "none",
  color: "#333333",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "21px",
  textTransform: "capitalize"
});

const LoginSection = styled("section", {
  display: "flex",
  marginRight: "20px",
});

const LoginBtn = styled(PrimaryButton, {});

export const NavBar = () => {
  const [isDesktop] = useIsDesktop();
  const [showAddNewTermDialog, setShowAddNewTermDialog] = useState(false);
  
    return(
      <Navbar>
        {isDesktop ? (
          <>
            <NavigationSection>
              <a href="/">
                <LogoImage src={Logo} alt="HiQ" />
              </a>
              <Separator>|</Separator>
              <AddNewTerm onClick={() => setShowAddNewTermDialog(true)}>Add new term</AddNewTerm>
            </NavigationSection>
            <LoginSection>
              <LoginBtn type="submit">Login</LoginBtn>
            </LoginSection>
          </>
        ) : (
          <>
            <NavigationSection>
              <a href="/">
                <LogoImage src={Logo} alt="HiQ" />
              </a>
            </NavigationSection>
            <HamburgerMenu openDialog={() => setShowAddNewTermDialog(true)} />
          </>
        )}
        <AddTerm isOpen={showAddNewTermDialog} onClose={() => setShowAddNewTermDialog(false)} />
    </Navbar>    
  );
}
