# Uncensored Studios - GitHub and Local Development Guide

## Getting Started with the Source Code

This guide will help you set up the Uncensored Studios website for local development and integrate it with Builder.io for visual editing.

### Prerequisites

- Node.js (v16 or higher)
- npm (included with Node.js)
- Git
- A Builder.io account with a new space

### Step 1: Clone the Repository

1. Push the provided source code to your GitHub repository:
   ```bash
   git clone https://github.com/JakubNawrocki/uncensored.git
   cd uncensored
   # Remove any existing files if needed
   rm -rf *
   # Copy all files from the provided package
   # Then commit and push
   git add .
   git commit -m "Add complete source code with Builder.io integration"
   git push
   ```

### Step 2: Install Dependencies

1. Install all required dependencies:
   ```bash
   npm install
   ```

2. This will install all packages including the Builder.io SDK.

### Step 3: Configure Builder.io

1. Log in to your Builder.io account
2. Go to your space settings and copy your API key
3. Open `src/builder-config.ts` and replace `YOUR_BUILDER_API_KEY` with your actual API key

### Step 4: Run the Development Server

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal)

## Builder.io Integration

The website is fully integrated with Builder.io, allowing you to visually edit:

- Button text, colors, and shadows
- Background images (including parallax effects)
- Text content and fonts
- Section layouts and spacing
- Component properties

### How to Edit Content in Builder.io

1. Log in to your Builder.io account
2. Create a new page in your space
3. Set the URL to match one of your website routes (e.g., `/`, `/about`, `/services`)
4. Use the visual editor to add and customize components
5. Publish your changes

### Available Components

All major components are registered with Builder.io and can be added to your pages:

- Hero Section (with video background)
- Services Section
- Pricing Section
- About Section
- Why Choose Us Section
- Call To Action Section
- Spotify Player

Each component has editable properties that can be modified through the Builder.io interface.

## Project Structure

- `src/components/` - All UI components
- `src/pages/` - Page components for each route
- `src/components/layout/` - Layout components (Navbar, Footer, etc.)
- `src/components/booking/` - Booking form components
- `src/builder-config.ts` - Builder.io configuration
- `src/components/builder-registration.ts` - Component registration for Builder.io

## Customizing Components

To modify how components work with Builder.io:

1. Open `src/components/builder-registration.ts`
2. Find the component you want to modify
3. Update the `inputs` array to add or change editable properties

## Deployment

To deploy to Netlify:

1. Push your changes to GitHub
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Need Help?

If you encounter any issues or have questions about the integration, please reach out for assistance.
