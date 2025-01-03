
export const formatCurrency = (amount, minimumFractionDigits = 2) => {
  return new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', minimumFractionDigits }).format(amount);
};