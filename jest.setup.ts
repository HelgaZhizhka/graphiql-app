import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';

import { TextEncoder } from 'util';

class MockIntersectionObserver {
  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}

  disconnect = jest.fn();
  observe = jest.fn();
  takeRecords = jest.fn();
  unobserve = jest.fn();

  root = null;
  rootMargin = '';
  thresholds = [0];
}

global.TextEncoder = TextEncoder;

declare global {
  interface Window {
    IntersectionObserver: typeof MockIntersectionObserver;
  }
}
window.IntersectionObserver = MockIntersectionObserver;

import './setupDomTests';

beforeEach(() => {
  jest.resetAllMocks();
});
