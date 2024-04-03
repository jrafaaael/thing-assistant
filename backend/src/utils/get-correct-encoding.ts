export function getCorrectEncoding(str: string) {
  return Buffer.from(str, 'latin1').toString('utf-8');
}
