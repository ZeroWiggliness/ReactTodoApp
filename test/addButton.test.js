import renderer from 'react-test-renderer';
import {cleanup, fireEvent, render} from '@testing-library/react';
import addButton from '../src/app/addButton';
import AddButton from '../src/app/addButton';

afterEach(cleanup);

test('adds 1 + 2 to equal 3', () => {
	expect(1 + 2).toBe(3);
});