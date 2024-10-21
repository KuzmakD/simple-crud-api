export const isModeCluster = (): boolean => {
  const args = process.argv.find((item) => item.includes('--mode=cluster'));

  return args ? true : false;
}
