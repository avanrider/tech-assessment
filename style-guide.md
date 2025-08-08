# Style Guide

## Folder Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── forms/        # Form components
├── pages/            # Page components
├── hooks/            # Custom hooks
├── types/            # TypeScript type definitions
├── api/              # API layer and mocking
└── utils/            # Utility functions
```

## Naming Conventions

### Components
- Use PascalCase for component names: `OrderForm`, `SimpleGrid`
- Use descriptive names that indicate purpose
- Prefix with "I" for interfaces: `IOrder`, `ICustomer`

### Files
- Component files: `OrderForm.tsx`
- Hook files: `useOrders.ts`
- Type files: `types.ts`
- Utility files: `apiUtils.ts`

### Variables & Functions
- Use camelCase: `currentPath`, `handleSubmit`
- Use descriptive names: `loadOrders` instead of `load`
- Boolean variables should start with `is`, `has`, `can`: `isLoading`, `hasError`

## Component Layout

### Standard Component Structure
```typescript
// 1. Imports
import React, { useState } from 'react';
import { SomeIcon } from 'lucide-react';

// 2. Types/Interfaces
interface ComponentProps {
  // props definition
}

// 3. Component
function Component({ prop1, prop2 }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Event handlers
  const handleClick = () => {
    // handler logic
  };
  
  // 6. Effects
  useEffect(() => {
    // side effects
  }, []);
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// 8. Export
export default Component;
```

## Hooks Placement
- All hooks must be called at the top level of components
- Custom hooks should be in separate files in the `hooks/` directory
- Use descriptive hook names: `useOrders`, `useFormValidation`

## Utility Functions
- Pure functions should be in the `utils/` directory
- Export as named exports
- Include JSDoc comments for complex utilities

## TypeScript Standards

### Strict Configuration
- Enable `noImplicitAny`
- Enable `strictNullChecks`
- Use explicit return types for functions
- Define comprehensive interfaces

### Type Definitions
```typescript
// Generic grid row interface
interface IGridRow {
  id: string;
  [key: string]: any;
}

// Discriminated unions for error handling
type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };
```

## Styling Guidelines

### Tailwind CSS Classes
- Use semantic class grouping: `bg-white p-4 rounded-lg shadow`
- Responsive classes: `grid-cols-1 md:grid-cols-3`
- Hover states: `hover:bg-gray-100`
- Focus states: `focus:outline-none focus:ring-2`

### Component Styling
- Consistent spacing using Tailwind scale
- Use semantic colors: `text-red-600` for errors, `text-green-600` for success
- Maintain consistent border radius and shadow patterns

## Best Practices

### State Management
- Use local state for component-specific data
- Lift state up when shared between components
- Consider context for deeply nested prop drilling

### Error Handling
- Always handle API errors gracefully
- Show user-friendly error messages
- Use toast notifications for operation feedback

### Performance
- Memoize expensive calculations with `useMemo`
- Use `useCallback` for event handlers passed to children
- Implement proper loading states

### Accessibility
- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Maintain proper color contrast ratios