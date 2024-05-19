export function FormatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

// export function FormatPrice(price) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 2,
//   }).format(price);
// }
