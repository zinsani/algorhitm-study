enum Direction {
  right,
  down,
  left,
  up,
  count
}

export default function run(source: any[][]): any[] {
  if (!source || source.length === 0) return source;

  const checkedBlock: any[] = [];
  let direction: Direction = Direction.right;
  const p = { x: 0, y: 0 };
  const height = source.length;
  const result: any[] = [];

  // make checkedBlock array
  let totalCount = 0;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < source[r].length; c++) {
      if (c === 0) checkedBlock[r] = [];
      checkedBlock[r][c] = false;
      totalCount++;
    }
  }

  const getNextDirection = () => {
    direction = (direction + 1) % Direction.count;
  };

  const pushResultAndCheckBox = () => {
    result.push(source[p.y][p.x]);
    checkedBlock[p.y][p.x] = true;
  };

  const getElement = () => {
    const width = source[p.y]?.length;
    switch (direction) {
      case Direction.right:
        if (p.x < width && !checkedBlock[p.y][p.x]) {
          pushResultAndCheckBox();
          p.x++;
        } else {
          getNextDirection();
          p.x--;
          p.y++;
        }
        break;
      case Direction.down:
        if (p.y < height && !checkedBlock[p.y][p.x]) {
          pushResultAndCheckBox();
          p.y++;
        } else {
          getNextDirection();
          p.x--;
          p.y--;
        }
        break;
      case Direction.left:
        if (p.x > -1 && !checkedBlock[p.y][p.x]) {
          pushResultAndCheckBox();
          p.x--;
        } else {
          getNextDirection();
          p.x++;
          p.y--;
        }
        break;
      case Direction.up:
        if (p.y > 0 && !checkedBlock[p.y][p.x]) {
          pushResultAndCheckBox();
          p.y--;
        } else {
          getNextDirection();
          p.x++;
          p.y++;
        }
        break;
    }

    if (result.length < totalCount) getElement();
  };

  getElement();
  console.log("spiral order result", result.toString());
  return result;
}
