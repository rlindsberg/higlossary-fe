import { styled } from "../stitches.config";
import { useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginBottom: "18px",

  "@lg": {
    marginBottom: "24px",
  },
});

const StyledLabel = styled("label", {
  marginBottom: "10px",
  fontWeight: 600,
  fontSize: "15px",
});

const StyledTextarea = styled("textarea", {
  padding: "15px",
  borderRadius: "12px",
  height: "214px",
  outline: "1px solid #333333",
  fontFamily: "MP Primer, sans-serif",
  color: "#333333",
  resize: "none",
  fontSize: "18px",
  border: "none",

  "@lg": {
    padding: "24px",
    height: "242px",
  },

  "&:focus": {
    outline: "2px solid #00afdb",
  },
});

const StyledCharCount = styled("p", {
  alignSelf: "flex-end",
  fontSize: "15px",
  fontWeight: 300,
  margin: "5px 0 0",
});

const StyledButton = styled("button", {
  all: "unset",
  cursor: "pointer",
});

const InputContainer = styled(Container, {
  flexDirection: "column",
});

const Wrapper = styled("div", {
  padding: "0 8px",
  display: "flex",
  background: "#FFFFFF",
  borderRadius: "12px",
  border: "1px solid #333333",
  outline: "none",

  "@lg": {
    padding: "0 12px",
  },

  "&:focus-within, &:active": {
    outline: "2px solid #00afdb",
    border: "1px solid #ffffff",
  },
});

const StyledInput = styled("input", {
  border: "none",
  width: "100%",

  fontSize: "18px",
  fontWeight: 300,
  color: "#333333",
  padding: "15px",

  "@lg": {
    fontSize: "21px",
    padding: "24px",
  },

  "&:focus": {
    outline: "none",
    border: "none",
  },
});

interface InputProps {
  label: string;
  placeholder: string;
  maxLength: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  onInputValueChange: (value: string) => void;
}

interface TextareaProps {
  label: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  onInputValueChange: (value: string) => void;
}

export const Input = ({
  label,
  placeholder,
  maxLength,
  inputValue,
  onInputValueChange,
}: InputProps) => {
  const [charCount, setCharCount] = useState(0);
  const [inputValueLocal, setInputValueLocal] = useState(inputValue);

  return (
    <InputContainer>
      <StyledLabel>{label}</StyledLabel>
      <Wrapper>
        <StyledInput
          value={inputValue}
          placeholder={placeholder}
          type="text"
          maxLength={maxLength}
          onChange={(e) => {
            setCharCount(e.target.value.length);
            setInputValueLocal(e.target.value);
            onInputValueChange(e.target.value);
          }}
        />
        <StyledButton
          type="button"
          onClick={() => {
            setCharCount(0);
            setInputValueLocal("");
            onInputValueChange(""); //
          }}
        >
          {charCount > 0 && <CloseIcon />}
        </StyledButton>
      </Wrapper>
      <StyledCharCount>
        {charCount}/{maxLength}
      </StyledCharCount>
    </InputContainer>
  );
};

export const Textarea = ({
  label,
  placeholder,
  inputValue,
  onInputValueChange,
}: TextareaProps) => {
  const [charCount, setCharCount] = useState(0);
  const [inputValueLocal, setInputValueLocal] = useState(inputValue);
  return (
    <Container>
      <StyledLabel>{label}</StyledLabel>
      <StyledTextarea
        placeholder={placeholder}
        defaultValue=""
        maxLength={400}
        onChange={(e) => {
          setCharCount(e.target.value.length);
          setInputValueLocal(e.target.value);
          onInputValueChange(e.target.value);
        }}
      />
      <StyledCharCount>{charCount}/400</StyledCharCount>
    </Container>
  );
};
