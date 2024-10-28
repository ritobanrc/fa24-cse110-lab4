import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { AppProvider } from './context/AppContext';


test('create expense', () => {
  render(
    <App />
  );

  // Simulate user input
  const nameInput = screen.getByLabelText(/name/i);
  const costInput = screen.getByLabelText(/cost/i);

  fireEvent.change(nameInput, { target: { value: 'Test Expense' } });
  fireEvent.change(costInput, { target: { value: '100' } });

  // Simulate form submission
  const submitButton = screen.getByText(/save/i);
  fireEvent.click(submitButton);

  // Check if the ExpenseList contains an <li> element with the correct name and cost
  const expenseItem = screen.getByText(/Test Expense/i).closest('li');
  expect(expenseItem).toBeInTheDocument();
  expect(expenseItem).toHaveTextContent('Test Expense');
  expect(expenseItem).toHaveTextContent('$100');
  
});



test('adds and deletes an expense, updates the UI', () => {
  render(
    <App />
  );

  // Simulate adding an expense
  const nameInput = screen.getByLabelText(/name/i);
  const costInput = screen.getByLabelText(/cost/i);

  fireEvent.change(nameInput, { target: { value: 'Test Expense' } });
  fireEvent.change(costInput, { target: { value: '100' } });

  const submitButton = screen.getByText(/save/i);
  fireEvent.click(submitButton);

  // Check if the expense is added
  const expenseItem = screen.getByText(/Test Expense/i).closest('li')!;
  expect(expenseItem).toBeInTheDocument();
  expect(expenseItem).toHaveTextContent('Test Expense');
  expect(expenseItem).toHaveTextContent('$100');

    // Check if the "Total Spent So Far" and "Remaining" values update correctly
    const totalSpent = screen.getByText(/Spent so far: /i).closest('span');
    expect(totalSpent).toHaveTextContent('$100');
  
    const remaining = screen.getByText(/Remaining/i).closest('span');
    expect(remaining).toHaveTextContent('$900'); // Assuming initial budget is $1000
  

  // Simulate deleting the expense
  const deleteButton = expenseItem.querySelector('button')!;
  fireEvent.click(deleteButton);

  // Check if the expense is removed
  expect(screen.queryByText(/Test Expense/i)).not.toBeInTheDocument();

  // Check if the "Total Spent So Far" and "Remaining" values update correctly
  expect(totalSpent).toHaveTextContent('$0');

  expect(remaining).toHaveTextContent('$1000'); // Assuming initial budget is $1000
});



test('verifies budget balance equation', () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  // Simulate adding multiple expenses
  const nameInput = screen.getByLabelText(/name/i);
  const costInput = screen.getByLabelText(/cost/i);

  fireEvent.change(nameInput, { target: { value: 'Expense 1' } });
  fireEvent.change(costInput, { target: { value: '200' } });
  fireEvent.click(screen.getByText(/save/i));

  fireEvent.change(nameInput, { target: { value: 'Expense 2' } });
  fireEvent.change(costInput, { target: { value: '300' } });
  fireEvent.click(screen.getByText(/save/i));

  // Extract the numbers from the "Spent so far", "Remaining", and "Budget" elements
  const totalSpentText = screen.getByText(/Spent so far:/i).textContent!;
  const remainingText = screen.getByText(/Remaining:/i).textContent!;
  const budgetText = screen.getByText(/Budget:/i).textContent!;

  const totalSpent = parseInt(totalSpentText.replace(/[^0-9]/g, ''), 10);
  const remaining = parseInt(remainingText.replace(/[^0-9]/g, ''), 10);
  const budget = parseInt(budgetText.replace(/[^0-9]/g, ''), 10);

  // Verify the budget balance equation
  expect(budget).toBe(totalSpent + remaining);
});