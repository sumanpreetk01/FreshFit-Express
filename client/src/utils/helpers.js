export const calculateTotals = (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.price, 0);
    const taxRate = 0.13; // 13% tax rate
    const tax = subtotal * taxRate;
    const totalWithTaxes = subtotal + tax;
  
    return {
      subtotal,
      tax,
      totalWithTaxes,
    };
  };
  
  export const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };
  