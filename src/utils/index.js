function getLocationParam(paramName, props) {
  console.log(props);
  if (!paramName || !props) throw new Error("Invalid arguments!");

  const match = props.match;

  if (!match) throw new Error("No access to history!");

  return !!match.params[paramName]
    ? Number(match.params[paramName])
    : match.params[paramName];
}
