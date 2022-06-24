import Greeting from './Greeting';
import {render, screen} from '@testing-library/react';

test('renders Hello World as a Text', () => {
    render(<Greeting/>);
    const element = screen.getByText('Hello World');
    expect(element).toBeInTheDocument(); 
});