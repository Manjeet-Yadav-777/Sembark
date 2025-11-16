# Sembark - E-Commerce Project

A modern e-commerce web application built with React, TypeScript, and Vite. This project features product listings, detailed product pages, shopping cart functionality, and more.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [Technologies Used](#technologies-used)

## Prerequisites

Before you start, make sure you have the following installed on your computer:

### 1. Node.js and npm

**What is Node.js?**  
Node.js is a runtime environment that allows you to run JavaScript on your computer. npm (Node Package Manager) comes with Node.js and helps you install project dependencies.

**How to Install:**

#### For Windows:

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version (recommended)
3. Run the downloaded installer file (`.msi`)
4. Follow the installation wizard:
   - Click "Next" on all screens
   - Accept the license agreement
   - Keep default installation path
   - Make sure "Add to PATH" is checked
   - Click "Install"
5. Wait for installation to complete
6. Click "Finish"

#### For macOS:

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS** version
3. Open the downloaded `.pkg` file
4. Follow the installation instructions
5. Click through the installer

#### For Linux:

Open your terminal and run:

```bash
sudo apt update
sudo apt install nodejs npm
```

**Verify Installation:**

1. Open your **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
2. Type the following commands and press Enter after each:
   ```bash
   node --version
   npm --version
   ```
3. You should see version numbers (like `v20.x.x` and `10.x.x`)
4. If you see version numbers, you're all set! ✅

### 2. Git (Optional but Recommended)

**What is Git?**  
Git helps you download projects from GitHub easily.

**How to Install:**

- **Windows/Mac:** Download from [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **Linux:** Run `sudo apt install git` in terminal

## Installation Guide

Follow these steps carefully to set up the project on your local computer:

### Step 1: Download the Project

You have two options:

#### Option A: Using Git (Recommended)

1. Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
2. Navigate to the folder where you want to save the project. For example:
   ```bash
   cd Desktop
   ```
3. Copy the project URL from GitHub (it looks like: `https://github.com/username/sembark.git`)
4. Run this command (replace with your actual URL):
   ```bash
   git clone https://github.com/username/sembark.git
   ```
5. Wait for the download to complete

#### Option B: Download as ZIP

1. Go to the project's GitHub page
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file to a folder on your computer (like Desktop)

### Step 2: Open the Project Folder

1. Navigate to the project folder:
   - If you used Git: The folder is already in the location where you ran the `git clone` command
   - If you downloaded ZIP: Go to where you extracted the ZIP file
2. The folder should be named `Sembark` or `sembark`

### Step 3: Open Terminal/Command Prompt in Project Folder

**For Windows:**

1. Open the project folder in File Explorer
2. Click in the address bar at the top
3. Type `cmd` and press Enter
   - OR right-click in the folder and select "Open in Terminal" or "Open PowerShell here"

**For Mac/Linux:**

1. Open the project folder in Finder (Mac) or File Manager (Linux)
2. Right-click in the folder
3. Select "Open Terminal Here" or "Open in Terminal"

**Alternative Method:**

1. Open Command Prompt/Terminal
2. Use `cd` command to navigate to the project folder:
   ```bash
   cd path/to/Sembark
   ```
   Example:
   ```bash
   cd C:\Users\YourName\Desktop\Sembark
   ```
   (Replace with your actual folder path)

### Step 4: Install Project Dependencies

**What are dependencies?**  
Dependencies are external libraries and tools that the project needs to run. Think of them as ingredients needed to cook a recipe.

1. Make sure you're in the project folder in your terminal
2. Run this command:
   ```bash
   npm install
   ```
3. Wait for the installation to complete (this may take 2-5 minutes)
   - You'll see a lot of text scrolling
   - Look for messages like "added X packages" or "found 0 vulnerabilities"
   - Don't worry about warnings (yellow text) - they're usually fine
4. When you see your command prompt again (with the folder path), installation is complete! ✅

**What if you get an error?**

- Make sure you have Node.js installed (check Step 1)
- Make sure you're in the correct folder (the one with `package.json` file)
- Try running `npm install` again

## Running the Project

Now that everything is installed, let's start the project:

### Step 1: Start the Development Server

1. Make sure you're in the project folder in your terminal
2. Run this command:
   ```bash
   npm run dev
   ```
3. Wait a few seconds - you'll see output like:

   ```
   VITE v7.x.x  ready in xxx ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

4. **Keep this terminal window open** - don't close it!

### Step 2: Open the Project in Your Browser

1. Open your web browser (Chrome, Firefox, Edge, Safari - any browser works)
2. Go to this address:
   ```
   http://localhost:5173
   ```
   - Type it in the address bar and press Enter
   - OR click the link if it appears in your terminal
3. You should now see the Sembark website! 🎉

### Step 3: Viewing the Project

- The website will automatically update when you make changes to the code
- You can navigate through different pages:
  - **Home Page:** Shows all products
  - **Product Detail Page:** Click on any product to see details
  - **Cart Page:** View items in your shopping cart

### Step 4: Stopping the Server

When you're done viewing the project:

1. Go back to your terminal window
2. Press `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac)
3. The server will stop
4. You can close the terminal window

## Project Structure

Here's what the main folders and files do:

```
Sembark/
├── src/                    # Main source code
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx     # Navigation bar
│   │   ├── Footer.tsx     # Footer component
│   │   └── Products.tsx   # Product listing component
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Home page
│   │   ├── ProductDetail.tsx  # Product detail page
│   │   └── CartPage.tsx   # Shopping cart page
│   ├── context/            # State management
│   │   └── AppContext.tsx # Global app state
│   ├── routes/            # Routing configuration
│   │   └── AppRouter.tsx # Page routes
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Application entry point
├── public/                # Static files (images, etc.)
├── package.json           # Project configuration and dependencies
├── vite.config.ts        # Vite build tool configuration
└── README.md             # This file!
```

## Available Scripts

You can run these commands in the project folder:

### `npm run dev`

- Starts the development server
- Opens the project at `http://localhost:5173`
- Use this to view and test the project

### `npm run build`

- Creates an optimized production build
- Generates files in the `dist` folder
- Use this when you want to deploy the project

### `npm run preview`

- Previews the production build locally
- Run this after `npm run build`

### `npm run lint`

- Checks code for errors and style issues
- Helps maintain code quality

## Troubleshooting

### Problem: "node: command not found" or "npm: command not found"

**Solution:** Node.js is not installed or not in your PATH. Reinstall Node.js from [nodejs.org](https://nodejs.org/)

### Problem: "npm install" fails or takes too long

**Solutions:**

- Check your internet connection
- Try clearing npm cache: `npm cache clean --force`
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again
- Try using a different network (some corporate networks block npm)

### Problem: Port 5173 is already in use

**Solution:**

- Another program is using port 5173
- Close other applications using that port
- Or change the port in `vite.config.ts`

### Problem: Website shows "Cannot GET /" or blank page

**Solutions:**

- Make sure the dev server is running (`npm run dev`)
- Check that you're going to `http://localhost:5173` (not `localhost:3000`)
- Try refreshing the page (F5 or Ctrl+R)
- Clear browser cache

### Problem: Changes not showing in browser

**Solutions:**

- Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- Make sure the dev server is running
- Check the terminal for any error messages

### Problem: "Module not found" errors

**Solution:**

- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Still Having Issues?

1. **Check Node.js version:** Run `node --version` - should be v18 or higher
2. **Check npm version:** Run `npm --version` - should be v9 or higher
3. **Read error messages carefully** - they often tell you what's wrong
4. **Search for the error message** on Google or Stack Overflow
5. **Make sure you're in the correct folder** - the one with `package.json`

## Technologies Used

This project is built with modern web technologies:

- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Vite** - Fast build tool and development server
- **React Router** - For navigation between pages
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - For making HTTP requests
- **React Hot Toast** - For showing notifications

## Additional Notes

- The project uses **Vite** as the build tool, which provides fast development experience
- All code is written in **TypeScript** for better code quality
- The project follows modern React best practices
- State management is handled using React Context API

## Need Help?

If you're stuck:

1. Read the error message carefully
2. Check this README's troubleshooting section
3. Search online for the specific error
4. Make sure all prerequisites are installed correctly

---

**Happy Coding! 🚀**

If you found this project helpful, consider giving it a star on GitHub!
