import { render, screen } from '@testing-library/react';
import { TestPage } from './TestPage';

describe('TestPage', () => {
  it('renders correct text in the test page', () => {
    render(<TestPage />);
    expect(screen.getByText('This Page is test Page.')).toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    render(<TestPage />);
    const testElement = screen.getByTestId('my-test');
    expect(testElement).toHaveClass('text-transparent');
    expect(testElement).toHaveClass('bg-clip-text');
    expect(testElement).toHaveClass('sub-gradient');
    expect(testElement).toHaveClass('text-3xl');
    expect(testElement).toHaveClass('font-bold');
  });

  it('renders as a div element', () => {
    render(<TestPage />);
    const testElement = screen.getByTestId('my-test');
    expect(testElement.tagName).toBe('DIV');
  });
});
