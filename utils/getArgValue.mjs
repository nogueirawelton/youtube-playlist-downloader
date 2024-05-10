const getArgValue = (argName) => {
  const index = process.argv.indexOf(argName);
  return index !== -1 && index + 1 < process.argv.length
    ? process.argv[index + 1]
    : null;
};

export default getArgValue;
