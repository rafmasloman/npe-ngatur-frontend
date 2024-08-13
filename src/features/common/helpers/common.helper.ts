export default function formatRupiah(amount?: number): string {
  const suffixes = ['', 'K', 'M', 'B', 'T']; // k: ribuan, M: jutaan, B: milyaran, T: triliunan
  let i = 0;

  if (!!amount) {
    while (amount >= 1000 && i < suffixes.length - 1) {
      amount /= 1000;
      i++;
    }

    const formattedAmount =
      amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(1);

    return `IDR ${formattedAmount}${suffixes[i]}`;
  }

  return `IDR ${amount}`;
}
