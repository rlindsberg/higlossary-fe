import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";



const StyledButton = styled(ButtonUnstyled)`
  padding: 6px 18px;
  border-radius: 200px;
  border: none;
  background-color: #ff0096;
  color: #ffffff;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.8;
  }
`;

const Tag = () => {
  return <StyledButton>Tag</StyledButton>;
};

export default Tag;
