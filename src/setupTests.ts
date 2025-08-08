import '@testing-library/jest-dom';

// Mock window.confirm
global.confirm = jest.fn(() => true);

// Mock window.alert
global.alert = jest.fn();

// Mock setTimeout and clearTimeout for toast components
global.setTimeout = jest.fn((callback: Function, delay: number) => {
  callback();
  return 1;
}) as any;

global.clearTimeout = jest.fn();