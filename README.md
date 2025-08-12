📱 SignUp-Login - React Native Authentication Flow
📋 Objective
The goal of this project is to create a React Native application with Login and Signup functionality using the React Context API for global authentication state management.

This assignment demonstrates:

Authentication flows

State management using Context API

Form handling with validations

Navigation using React Navigation

Optional authentication persistence

🚀 Features
1. Authentication Context Setup
Implemented using React Context API

Provides:

login() – Log in a user

signup() – Create a new user

logout() – Log out the user

user – Stores logged-in user information

2. Screens
Login Screen
Input fields: Email, Password

Validations:

Invalid email format

Password required

Incorrect credentials

Actions:

Login button calls login() from AuthContext

Go to Signup button navigates to Signup screen

Signup Screen
Input fields: Name, Email, Password

Validations:

Required fields check

Invalid email format

Password must be at least 6 characters

Actions:

Signup button calls signup() from AuthContext

Go to Login button navigates back

Home Screen
Displays logged-in user’s name and email

Logout button clears auth state and navigates to Login

3. Optional Features
Persist Authentication with AsyncStorage

Password Visibility Toggle using an eye icon

🛠️ Tech Stack
React Native 0.80.2

React Context API

React Navigation (Native Stack)

AsyncStorage for persistence

react-native-size-matters for responsive UI

📦 Installation & Setup
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/<your-username>/videocallapp-auth.git
cd videocallapp-auth
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Start Metro Server
bash
Copy
Edit
npm start
4️⃣ Run the App
For Android:
bash
Copy
Edit
npm run android
For iOS:
bash
Copy
Edit
npm run ios
📂 Project Structure
css
Copy
Edit
src/
 ├── contexts/
 │   └── AuthContext.js
 ├── screens/
 │   ├── LoginScreen.js
 │   ├── SignupScreen.js
 │   └── HomeScreen.js
 ├── navigation/
 │   └── AppNavigator.js
 ├── utils/
 │   └── validations.js
 └── App.js
🖼️ Demo
Login Screen	Signup Screen	Home Screen

📜 Validations
Email Format – Must be a valid email

Password Length – Minimum 6 characters

Required Fields – Cannot be empty

👨‍💻 Author
Rakesh Rao
📧 [your-email@example.com]
🔗 GitHub

