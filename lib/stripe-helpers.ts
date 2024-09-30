export function formatAmountForStripe(
  amount: number,
  currency: string
): number {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });

  const parts = numberFormat.formatToParts(amount);

  let zeroDecimalCurrency = true;

  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
      break;
    }
  }

  // If it's a zero decimal currency, return the amount as is
  // Otherwise, multiply by 100 to convert it to the smallest currency unit (e.g., cents)
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
