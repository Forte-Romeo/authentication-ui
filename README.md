# 🔐 Authentication UI — React

A modern and responsive **Authentication UI** built with React and Vite.

This project was built as a practical React learning project after completing the fundamentals of React. It focuses on building reusable components, managing state, passing props, handling forms, validating user input, and creating a polished user experience.

The project includes Login, Sign Up, and Forgot Password views with frontend-only authentication flows.

> **Note:** This is a frontend authentication UI project. It does not connect to a backend, database, authentication provider, or real user accounts.

---

## 📌 Project Overview

The Authentication UI simulates the frontend experience of a modern authentication system.

Users can:

- Sign in
- Create an account
- Recover a forgotten password
- Show and hide passwords
- Receive validation feedback
- See loading states
- See success messages
- Switch between authentication views

The project was intentionally kept frontend-only so the focus remains on learning and applying React fundamentals.

---

## ✨ Features

### 🔑 Login

- Email input
- Password input
- Show/hide password
- Remember me checkbox
- Forgot password navigation
- Sign-up navigation
- Required-field validation
- Email format validation
- Loading state
- Success message
- Disabled submit button while submitting

### 📝 Sign Up

- Full name input
- Email input
- Password input
- Confirm password input
- Show/hide password
- Password requirements
- Password validation
- Confirm-password validation
- Terms & Conditions checkbox
- Required-field validation
- Email format validation
- Loading state
- Success message
- Disabled submit button while submitting

### 🔄 Forgot Password

- Email input
- Email validation
- Required-field validation
- Loading state
- Reset-link success message
- Navigation back to Login

### 🎨 UI & UX

- Clean authentication card layout
- Responsive design
- Mobile-friendly layout
- Input focus states
- Error states
- Success states
- Disabled button states
- Password visibility controls
- Password requirement indicators
- Accessible form feedback
- Consistent typography and spacing
- Smooth UI transitions

---

## 🧠 React Concepts Practiced

This project was built specifically to reinforce the React concepts learned during the React learning phase.

### 1. JSX

Used JSX to build the application's UI and structure.

Example:

```jsx
<h2>Welcome back</h2>
<p>Sign in to continue to your account.</p>
```

### 2. Components

The application was broken into reusable components instead of placing everything inside one large component.

Main reusable components include:

- `AuthLayout`
- `Input`
- `Button`
- `PasswordRequirements`

The authentication views are also separated into individual page components:

- `Login`
- `Signup`
- `ForgotPassword`

### 3. Props

Props are used to pass data and functions between components.

Example:

```jsx
<Input
  label="Email address"
  type="email"
  placeholder="Enter your email"
/>
```

Functions are also passed as props:

```jsx
<Login
  onSignup={() => setAuthMode("signup")}
  onForgotPassword={() => setAuthMode("forgot")}
/>
```

### 4. State with `useState`

State is used to manage dynamic application data.

Examples include:

- Email
- Password
- Full name
- Confirm password
- Authentication view
- Password visibility
- Validation errors
- Loading state
- Success messages
- Terms acceptance

Example:

```jsx
const [email, setEmail] = useState("");
```

### 5. Event Handling

The project handles several user events:

- `onChange`
- `onClick`
- `onSubmit`

Example:

```jsx
onChange={(event) => setEmail(event.target.value)}
```

### 6. Conditional Rendering

Different authentication views are displayed depending on the current authentication mode.

Example:

```jsx
{authMode === "login" && <Login />}
{authMode === "signup" && <Signup />}
{authMode === "forgot" && <ForgotPassword />}
```

### 7. Callback Props

Child components communicate user actions back to the parent using callback functions passed through props.

Example:

```jsx
<Login
  onSignup={() => setAuthMode("signup")}
/>
```

The child can then trigger:

```jsx
onSignup();
```

### 8. Controlled Components

All form inputs are controlled by React state.

Example:

```jsx
<Input
  value={email}
  onChange={(event) => setEmail(event.target.value)}
/>
```

This allows React to keep track of the form values.

### 9. Form Handling

Forms use React event handling instead of relying on the browser's default form submission behavior.

Example:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  // validation and submission logic
}
```

### 10. Conditional UI States

The application changes its interface based on state.

Examples:

```text
Normal
   ↓
Loading
   ↓
Success
```

and:

```text
Input
   ↓
Validation
   ↓
Error message
```

### 11. Rendering Lists with `.map()`

The password requirements component uses `.map()` to dynamically render requirements.

Example:

```jsx
requirements.map((requirement) => (
  <li key={requirement.label}>
    {requirement.label}
  </li>
))
```

### 12. Reusable Components

The project demonstrates how common UI elements can be turned into reusable components.

For example:

```jsx
<Button>Sign In</Button>

<Button>Create Account</Button>

<Button>Send Reset Link</Button>
```

All use the same reusable `Button` component.

### 13. `children` Prop

The `AuthLayout` component uses the `children` prop to allow different authentication pages to be rendered inside the same layout.

Example:

```jsx
<AuthLayout>
  <Login />
</AuthLayout>
```

The content inside `AuthLayout` is rendered through:

```jsx
{children}
```

---

## 🏗️ Project Architecture

The project follows a simple component-based React structure.

```text
authentication-ui/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── AuthLayout.jsx
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── PasswordRequirements.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ForgotPassword.jsx
│   │
│   ├── utils/
│   │   └── validation.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── README.md
```

---

## 📂 Folder & File Explanation

### `src/components/`

Contains reusable UI components.

#### `AuthLayout.jsx`

Provides the main authentication page and card layout.

It uses the `children` prop to render different authentication pages inside the same layout.

---

#### `Button.jsx`

Reusable button component.

Supports:

- Button text
- Submit buttons
- Loading state
- Disabled state

Example:

```jsx
<Button
  type="submit"
  loading={loading}
>
  Sign In
</Button>
```

---

#### `Input.jsx`

Reusable form input component.

Supports:

- Labels
- Input types
- Placeholders
- Controlled values
- Change events
- Password visibility
- Validation errors
- Accessibility attributes

---

#### `PasswordRequirements.jsx`

Displays password requirements dynamically.

The component checks whether the password:

- Has at least 8 characters
- Contains a number
- Contains an uppercase letter

The requirements update as the user types.

---

### `src/pages/`

Contains the different authentication views.

#### `Login.jsx`

Responsible for:

- Login form
- Email state
- Password state
- Password visibility
- Login validation
- Loading state
- Success feedback
- Navigation to Sign Up
- Navigation to Forgot Password

---

#### `Signup.jsx`

Responsible for:

- Registration form
- Full name state
- Email state
- Password state
- Confirm password state
- Password visibility
- Password requirements
- Form validation
- Terms acceptance
- Loading state
- Success feedback
- Navigation back to Login

---

#### `ForgotPassword.jsx`

Responsible for:

- Password recovery form
- Email state
- Email validation
- Loading state
- Success feedback
- Navigation back to Login

---

### `src/utils/`

Contains reusable application logic.

#### `validation.js`

Contains reusable validation functions.

Currently includes:

```js
isValidEmail()
```

Example:

```js
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

This prevents the same email validation logic from being duplicated across multiple components.

---

### `App.jsx`

Acts as the main controller for the authentication views.

It manages:

```jsx
const [authMode, setAuthMode] = useState("login");
```

and determines which authentication page is displayed.

---

### `App.css`

Contains the main styling for:

- Authentication card
- Forms
- Inputs
- Buttons
- Error messages
- Success messages
- Password requirements
- Checkboxes
- Focus states
- Responsive behavior

---

### `index.css`

Contains global styles and CSS resets.

---

### `main.jsx`

The entry point of the React application.

It mounts the `App` component into the DOM.

---

## 🔄 Application Flow

The authentication views are controlled by state inside `App.jsx`.

```text
                         App
                          │
                    authMode state
                          │
            ┌─────────────┼─────────────┐
            │             │             │
            ▼             ▼             ▼
          login         signup        forgot
            │             │             │
            ▼             ▼             ▼
          Login         Signup      ForgotPassword
            │             │             │
            └─────────────┼─────────────┘
                          │
                    AuthLayout
```

---

## 🔑 Login Flow

```text
User opens application
        ↓
Login view appears
        ↓
User enters email
        ↓
User enters password
        ↓
User submits form
        ↓
React validates input
        ↓
 ┌──────┴──────┐
 │             │
 ▼             ▼
Invalid       Valid
 │             │
 ▼             ▼
Errors       Loading
shown          │
               ▼
            Success
```

---

## 📝 Sign Up Flow

```text
User opens Sign Up
        ↓
Enter full name
        ↓
Enter email
        ↓
Enter password
        ↓
Password requirements update
        ↓
Confirm password
        ↓
Accept Terms & Conditions
        ↓
Submit
        ↓
Validation
        ↓
 ┌──────┴──────┐
 │             │
 ▼             ▼
Invalid       Valid
 │             │
 ▼             ▼
Errors       Loading
shown          │
               ▼
            Success
```

---

## 🔄 Forgot Password Flow

```text
Login
  ↓
Forgot Password
  ↓
Enter Email
  ↓
Validate Email
  ↓
 ┌──────┴──────┐
 │             │
 ▼             ▼
Invalid       Valid
 │             │
 ▼             ▼
Error        Loading
               │
               ▼
            Success
```

---

## 🧩 Component Relationship

```text
App
│
└── AuthLayout
    │
    ├── Login
    │   ├── Input
    │   ├── Input
    │   └── Button
    │
    ├── Signup
    │   ├── Input
    │   ├── Input
    │   ├── Input
    │   ├── PasswordRequirements
    │   ├── Input
    │   └── Button
    │
    └── ForgotPassword
        ├── Input
        └── Button
```

---

## 🛠️ Technologies Used

### Frontend

- React
- JavaScript
- JSX
- CSS
- HTML

### Development Tools

- Vite
- npm
- Git
- GitHub
- VS Code

---

## 📦 Dependencies

The project uses:

- React
- React DOM

The application was created using Vite.

No external UI framework or component library was used.

No authentication library was used.

No backend API is connected.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Forte-Romeo/authentication-ui.git
```

### 2. Navigate Into the Project

```bash
cd authentication-ui
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Vite will provide a local development URL, usually similar to:

```text
http://localhost:5173
```

Open the URL in your browser.

---

## 🧪 Testing the Application

### Login Testing

Try submitting the login form without entering anything.

Expected result:

```text
Email is required.
Password is required.
```

Try an invalid email:

```text
abc
```

Expected result:

```text
Please enter a valid email address.
```

Try valid login input:

```text
romeo@example.com
password123
```

Expected result:

```text
Please wait...
```

followed by:

```text
Login successful.
```

---

### Sign Up Testing

Test the following:

- Empty full name
- Empty email
- Invalid email
- Empty password
- Password shorter than 8 characters
- Password without a number
- Password without an uppercase letter
- Mismatched passwords
- Terms not accepted

Each should produce appropriate validation feedback.

---

### Password Visibility Testing

Click:

```text
Show
```

to reveal the password.

Click:

```text
Hide
```

to hide the password again.

---

### Forgot Password Testing

Try:

```text
Empty email
Invalid email
Valid email
```

A valid email should eventually display:

```text
If an account exists with this email, a reset link has been sent.
```

---

## 📱 Responsive Design

The UI was designed to work across different screen sizes.

Test the application on:

- Desktop
- Laptop
- Tablet
- Mobile

The authentication card automatically adapts to smaller screens.

The project includes a mobile breakpoint for screens below 480px.

---

## ♿ Accessibility

Several basic accessibility practices were implemented.

### Labels

Inputs are associated with labels using:

```jsx
<label htmlFor={id}>
```

and:

```jsx
<input id={id}>
```

---

### Validation Feedback

Invalid inputs use:

```html
aria-invalid
```

and:

```html
aria-describedby
```

to associate inputs with their error messages.

---

### Password Controls

Password visibility buttons include descriptive `aria-label` values.

---

### Keyboard Support

The forms use standard HTML inputs and buttons, allowing normal keyboard navigation.

---

## 🎨 Design Direction

The interface uses a minimal, clean authentication aesthetic.

### Design Principles

- Minimal
- Modern
- Clean
- Professional
- Responsive
- Accessible
- Simple

### Visual Style

The design uses:

- Neutral colors
- White authentication card
- Dark primary buttons
- Soft borders
- Subtle shadows
- Rounded corners
- Minimal visual distractions

---

## 🎯 Project Goals

The primary purpose of this project was not to build a production authentication system.

The goal was to practice React fundamentals by building something realistic.

The project helped reinforce:

```text
Components
Props
State
Events
Conditional Rendering
Forms
Controlled Inputs
Validation
Reusable Components
Array Rendering
UX States
Accessibility
Responsive Design
```

---

## 🚧 Current Limitations

This project is frontend-only.

There is currently no:

- Backend
- Database
- Real user registration
- Real login authentication
- Password hashing
- JWT authentication
- Session management
- OAuth
- Email verification
- Password reset email
- API integration

The authentication requests are simulated using:

```js
setTimeout()
```

For example:

```js
setTimeout(() => {
  setLoading(false);
  setSuccess("Login successful.");
}, 1500);
```

This is intentionally simulated because the purpose of this project is to practice React frontend development.

---

## 🔮 Future Improvements

Possible future versions could add the following.

### 1. Authentication Backend

Connect the React frontend to a real backend.

```text
React
   ↓
REST API
   ↓
Backend
   ↓
Database
```

---

### 2. Real Authentication

Implement:

- User registration
- Login
- Logout
- Password hashing
- Session management
- JWT authentication
- Protected routes

---

### 3. Password Reset

Implement:

```text
Forgot Password
      ↓
Backend
      ↓
Email Service
      ↓
Reset Link
      ↓
Reset Password
```

---

### 4. Email Verification

After registration:

```text
Create Account
      ↓
Verification Email
      ↓
Verify Email
      ↓
Account Activated
```

---

### 5. Social Authentication

Possible future providers:

- Google
- GitHub
- Apple

---

### 6. React Router

The current project switches views using React state.

A future version could use React Router with routes such as:

```text
/login
/signup
/forgot-password
```

---

### 7. API Integration

The simulated:

```js
setTimeout()
```

could eventually be replaced with:

```js
fetch()
```

or another API client.

---

### 8. Authentication Dashboard

After successful authentication, the project could be extended with a protected dashboard.

Example:

```text
Login
  ↓
Authentication
  ↓
Dashboard
  ↓
User Profile
  ↓
Settings
  ↓
Logout
```

---

## 📚 What I Learned

Building this project helped me understand how individual React concepts work together in a real application.

Instead of learning:

```text
Components
Props
State
Events
```

as isolated concepts, I was able to combine them into an actual project.

One of the biggest lessons from the project was understanding the relationship between parent and child components.

```text
Parent
  │
  │ passes props
  ▼
Child
  │
  │ triggers callback
  ▼
Parent state changes
  │
  ▼
React re-renders
```

This pattern is fundamental to building React applications.

---

## 📈 Learning Progression

This project was built progressively through multiple phases.

### Phase 1 — Project Setup & Cleanup

- Cleaned the default Vite files
- Established the React project structure

### Phase 2 — Static Authentication Dashboard/UI

- Built the initial authentication interface
- Created the visual layout

### Phase 3 — Componentization & Props

- Created reusable components
- Introduced props
- Reduced duplicated UI code

### Phase 4 — State & Interactivity

- Added `useState`
- Added password visibility
- Added interactive authentication view switching

### Phase 5 — Login, Sign Up & Forgot Password Views

- Created separate authentication pages
- Introduced page-level component organization
- Used callback props for navigation

### Phase 6 — Form Handling, Validation & UX

- Added form submission
- Added validation
- Added error states
- Added loading states
- Added success states

### Phase 7 — Final UX Polish & Project Cleanup

- Improved visual hierarchy
- Improved responsiveness
- Added accessibility improvements
- Added password requirements
- Improved input states
- Improved button states
- Cleaned project architecture
- Removed unnecessary code

---

## 📊 Project Status

```text
Frontend UI              ✅ Complete
React Components         ✅ Complete
Props                    ✅ Complete
State                    ✅ Complete
Forms                    ✅ Complete
Validation               ✅ Complete
Loading States           ✅ Complete
Success States           ✅ Complete
Responsive Design        ✅ Complete
Accessibility            ✅ Complete
Project Cleanup          ✅ Complete
Backend                  ❌ Not Implemented
Database                 ❌ Not Implemented
Real Authentication      ❌ Not Implemented
```

---

## 📸 Application Views

The application contains three primary authentication views.

### Login

```text
FORTE AUTH

Welcome back

Sign in to continue to your account.

Email address
[________________________]

Password
[________________________]

☐ Remember me       Forgot password?

[       Sign In       ]

Don't have an account? Sign up
```

### Sign Up

```text
FORTE AUTH

Create an account

Join Forte and get started today.

Full name
[________________________]

Email address
[________________________]

Password
[________________________]

Password requirements:

✓ At least 8 characters
✓ Contains a number
○ Contains an uppercase letter

Confirm password
[________________________]

☐ I agree to the Terms & Conditions

[    Create Account    ]

Already have an account? Sign in
```

### Forgot Password

```text
FORTE AUTH

Forgot password?

Enter your email and we'll send you
a password reset link.

Email address
[________________________]

[    Send Reset Link    ]

Remember your password? Sign in
```

---

## 💻 Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

---

## 🌱 Future Learning Path

This project is part of a broader frontend development learning journey.

The concepts learned here provide a foundation for more advanced React development.

```text
React Fundamentals
       ↓
Components
       ↓
Props
       ↓
State
       ↓
Forms
       ↓
Authentication UI
       ↓
React Router
       ↓
useEffect
       ↓
API Integration
       ↓
Advanced React
       ↓
Full-Stack Development
```

---

## 👨‍💻 Author

**Ferguson (Forte) Romeo**

BSc Information Technology Student 

Aspiring Software + AI Engineer

This project was built as part of my journey toward becoming a professional software engineer.

---

## 📄 License

This project is intended primarily for learning and portfolio purposes.

You are free to study, modify, and build upon the code for educational purposes.

---

## 🔗 Project Links

### GitHub Repository

```text
https://github.com/Forte-Romeo/authentication-ui
```

---

## ⭐ Final Note

This project represents a transition from simply learning React syntax to actually using React to build an interactive application.

The project intentionally focuses on the fundamentals:

```text
React
+
Components
+
Props
+
State
+
Events
+
Forms
+
Validation
+
Reusable UI
+
UX
+
Accessibility
```

The Authentication UI is now complete as a frontend React project.

The next step is to continue building projects that introduce new React concepts while reusing the fundamentals learned here.

---

## 🔐 Authentication UI — React

Built with React + Vite.
