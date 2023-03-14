import http from 'http';
import fs from 'fs';

import constants from '../constants';

import { writeFile as writeFileNode } from 'node:fs/promises';
import chalk from 'chalk';

const writeFile = (data: any) => {
  return writeFileNode(constants.fileName, data, 'utf8');
};

const launchFile = (path: string) => {
  fs.readFile(path, function (err, html) {
    if (err) throw err;
    console.log(chalk.blue(`Aplication launched on port: ${constants.PORT}`));
    http
      .createServer(function (request, response) {
        if (request.url == `/${constants.fileName}`) {
          response.writeHead(200, { 'Content-Type': 'text/json', 'Access-Control-Allow-Origin': '*' });
          response.write(JSON.stringify(require(`../../${constants.fileName}`)));
          response.end();
          return;
        }

        response.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
        response.write(html);
        response.end();
      })
      .listen(constants.PORT);
  });
};

export { writeFile, launchFile };
