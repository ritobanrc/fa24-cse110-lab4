Create Expense Test:
        Simulates a user filling out an expense form by entering a name and cost.
        Submits the form and checks if the newly created expense is added to the expense list.
        Verifies that the list displays the correct expense name (Test Expense) and cost ($100).

Add and Delete Expense Test:
        Simulates adding an expense by filling out the form and submitting it.
        Verifies that after the expense is added, the "Total Spent So Far" and "Remaining" values are updated appropriately (based on an initial budget of $1000).
        Then, simulates deleting the expense and checks if it is removed from the list.
        Verifies that the "Total Spent So Far" and "Remaining" values return to their original state after the deletion.

Verify Budget Balance Equation Test:
        Adds two expenses by filling out and submitting the form twice.
        Extracts the values of "Spent so far," "Remaining," and "Budget" from the UI.
        Verifies that the budget balance equation holds: Budget = Total Spent + Remaining.
