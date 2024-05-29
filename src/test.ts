import { isObservable } from 'rxjs';

async function somePromise() {
  return true;
}

function main() {
  const variable = somePromise();
  console.log(isObservable(variable));
}
main();
