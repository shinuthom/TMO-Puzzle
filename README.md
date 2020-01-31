### Task 2

Business requirement: As a user I should be able to type into
the symbol field and make a valid time-frame selection so that
the graph is refreshed automatically without needing to click a button.

- The fetchQuote() method is not calling properly on stockPickerForm.valueChanges subscription

- The stockPickerForm.valueChanges is not unsubscribed on component destroy

- Google chart is not working with Data selection.

- Updated test cases for fetchQuote() method (Updated all other test cases as part of Task 1)

- Used reactive form for value changes and validation

- All constants are moved to separate file as part of Task 1
