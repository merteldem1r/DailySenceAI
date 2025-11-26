# DailySenceAI - Test Case

## About the Project

**DailySenceAI** is an AI-powered mood tracking and sentiment analysis mobile application built with React Native and Expo. The app helps users track their daily emotional state by analyzing their written thoughts and providing personalized insights, summaries, and suggestions based on AI sentiment analysis.

## App Preview

![2](https://github.com/user-attachments/assets/81fcd65e-a29e-4653-ac50-a5dc6db6abb7)
![3](https://github.com/user-attachments/assets/3f96a1bd-54c8-4d5a-9c2d-5088fb424c85)

## Key Features

### Home Screen - Daily Check-in

- **Text Input**: Users can write about their thoughts, feelings, and daily experiences (minimum 20 characters)
- **Real-time Validation**: Character counter with visual feedback (color-coded for valid/invalid input)
- **AI Analysis Button**: Triggers sentiment analysis with loading states
- **Helpful Tips**: Quick guidance cards for better journal entries

### AI Sentiment Analysis

- **Hugging Face Integration**: Uses `finiteautomata/bertweet-base-sentiment-analysis` model
- **Three Sentiment Types**: Positive, Neutral, Negative
- **Confidence Scores**: Returns sentiment confidence percentage (0-100%)
- **Score-Based Responses**: 4 different response levels based on confidence:
  - Very Strong (85%+)
  - Strong (70-84%)
  - Moderate (55-69%)
  - Mild (<55%)
- **Smart Summaries**: AI-generated summaries of user's emotional state
- **Personalized Suggestions**: Contextual advice based on detected sentiment

### History Screen

- **Entry Cards**: All past entries displayed as interactive cards
- **Delete Functionality**: Individual entry deletion with confirmation, clearing all button.

### Profile Screen

- **User Information**: Editable name and email
- **Avatar with Edit Button**: Quick access to profile editing
- **Statistics Dashboard**:
  - Total Entries count
  - Positive entries count
  - Neutral entries count
  - Negative entries count
- **Real-time Updates**: Stats refresh automatically when visiting the screen
- **Profile Editing Modal**: Clean modal interface for updating user info

### Environment Variables

```env
EXPO_PUBLIC_TMDB_API_KEY=<your_api_key>
EXPO_PUBLIC_TMDB_ACCESS_TOKEN=your_access_token![Uploading IMG_2820.PNG…]()

```

Get your credentials from [TMDB](https://www.themoviedb.org/settings/api).

---

## Technologies & Tools

### Core Framework

- **React Native** - Mobile app framework
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe JavaScript

### UI Libraries

- **React Native Paper** - Material Design components
- **NativeWind** - Tailwind CSS for React Native
- **@expo/vector-icons** - Material Community Icons

### AI & Machine Learning

- **@huggingface/inference** - Official Hugging Face client library
- **Hugging Face Models**:
  - `finiteautomata/bertweet-base-sentiment-analysis` - Main sentiment analysis model

### Storage & State Management

- **@react-native-async-storage/async-storage** - Local data persistence
- **React Hooks** - State management (useState, useCallback, useFocusEffect)

## Data Flow

### Analysis Flow

1. User enters text (min 20 characters)
2. `useAnalyze` hook validates input
3. Calls `AIService.analyzeText()`
4. Hugging Face API returns sentiment + score
5. `getSentimentTexts()` generates contextual summary/suggestion
6. Entry object created with all data
7. Saved to AsyncStorage via `StorageService`
8. Results displayed in modal
9. Input cleared for next entry

## Getting Started

### Running the Project

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

#### Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set up environment variables

   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_HUGGING_FACE_TOKEN=your_token_here
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
