import React, { useEffect, useState } from "react";
import useIsDesktop from "../hooks/useIsDesktop";
import { styled } from "../stitches.config";
import { Input, Textarea } from "./Inputs";
import { ReactComponent as ArrowBack } from "../assets/icons/ArrowLeft.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseButton.svg";
import Slide from "@mui/material/Slide";

import { PrimaryButton } from "./Button";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import { AddTermConfirmation } from "./AddTermConfirmation";

const ModalContainer = styled("article", {
  padding: "15px",
  height: "100%",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  width: "1512px",
  maxWidth: "calc(100% - 30px)",
  "@lg": {
    alignItems: "center",
    maxHeight: "100%",
    height: "900px",
  },
});

const ModalForm = styled("form", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "677px",
  margin: "0 auto",
});

const StyledButton = styled("button", {
  all: "unset",
  cursor: " pointer",
  display: "flex",
  alignItems: "center",
  fontSize: "21px",
  marginBottom: "32px",
});

const StyledArrow = styled(ArrowBack, {
  marginRight: "22px",
  height: "18px",
});

const HeadingWrapper = styled("div", {
  textAlign: "center",
});

const Heading = styled("h1", {
  fontSize: "36px",
  fontWeight: "600",
});

const Subheading = styled("p", {
  fontSize: "18px",
  fontWeight: "400",
  lineHeight: "27px",
});

const SubmitButton = styled(PrimaryButton, {
  alignSelf: "center",
});

const CloseButton = styled(CloseIcon, {
  alignSelf: "flex-end",
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalProps {
  onClose: () => void;
  isOpen?: boolean;
  term?: string;
}

const AddTerm: React.FC<ModalProps> = ({
  isOpen = false,
  onClose,
  term = "",
}) => {
  const [isDesktop, setIsDesktop] = useIsDesktop();
  const [termInputValue, setTermInputValue] = useState("");
  const [definitionInputValue, setDefinitionInputValue] = useState("");
  const [authorInputValue, setAuthorInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [allValidated, setAllValidated] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setTermInputValue(term);
  }, [term]);

  useEffect(() => {
    setAllValidated(
      termInputValue.trim().length > 0 &&
        definitionInputValue.trim().length > 0 &&
        (authorInputValue.trim().length === 0 ||
          authorInputValue.trim().length > 3)
    );
  }, [termInputValue, definitionInputValue, authorInputValue]);

  const handleClose = () => {
    setOpen(false);
    isOpen = false;
    setShowConfirmation(false);
    resetValues();
    onClose();
  };

  const handleTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermInputValue(event.target.value.trim());
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorInputValue(event.target.value.trim());
  };

  const handleDefinitionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDefinitionInputValue(event.target.value.trim());
  };

  const resetValues = () => {
    setTermInputValue("");
    setDefinitionInputValue("");
    setAuthorInputValue("");
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = {
      term: termInputValue,
      def: {
        description: definitionInputValue,
        author: authorInputValue,
      },
    };

    fetch(`http://test.higlossary.site:8080/term/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Add Term Result", response);
        setShowConfirmation(true);
        resetValues();
      })
      .catch((error: any) => console.log("Add Term API Request Error", error));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth="xl"
        fullScreen={!isDesktop}
      >
        <ModalContainer>
          {isDesktop ? (
            <button
              style={{
                all: "unset",
                cursor: " pointer",
                alignSelf: "flex-end",
              }}
            >
              <CloseButton onClick={() => handleClose()} />
            </button>
          ) : (
            <StyledButton onClick={() => handleClose()}>
              <StyledArrow />
              Back
            </StyledButton>
          )}
          {!showConfirmation ? (
            <ModalForm onSubmit={handleSubmit}>
              <HeadingWrapper>
                <Heading>Add new term</Heading>
                <Subheading>
                  Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </Subheading>
              </HeadingWrapper>
              <Input
                label="Term"
                placeholder="Type your term..."
                maxLength={54}
                onChange={handleTermChange}
                inputValue={termInputValue}
                onInputValueChange={setTermInputValue}
              />
              <Textarea
                label="Definition"
                placeholder="Type your definition..."
                onChange={handleDefinitionChange}
                inputValue={definitionInputValue}
                onInputValueChange={setDefinitionInputValue}
              />
              <Input
                label="Author"
                placeholder="Type your name..."
                maxLength={35}
                onChange={handleAuthorChange}
                inputValue={authorInputValue}
                onInputValueChange={setAuthorInputValue}
              />
              <SubmitButton type="submit" disabled={!allValidated}>
                Add new term
              </SubmitButton>
            </ModalForm>
          ) : (
            <AddTermConfirmation
              addNewTerm={() => closeConfirmation()}
              closeDialog={() => handleClose()}
            />
          )}
        </ModalContainer>
      </Dialog>
    </>
  );
};

export default AddTerm;
