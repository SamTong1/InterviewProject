// function s(n) {
//   // if (n == 1) {
//   //   return 2;
//   // }
//   return 2 * s(n - 1);
// }

// console.log(s(10));

// function addUpto(n) {
//   if (n == 1) {
//     return 1;
//   }
//   return n + addUpto(n-1);
// }

// console.log(addUpto(10));

function FIB(n) {
  if (n == 0) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }
  return FIB(n - 1) + FIB(n - 2);
}

console.log(FIB(10));
