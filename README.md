### Task 1

Please provide a short code review of the base `master` branch:

1. What is done well?

- Application follows modularity, which enables the reusability
- Implemented lazy-loading for modules.
- Used _ngRx_ state management for State Synchronization.
- Application uses _Nrwl_ Nx tool, there will be only a single workspace for all the projects including frontend and the backend.
- Using libs folder, sharing code between frontend and backend is more flexiable
- facade design pattern

2. What would you change?

- **[Done]** From StockComponent the chart data is subscribing and passing to ChartComponent as input instead of Observables, so there is no subscription is required in ChartComponent

- **[Done]** Created separate shared constant file for both chart and stock component instead of common one, that will increase the reusability & maintainability when the application grows

- **[Done]** Created separate interface for variable type definition

3. Are there any code smells or problematic implementations?

- **[Fixed]** Google chart is not working with Data selection.
- **[Fixed]** 'unsubscribe()' was not used for Observables subscription
- **[Fixed]** Test cases are failing.
- **[Fixed]** Proper type definition was not there for variables
