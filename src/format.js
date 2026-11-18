export const eur = (n) => {
  const [int, dec] = String(Math.round(n * 100) / 100).split('.');
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}${dec ? ',' + dec : ''} €`;
};

// Demo-only: a random Visa-style number that passes the Luhn check, plus a CVC.
export function randomCardDetails() {
  const digits = [4];
  while (digits.length < 15) digits.push(Math.floor(Math.random() * 10));
  const sum = digits
    .slice()
    .reverse()
    .reduce((acc, d, i) => {
      if (i % 2 === 0) { d *= 2; if (d > 9) d -= 9; }
      return acc + d;
    }, 0);
  digits.push((10 - (sum % 10)) % 10);
  const number = digits.join('');
  const cvc = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return { number, cvc };
}

export const formatCardNumber = (n) => n.replace(/(\d{4})(?=\d)/g, '$1 ');
