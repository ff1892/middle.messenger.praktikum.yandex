const cutString = (symbolsCount: number, str: string): string => (str.length <= symbolsCount
  ? str
  : `${str.slice(0, symbolsCount - 2)}...`);

export default cutString;
