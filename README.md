# Minimal CRUD Application

A minimal React application demonstrating CRUD operations with TypeScript, Tailwind CSS, and comprehensive testing.

## 🚀 Features

- **React Router V7** - Client-side routing with data loading
- **TypeScript** - Strict typing with comprehensive interfaces
- **Tailwind CSS** - Utility-first styling framework
- **AG Grid React** - Advanced data grid with CRUD operations
- **Modal Forms** - Create/Edit functionality with validation
- **Mock API** - Simulated backend with error handling
- **State Management** - React hooks for data management
- **Testing** - Unit tests with Jest and React Testing Library
- **Storybook** - Component documentation and testing
- **CI/CD** - GitHub Actions workflow

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── OrderForm.tsx    # Order creation/editing form
│   └── StatusBadge.tsx  # Status indicator component
├── pages/               # Page components
│   ├── Dashboard.tsx    # Dashboard with statistics
│   ├── Orders.tsx       # Orders management page
│   └── Customers.tsx    # Customers listing page
├── types/               # TypeScript type definitions
├── api/                 # Mock API implementation
├── __tests__/           # Test files
└── stories/             # Storybook stories
```

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Data Grid**: AG Grid Community
- **Testing**: Jest, React Testing Library
- **Documentation**: Storybook
- **Linting**: ESLint with TypeScript rules
- **CI/CD**: GitHub Actions

## 📋 Requirements Met

### ✅ Frontend Requirements
- [x] React Router V7 implementation
- [x] Tailwind CSS styling framework
- [x] Strict TypeScript configuration
- [x] AG Grid React with CRUD operations
- [x] Sorting, filtering, and pagination

### ✅ Navigation & Layout
- [x] Left sidebar navigation
- [x] Three distinct page routes (Dashboard, Orders, Customers)

### ✅ Form Handling & Modals
- [x] Modal dialogs for CRUD operations
- [x] Form validation with error handling
- [x] Tailwind CSS form components

### ✅ Mock API Implementation
- [x] JSON-based mock data strategy
- [x] Simulated API endpoints with success/error responses
- [x] TypeScript interfaces for request/response shapes
- [x] CRUD operations simulation

### ✅ Core Features
1. [x] **Routing & Data Loading** - Mock data fetching per route
2. [x] **CRUD Operations** - Full create, read, update, delete flows
3. [x] **Data Display & Interaction** - AG Grid with sorting, filtering, pagination
4. [x] **Error Handling & Validation** - Form validation and error messages
5. [x] **State Management** - React hooks for state management
6. [x] **Testing** - Unit tests with 80% coverage threshold
7. [x] **Storybook Setup** - OrderForm and StatusBadge stories
8. [x] **CI/CD Integration** - GitHub Actions workflow

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Start Storybook
npm run storybook

# Build for production
npm run build

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests**: Component and utility function tests
- **Coverage Threshold**: 80% minimum coverage requirement
- **Mock API**: Simulated backend responses
- **User Interactions**: Form submissions, navigation, CRUD operations

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage report
npm run test:coverage
```

## 📚 Storybook

Component documentation and testing available in Storybook:

- **OrderForm Component** - Create/Edit order modal with validation
- **StatusBadge Component** - Status indicator with different states

```bash
npm run storybook
```

Visit `http://localhost:6006` to view the component library.

## 🔧 Configuration Files

### TypeScript Configuration
- `tsconfig.json` - Strict TypeScript settings
- Enabled: `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`

### ESLint Configuration
- TypeScript-aware linting rules
- React and React Hooks plugin integration
- Custom rules for code quality

### Jest Configuration
- 80% coverage threshold requirement
- Setup for React Testing Library
- Mock configurations for API calls

### Tailwind CSS
- Utility-first CSS framework
- Custom color palette extension
- Responsive design utilities

## 🚀 CI/CD Pipeline

GitHub Actions workflow includes:

1. **Linting** - ESLint code quality checks
2. **Type Checking** - TypeScript compiler validation
3. **Testing** - Unit tests with coverage enforcement
4. **Build** - Production build verification

### Coverage Requirements
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## 📖 API Documentation

### Mock Data Entities

#### Orders
```typescript
interface IOrder {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
}
```

#### Customers
```typescript
interface ICustomer {
  id: string;
  name: string;
  email: string;
}
```

#### Products
```typescript
interface IProduct {
  id: string;
  name: string;
  price: number;
}
```

### API Response Format
```typescript
type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };
```

## 🎯 Key Features Demonstrated

### 1. TypeScript Rigor
- Comprehensive interface definitions
- Discriminated unions for error handling
- Generic `IGridRow` interface for data consistency
- Strict compiler options enforced

### 2. CRUD Operations
- **Create**: Add new orders via modal form
- **Read**: Display data in AG Grid with pagination
- **Update**: Edit existing orders inline
- **Delete**: Remove orders with confirmation

### 3. Data Grid Features
- **Sorting**: Click column headers to sort
- **Filtering**: Global search across all columns
- **Pagination**: Navigate through data pages
- **Custom Renderers**: Status badges and action buttons

### 4. Form Validation
- Required field validation
- Numeric validation for amounts
- Real-time error feedback
- Submit prevention on validation errors

### 5. Error Handling
- Graceful API error handling
- User-friendly error messages
- Toast notifications for operations
- Loading states during async operations

## 🏗 Architecture Decisions

### State Management
- **Local State**: React `useState` for component-specific data
- **Prop Drilling**: Minimal - state kept close to usage
- **Mock Persistence**: In-memory data storage for demo

### Component Design
- **Separation of Concerns**: UI components separate from business logic
- **Reusability**: Generic grid component for different data types
- **Accessibility**: Semantic HTML and keyboard navigation

### Testing Strategy
- **Unit Tests**: Individual component testing
- **Integration Tests**: User workflow testing
- **Mocking**: API calls and external dependencies
- **Coverage**: High coverage threshold enforcement

## 📝 Style Guide

See `STYLE_GUIDE.md` for detailed coding standards including:

- Folder structure conventions
- Naming conventions for files and variables
- Component layout standards
- TypeScript best practices
- Tailwind CSS usage guidelines

## 🤝 Contributing

1. Follow the established coding standards in `STYLE_GUIDE.md`
2. Ensure all tests pass and coverage meets threshold
3. Add tests for new functionality
4. Update Storybook stories for new components
5. Run linting before submitting changes

## 📄 License

This project is licensed under the MIT License.