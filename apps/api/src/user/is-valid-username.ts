export function isValidUsername(username: string): boolean {
  const format = new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
  return format.test(username);
}
