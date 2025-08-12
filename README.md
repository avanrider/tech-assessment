# Nymbl Assessment App

A minimal React application demonstrating CRUD operations with TypeScript, Tailwind CSS, AG Grid, and comprehensive testing.

## 🚀 Features

- **React Router V7** - Client-side routing with data loading
- **TypeScript** - Strict typing with comprehensive interfaces
- **Tailwind CSS** - Utility-first styling framework
- **AG Grid Integration** - Advanced data grid with sorting and filtering
- **Modal Forms** - Create/Edit functionality with validation
- **Mock API** - Simulated backend with error handling
- **State Management** - React hooks for data management
- **Testing** - Unit tests with Jest and React Testing Library
- **Storybook** - Component documentation and testing

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   │   ├── Modal.tsx    # Modal dialog component
│   │   ├── Toast.tsx    # Toast notifications
│   │   └── StatusBadge.tsx  # Status indicator
│   ├── forms/           # Form components
│   │   ├── OrderForm.tsx    # Order management
│   │   ├── CustomerForm.tsx # Customer management
│   │   └── PackageForm.tsx  # Package management
│   └── layout/          # Layout components
│       ├── Sidebar.tsx      # Navigation sidebar
│       └── DataGrid.tsx   # Data grid component based on AG Grid
├── pages/               # Page components
│   ├── Dashboard.tsx    # Dashboard with statistics
│   ├── Orders.tsx       # Orders management
│   ├── Customers.tsx    # Customer management
│   └── Packages.tsx     # Package management
├── types/               # TypeScript definitions
├── utils/               # Utilities
│   └── mockApi.ts       # Mock API implementation
├── assets/             # Images and icons
└── stories/            # Storybook stories
```

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Data Grid**: AG Grid Community
- **Testing**: Jest, React Testing Library
- **Documentation**: Storybook
- **Linting**: ESLint with TypeScript rules
- **CI/CD**: GitHub Actions

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup

1. Clone the repository
```bash
git clone https://github.com/avanrider/tech-assessment.git
cd tech-assessment
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Mock Data Setup
The application uses an in-memory mock API implementation located in `src/utils/mockApi.ts`. This provides:
- Simulated CRUD operations
- Realistic response delays
- Error scenarios for testing
- Persistent data during the session
- Auto-generated test data on startup

No additional setup is required for the mock data - it's automatically initialized when you start the application.

### Available Scripts

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Start Storybook for component development
npm run storybook

# Build for production
npm run build

# Run ESLint
npm run lint

# Type checking with TypeScript
npm run type-check
```

### Development URLs
- Main Application: http://localhost:5173
- Storybook: http://localhost:6006 (after running npm run storybook)

### Demo Data & Testing Scenarios

The mock API provides several pre-configured scenarios for testing:

#### Orders
- Create new orders with validation
- Edit existing orders
- Delete orders (with confirmation)
- View order status and details
- Sort by customer name, package, or status

#### Packages
- Add new service packages
- Set package availability
- Update pricing
- View order statistics per package
- Cannot delete packages with active orders

#### Customers
- Add new customers
- Edit customer details
- View customer order history
- Test form validation rules

#### Error Scenarios
- Try deleting a package with active orders
- Submit invalid form data to see validation
- Test network error simulation
- Handle concurrent updates

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


## 📖 API Documentation

### Mock Data Entities

#### Orders
```typescript
interface IOrder {
  id: string;
  customerId: string;
  packageId: string;
  amount: number;
  status: OrderStatusType;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Customers
```typescript
interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Packages
```typescript
interface IPackage {
  id: string;
  name: string;
  price: number;
  description?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### API Response Format
```typescript
type ApiResponse<T> = {
  success: true;
  data: T;
  metadata?: {
    total: number;
    page: number;
  };
} | {
  success: false;
  error: ApiErrorType;
};
```

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

## 📄 License

This project is licensed under the MIT License.