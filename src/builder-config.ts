import { Builder } from '@builder.io/react';

// Replace with your Builder.io public API key
export const BUILDER_API_KEY = 'YOUR_BUILDER_API_KEY';

Builder.init(BUILDER_API_KEY);

// Register custom components with Builder.io
export const registerComponents = () => {
  // This function will be called to register all components with Builder.io
  console.log('Registering components with Builder.io');
};
