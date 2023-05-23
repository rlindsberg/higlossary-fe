import * as React from "react";
import SelectUnstyled, {
  selectUnstyledClasses,
  SelectUnstyledProps,
  SelectUnstyledRootSlotProps,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectUnstyledRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;

  return (
    <button
      type="button"
      {...other}
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {other.children}
      <ArrowDropDownIcon />
    </button>
  );
});

const Default = styled(Button, { shouldForwardProp: () => true })`
  font-weight: 400;
  font-size: 21px;
  background-color: #ffffff;
  border: 2px solid #ffffff;
  color: #333333;
  border-radius: 40px;
  padding: 9px 12px 9px 24px;
  box-sizing: border-box;
  cursor: pointer;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &.${selectUnstyledClasses.focusVisible} {
    outline: 2px solid #00afdb;
  }
`;

const Sorting = styled(Default, { shouldForwardProp: () => true })`
  background-color: transparent;
  border: 2px solid #333333;
`;

const StyledListbox = styled("ul")`
  font-weight: 400;
  font-size: 21px;
  border: 2px solid #333333;
  box-shadow: rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  padding: 24px 0 8px;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
`;

const StyledOption = styled(OptionUnstyled)`
  list-style: none;
  padding-bottom: 16px;
  padding-left: 30px;
  padding-right: 60px;
  border-radius: 8px;
  cursor: pointer;
`;

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

interface CustomSelectProps<TValue extends {}, Multiple extends boolean>
  extends SelectUnstyledProps<TValue, Multiple> {
  variant?: "default" | "sorting";
}

const CustomSelect = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(
  props: CustomSelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { variant = "default", slots: propSlots = {}, ...other } = props;
  const RootSlot = variant === "sorting" ? Sorting : Default;
  const slots = {
    root: RootSlot,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...propSlots,
  };

  return <SelectUnstyled {...other} ref={ref} slots={slots} />;
});

interface DropdownProps {
  variant: "default" | "sorting";
  options: Options[];
  defaultValue: string;
}

interface Options {
  value: string;
  option: string;
}

const Dropdown = ({ variant, options, defaultValue }: DropdownProps) => {
  return (
    <CustomSelect defaultValue={defaultValue} variant={variant}>
      {options.map((option) => {
        return (
          <StyledOption key={option.value} value={option.value}>
            {option.option}
          </StyledOption>
        );
      })}
    </CustomSelect>
  );
};

export default Dropdown;
