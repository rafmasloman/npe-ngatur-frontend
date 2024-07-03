/**
 * Convert number to currency format (Rupiah)
 */
export function formatToRupiah(
  number?: number,
  withRpPrefix: boolean = true,
): string {
  const formattedCurrency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number!);

  if (!withRpPrefix) return formattedCurrency.replaceAll('Rp', '').trim();
  return formattedCurrency;
}
