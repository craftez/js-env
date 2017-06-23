import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Our first test', () => {
	it('should pass', () => {
		expect(true).to.equal(true);
	});
});

describe('index.html', () => {
	it('should say hello', () => {
		const index = fs.readFileSync(path.resolve(__dirname, '../static/index.html'), 'utf-8');
		const dom = new JSDOM(index);
		const h1 = dom.window.document.querySelector('h1');
		expect(h1.innerHTML).to.equal('Hello World');
		dom.window.close();
	});
});
