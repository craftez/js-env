/**
 * This script generates mock data for local development.
 * For rapid prototyping and testing
 */

/* eslint-disable no-console */
import jsf from 'json-schema-faker';
import fs from 'fs';
import chalk from 'chalk';
import { schema } from './mockDataSchema';

const json = JSON.stringify(jsf(schema));

fs.writeFile('./src/api/db.json', json, function(err) {
	if (err) {
		return console.log(chalk.red(err));
	} else {
		console.log(chalk.green('Mock data generated'));
	}
});
