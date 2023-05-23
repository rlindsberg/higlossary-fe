import { styled } from "../stitches.config";
import ConfirmationPic from "../assets/icons/ConfirmationPic.png";
import { PrimaryButton } from "./Button";
import { SecondaryButton } from "./Button";

const ConfirmationContainer = styled("article", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const StyledConfirmation = styled("img", {
  width: "300px",
  height: "179px",
  margin: "0 auto",
  "@md": {
    width: "484px",
    height: "273px",
  },
});

const TextContainer = styled("div", {
  width: "100%",
  textAlign: "center",
  "@md": {
    width: "100%",
  },
});

const StyledInputText = styled("h2", {
  marginBottom: "0px",
});

const StyledThanksText = styled("p", {
  fontSize: "24px",
  fontWeight: "400",
  marginTop: "10px",
});

const ButtonsContainer = styled("div", {
  width: "100%",
  marginTop: "10px",
  marginBottom: "40px",
  textAlign: "center",
  "@md": {
    marginTop: "40px",
    marginBottom: "40px",
  },
});

const AddNewTermButton = styled(PrimaryButton, {});

const CloseButton = styled(SecondaryButton, {
  marginRight: "10px",
  "@md": {
    marginRight: "20px",
  },
});

interface AddTermConfirmationProps {
  closeDialog: () => void;
  addNewTerm: () => void;
}

export const AddTermConfirmation: React.FC<AddTermConfirmationProps> = ({
  closeDialog,
  addNewTerm,
}) => {
  return (
    <ConfirmationContainer>
      <StyledConfirmation src={ConfirmationPic} alt="NICE" />
      <TextContainer>
        <StyledInputText>Your input has been added</StyledInputText>
        <StyledThanksText>Thanks for sharing your knowledge</StyledThanksText>
      </TextContainer>
      <ButtonsContainer>
        <CloseButton onClick={() => closeDialog()}>Close</CloseButton>
        <AddNewTermButton onClick={() => addNewTerm()}>
          Add New Term
        </AddNewTermButton>
      </ButtonsContainer>
    </ConfirmationContainer>
  );
};
