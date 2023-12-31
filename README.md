## How to Run the Task Management System

1. **Start JSON Server:**
   - Simulate the backend API using JSON Server.
   - Run the following command:
     ```bash
     json-server --watch db.json
     ```
   - Access the API at `http://localhost:3000`.

2. **Install Dependencies:**
   - Ensure Node.js and npm are installed.
   - Install project dependencies with:
     ```bash
     npm install
     ```

3. **Run Angular Application:**
   - Start the Angular development server:
     ```bash
     ng serve
     ```
   - Access the application at `http://localhost:4200/`.

4. **Access the Application:**
   - Open your web browser and go to `http://localhost:4200/`.

5. **Explore and Interact:**
   - Explore task management features.
   - Changes made in the app reflect in real-time in the JSON Server's `db.json` file.


# TaskManagement
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.10.
## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.