import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import NewTransaction, {NEW_TRANSACTION_FORM_KEYS, NewTransactionProps} from "./NewTransaction";
import userEvent from "@testing-library/user-event";

const props: NewTransactionProps = {
    onTransactionAdded: () => {
    }
}

function getAllInputs() {
    const textInputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    const amountInput: HTMLInputElement = screen.getByRole("spinbutton", {name: new RegExp(NEW_TRANSACTION_FORM_KEYS.amount, "i")});
    return [...textInputs, amountInput];
}

test("there's a correct heading and submit button", async () => {
    render(<NewTransaction {...props} />);

    expect(screen.getByRole("heading")).toHaveTextContent("New transaction");
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
});

test("all inputs needed for a new Transaction are present in the form", () => {
    render(<NewTransaction {...props} />);

    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    inputs.forEach(input => {
        expect(input.value).toBe("");
    })
    const amountInput: HTMLInputElement = screen.getByRole("spinbutton", {name: new RegExp(NEW_TRANSACTION_FORM_KEYS.amount, "i")});
    expect(amountInput).toHaveValue(0);
    const textInputNames = inputs.map(i => i.name);
    const allInputNames = [...textInputNames, amountInput.name];
    Object.values(NEW_TRANSACTION_FORM_KEYS).forEach(expectedKey => {
        allInputNames.includes(expectedKey);
    })
});

test("each field needs to have a value to be valid", async () => {
    render(<NewTransaction {...props} />);

    const promises = getAllInputs().map(async (input) => {
        userEvent.clear(input);
        userEvent.tab()
        return await waitFor(() => {
            expect(input).toBeInvalid();
        })
    });

    await waitFor(() => Promise.all(promises));
})

test("submit button is disabled initially as the form is not valid", async () => {
    render(<NewTransaction {...props} />);

    const submitButton = screen.getByRole("button");
    await waitFor(() => expect(submitButton).toBeDisabled());
})