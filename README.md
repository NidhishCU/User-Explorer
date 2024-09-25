# User Explorer App

A React Native application built using Expo, demonstrating infinite scrolling of user data fetched from DummyJSON API, along with post details for individual users.

## 📱 Screenshots

![Splash Screen](./screenshots/user_list.png)
![Posts Screen](./screenshots/posts_list.png)
![User List Screen](./screenshots/user_list.png)
![Posts Screen](./screenshots/posts_list.png)

## 📥 APK Download

[Download the APK](./path-to-your-apk-file.apk)

## 🚀 Features

- **User List**: Fetch and display a paginated list of users with infinite scrolling.
- **User Posts**: Click on a user to view their posts, with post titles and body details.
- **No Posts Found Handling**: Gracefully handles cases where users don't have any posts, showing their basic information and a "No posts found" message.
- **Loading Indicators**: Displays loading indicators while fetching data and during infinite scrolls.
- **Responsive UI**: The UI is responsive and adapts to different screen sizes.

## 🛠️ Tech Stack

- **React Native**: Core framework for building the cross-platform mobile app.
- **Expo**: For easy setup and building of the React Native app.
- **MobX-State-Tree**: State management for handling app-wide data efficiently.
- **React Navigation**: Navigation library for managing navigation between screens.
- **Axios**: For making HTTP requests to fetch data from the DummyJSON API.
- **DummyJSON API**: Source of user and post data for the app.
- **TypeScript**: Type-safe code for improved developer experience.

## ⚙️ Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-explorer-app.git
   cd user-explorer-app
   npm install
   npm expo start

## 🔗 API Reference

### Get All Users
**Endpoint**: `GET https://dummyjson.com/users?limit={limit}&skip={skip}`

### Get Posts for a User
**Endpoint**: `GET https://dummyjson.com/users/{userId}/posts`

## 💡 How It Works
- The app fetches users from DummyJSON API and displays them in a list.
- When a user is clicked, the app fetches posts from DummyJSON API.
- Infinite scrolling is implemented to load more data as the user scrolls down.

## ✍️ Author
- Nidhish

## 🎉 Acknowledgements
- Thanks to the DummyJSON API for providing the sample data used in this project.

## 🧩 Contributing
Feel free to fork this project, create a feature branch, and submit pull requests!

