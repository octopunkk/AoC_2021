const {readFileSync} = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf-8');

const lines = input.split('\n').filter(Boolean).map((text) => {
  const matches = text.match(/(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/).groups;
  if (!matches) {
    throw new Error('invalid line');
  }
  return {
    x1: Number(matches.x1),
    y1: Number(matches.y1),
    x2: Number(matches.x2),
    y2: Number(matches.y2),
  }
});

const GRID_SIZE = Math.max(
  lines.map(({x1}) => x1).reduce((cur, val) => val > cur ? val : cur),
  lines.map(({x2}) => x2).reduce((cur, val) => val > cur ? val : cur),
  lines.map(({y1}) => y1).reduce((cur, val) => val > cur ? val : cur),
  lines.map(({y2}) => y2).reduce((cur, val) => val > cur ? val : cur),
);
console.log('GRID SIZE:', GRID_SIZE);

const grid = new Array(GRID_SIZE * GRID_SIZE).fill(0);

lines.forEach((line) => {
  // if (line.x1 !== line.x2 && line.y1 !== line.y2) {
  //   return;
  // }
  let x = line.x1;
  let y = line.y1;
  const stepX = Math.sign(line.x2 - line.x1);
  const stepY = Math.sign(line.y2 - line.y1);
  while (x !== line.x2 || y !== line.y2) {
    grid[(x * GRID_SIZE) + y] += 1;
    // console.log(`Setting: ${x}-${y}`);
    x += stepX;
    y += stepY;
  }
  // console.log(`Setting: ${line.x2}-${line.y2}`);
  grid[(line.x2 * GRID_SIZE) + line.y2] += 1;
});

console.log(`Points with more than 1 line:`, grid.reduce((cur, val) => cur + (val > 1 ? 1 : 0), 0));
