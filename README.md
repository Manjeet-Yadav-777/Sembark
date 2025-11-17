# Sembark - E-Commerce Application

🚀 **Live Demo:** https://sembark-alpha.vercel.app/

A modern, responsive e-commerce web application built with React, TypeScript, and Vite. Features product listings, detailed product pages, shopping cart functionality, and smooth animations.

## 📦 Features

### 🏠 Home Page

- Responsive product grid with smooth animations
- Category filters with URL-based state management
- Sorting functionality (Price: Low/High, Name: A-Z/Z-A)
- Real-time filter updates
- Accessible UI with semantic HTML
- Loading states and empty states

### 🛒 Cart

- Add to cart functionality
- Increase/decrease quantity
- Remove products from cart
- Persistent cart using localStorage
- Total price calculation
- Empty cart state with call-to-action
- Responsive cart layout

### 📄 Product Details Page

- Dynamic routing (`/product/:id`)
- Comprehensive product information display
- Add to cart and Buy Now buttons
- Product image with hover effects
- Price details with discount indicators
- Back navigation
- Accessible image with alt text

### 🎨 UI/UX Features

- Smooth animations using Framer Motion
- Responsive design (mobile, tablet, desktop)
- Modern and clean interface
- Toast notifications for user actions
- Hover effects and transitions

### 🧪 Testing (Cypress)

- Home page tests
- Product details page tests
- Cart page tests
- Basic page functionality verification

## 🔧 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Context API** - State management
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **Cypress** - E2E testing
- **FakeStore API** - Product data

## 📁 Folder Structure

```
src/
  components/
    Navbar.tsx          # Navigation bar with cart icon
    Footer.tsx          # Footer component
    Products.tsx        # Product listing with filters & sorting

  context/
    AppContext.tsx      # Global state management

  pages/
    Home.tsx            # Home page
    ProductDetail.tsx   # Product details page
    CartPage.tsx        # Shopping cart page

  routes/
    AppRouter.tsx      # Route configuration

  utils/
    ScrollToTop.tsx    # Scroll to top utility

  App.tsx              # Main app component
  main.tsx             # Application entry point

cypress/
  e2e/
    baisc-page-testing.cy.js  # E2E tests
  fixtures/
  support/
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Git** (optional) - For cloning the repository

To verify your installation, run:

```bash
node --version
npm --version
```

## 🛠️ Installation & Setup

### Clone the repository:

```bash
git clone <your-repository-url>
cd Sembark
```

### Install dependencies:

```bash
npm install
```

### Running the App (Development):

```bash
npm run dev
```

Runs the app at:
👉 **http://localhost:5173/**

## 🏗️ Build for Production

```bash
npm run build
```

## 🧪 Run Cypress Tests

### Open Cypress UI:

```bash
npx cypress open
```

### Available test files:

- `baisc-page-testing.cy.js` - Basic page functionality tests

## 🌐 Deployment (Vercel)

1. Push project to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Framework: Vite (Auto-detected)
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy 🚀

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features Implementation

- **State Management**: React Context API for global state
- **Data Persistence**: localStorage for cart, sessionStorage for filters
- **URL State Sync**: Filters and sorting reflected in URL parameters
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Framer Motion for smooth transitions
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## 👤 Author

**Manjeet Yadav**

E-commerce React Application with full functionality & Cypress E2E testing.

---

**Happy Coding! 🚀**
