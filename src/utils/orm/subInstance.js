/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/24 by Heaven
 */

import warning from 'warning';

export default (...args) => {
  warning(args.length === 4, `you must pass instances, startIndex, endIndex, mapFunction as the arguments,
    but now passed in ${args}`);

  const [instances, startIndex, endIndex, mapFunction] = args;

  return instances.slice(startIndex - 1, endIndex - 1).map(mapFunction);
};
