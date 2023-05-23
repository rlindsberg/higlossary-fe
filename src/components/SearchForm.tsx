import * as React from "react";
import InputUnstyled, {
  InputUnstyledProps,
  inputUnstyledClasses,
} from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/icons/Search.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { PrimaryButton } from "./Button";

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInputRoot = styled("article")`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  padding: 24px 33px;
  background-color: #ffffff;

  ,
  &.${inputUnstyledClasses.focused} {
    outline: 2px solid #00afdb;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`;

const StyledInputElement = styled("input")`
  outline: 0;
  font-size: 21px;
  width: 100%;
  border: none;
`;

const Search = styled(SearchIcon)`
  margin-right: 18px;
`;

const StyledButton = styled("button")`
  all: unset;
  cursor: pointer;
`;

const StyledErrorMessage = styled("p")`
  margin: 8px 0 0;
  font-size: 14px;
  color: red;
  align-self: flex-start;
`;

const InputFieldWrapper = styled("div")`
  margin-bottom: 30px;
  @media (min-width: 768px) {
    width: 559px;
    margin-bottom: 42px;
  }
`;

export type SearchInputProps = {
  onSubmit: (searchTerm: string) => void;
};

const CustomInput = React.forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { slots, ...other } = props;

  return (
    <InputUnstyled
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        ...slots,
      }}
      {...other}
      ref={ref}
    />
  );
});

const SearchForm = ({ onSubmit }: SearchInputProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validInput, setValidInput] = useState(false);

  useEffect(() => {
    setValidInput(inputValue.trim().length > 0);
  }, [inputValue]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() !== "") {
      onSubmit(searchTerm);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && validInput) {
      handleSearch(inputValue.trim());
    }
  };

  const characterLimit = 54;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length > characterLimit) {
      setErrorMessage(`Maximum ${characterLimit} characters allowed`);
    } else {
      setInputValue(input);
      setErrorMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validInput) {
      setErrorMessage("Input field empty");
      return;
    }
    handleSearch(inputValue.trim());
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputFieldWrapper>
        <CustomInput
          value={inputValue}
          placeholder={!isSelected ? "Find your term" : ""}
          onChange={(e) => handleChange(e)}
          startAdornment={!isSelected ? <Search /> : <></>}
          endAdornment={
            isSelected ? (
              <StyledButton
                onMouseDown={(e) => {
                  setInputValue("");
                  setErrorMessage("");
                }}
              >
                <CloseIcon />
              </StyledButton>
            ) : (
              <></>
            )
          }
          onFocus={() => {
            setIsSelected(true);
            setErrorMessage("");
          }}
          onBlur={() => {
            setIsSelected(false);
          }}
          onKeyDown={handleKeyDown}
        />
        <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
      </InputFieldWrapper>

      <PrimaryButton type="submit" disabled={!validInput}>
        Search
      </PrimaryButton>
    </StyledForm>
  );
};

export default SearchForm;
