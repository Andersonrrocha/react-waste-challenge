# Skip Size Selection Challenge

## Overview

This project is a modern and user-friendly interface for skip size selection, focusing on improving user experience while maintaining the core functionality of the original proposal.

## 🎯 Approach & Methodology

### Initial Analysis

- Conducted a thorough review of available functionalities
- Identified potential improvement points
- Focused on enhancing user experience without deviating from the core requirements

### Design Improvements

- Reimagined the interface with a modern and engaging design
- Implemented a light color scheme to better highlight important elements
- Added dark mode support for complete user customization
- Enhanced visual hierarchy for better information scanning

### User Experience Enhancements

1. **Card Design**

   - Highlighted key features for immediate user comprehension
   - Clear visual indicators for disabled states
   - Robust validation for handling unexpected API responses
   - Visual feedback for selected items

2. **Detailed View**

   - Implemented a drawer component for expanded information
   - Added toggle functionality for selected cards
   - Maintained visual consistency between list and detailed views

3. **Responsive Design**
   - Created separate components for mobile and desktop views
   - Optimized layout for different screen sizes
   - Implemented responsive grid system
   - Carefully considered content presentation across breakpoints

## 💻 Technical Implementation

### Technology Stack

- React (Latest Version)
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Heroicons (Icon Library)

### Project Structure

Implemented a scalable architecture with clear separation of concerns:

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── hooks/         # Custom hooks
└── pages/         # Page components
```

### Best Practices

- Component Separation: Distinct components for mobile and desktop views
- Responsive Design: Optimized layouts for various screen sizes
- Performance: Minimal external dependencies
- Maintainability: Clear code structure and organization
- Accessibility: Semantic HTML and proper ARIA attributes

## 🌟 Key Features

- Modern, intuitive interface
- Responsive design across all devices
- Dark/Light mode support
- Interactive card selection
- Detailed information drawer
- Clear visual feedback
- Error state handling

## 🔍 Design Decisions

- **Separate Card Components**: Created distinct components for mobile and desktop to maintain clean, specific styling without complex conditions
- **Grid Layout**: Optimized card display for different screen sizes to maximize available space
- **Visual Feedback**: Implemented clear indicators for card states (selected, disabled)
- **Theme Support**: Developed a cohesive design system that works seamlessly in both light and dark modes

## 🛠 Technical Considerations

- Minimized external dependencies for better performance
- Used modern React patterns and hooks
- Implemented responsive design using Tailwind CSS utilities
- Maintained scalable project structure despite the project's current size

## 🎨 UI/UX Considerations

- Enhanced visual hierarchy
- Clear user feedback
- Intuitive interactions
- Consistent design language
- Accessible interface
