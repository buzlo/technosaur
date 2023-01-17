export default function countTotal(array) {
  return array.reduce((total, item) => (
    item.price * item.quantity + total
  ), 0);
}
