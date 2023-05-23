import { styled } from "../stitches.config";

export const PrimaryButton = styled("button", {
  padding: "9px 24px",
  borderRadius: "200px",
  backgroundColor: "$pink40",
  color: "$white10",
  cursor: "pointer",
  fontWeight: 400,
  border: "2px solid $pink40",
  fontSize: "21px",

  "&:hover": {
    backgroundColor: "transparent",
    borderColor: "$grey40",
    color: "$grey40",
  },

  "&:disabled": {
    backgroundColor: "$pink20",
    color: "$white20",
    borderColor: "$pink20",
    cursor: "default",
  },
});

export const SecondaryButton = styled(PrimaryButton, {
  backgroundColor: "transparent",
  borderColor: "$grey40",
  color: "$grey40",

  "&:hover": {
    backgroundColor: "$grey40",
    color: "$white10",
  },
});
