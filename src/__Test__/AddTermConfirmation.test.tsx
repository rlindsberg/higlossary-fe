import { render, fireEvent, screen } from "@testing-library/react";
import { AddTermConfirmation } from "../components/AddTermConfirmation";

describe("AddTermConfirmation component", () => {
  it("displays the popup window", () => {
    render(<AddTermConfirmation closeDialog={function (): void {
      throw new Error("Function not implemented.");
    } } addNewTerm={function (): void {
      throw new Error("Function not implemented.");
    } } />);
    const confirmationPic = screen.getByAltText("NICE");
    expect(confirmationPic).toBeInTheDocument();
  });

  it("closes the dialog when Close button is clicked", () => {
    const closeDialog = jest.fn();
    render(
      <AddTermConfirmation closeDialog={closeDialog} addNewTerm={function (): void {
        throw new Error("Function not implemented.");
      } } />
    );
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(closeDialog).toHaveBeenCalledTimes(1);
  });

  it("takes the user to the intended page when 'Add New Term' button is clicked", () => {
    const addNewTerm = jest.fn();
    render(<AddTermConfirmation addNewTerm={addNewTerm} closeDialog={function (): void {
      throw new Error("Function not implemented.");
    } } />);
    const addNewTermButton = screen.getByText("Add New Term");
    fireEvent.click(addNewTermButton);
    expect(addNewTerm).toHaveBeenCalledTimes(1);
  });
});
