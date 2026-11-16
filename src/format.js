export const eur = (n) => {
  const [int, dec] = String(Math.round(n * 100) / 100).split('.');
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}${dec ? ',' + dec : ''} €`;
};
