export function formatPrice(priceToFormat: number | string) {
  let price = priceToFormat;

  if (!price) return '0,00 €';
  price = replaceFrenchCommaWithDot(price);

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function replaceFrenchCommaWithDot(price: number | string) {
  if (typeof price === 'string') price = parseFloat(price.replace(',', '.'));
  return price;
}

export const handleFrenchPriceFormat = (price: number | string) => {
  return formatPrice(replaceFrenchCommaWithDot(price));
};
