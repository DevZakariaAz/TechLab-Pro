# 📱 React Native App Structure with File System Routing (Expo Router)

## 🔍 Summary

This project uses **Expo Router** to implement file-based navigation in a React Native application. The routing system is inspired by Next.js, where the folder and file structure directly determines the app's navigation paths.

The core directory for routing is the `app/` folder. Each file or folder inside `app/` automatically becomes a screen or a group of screens, allowing intuitive and scalable navigation without manual route declarations.

### 🗂 Structure Overview
- `app/`
This is the root folder where all your app's routes live. Every file or folder inside it becomes a route or layout in the navigation.

- `app/_layout.tsx`
Defines the root layout for your app. Typically wraps all child routes with a Stack navigator, allowing nested screens to function within a navigation context.

- `app/+not-found.tsx`
A special screen that is automatically shown when the user navigates to an undefined or non-existent route. Acts like a "404 Not Found" page.

- `app/(tabs)/`
A group folder used to organize related routes, like those within a tab navigator. The parentheses in the folder name mean it doesn't affect the URL path.

- `app/(tabs)/_layout.tsx`
This layout defines the Tab navigator for all screens inside the (tabs) folder. Each screen here becomes a separate tab in the UI.

- `app/(tabs)/index.tsx`
This is the default tab screen, typically the home tab. It's shown when navigating to the base path of the tabs layout.

- `app/(tabs)/explore.tsx`
Another tab screen. Navigating to /explore will render this screen within the tab layout.

---

## 🧭 File System Routing - How It Works

File system routing maps your file and folder structure to app navigation paths automatically:

- **`_layout.tsx`**  
  Used to wrap child routes with navigators (e.g., Stack, Tabs). Nested layouts can create scoped navigators.

- **`index.tsx`**  
  The default route for a folder. `app/index.tsx` is the root screen; `(tabs)/index.tsx` is the default tab.

- **`(name)/`**  
  Grouped routes. Parentheses in folder names (e.g., `(tabs)/`) allow grouping without affecting the URL path.

- **`+not-found.tsx`**  
  Special route shown when navigating to an undefined path (404 behavior).

- **Dynamic Routes** (not in this example but supported):  
  Use `[param].tsx` to create dynamic paths (e.g., `app/profile/[id].tsx` → `/profile/123`).

---

## ✅ Benefits

- No manual route registration
- Clean and scalable file structure
- Supports nested and grouped navigators
- Intuitive URL mapping for native apps

---

