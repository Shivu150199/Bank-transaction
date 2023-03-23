'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 1800],
  interestRate: 12, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 15,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 9.5,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginusername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseusername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }:${type}</div><div class="movements__value">${mov}💵</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDIsplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);

  labelBalance.textContent = `${acc.balance}💵`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}💵`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}💵`;

  const insterest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 10)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.floor(insterest)}💵`;
};

const createusername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createusername(accounts);
const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDIsplayBalance(acc);
  calcDisplaySummary(acc);
};
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginusername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome,${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginusername.value = inputLoginPin.value = '';
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseusername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseusername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

/////////////////////////////////////////////////
/*//slice method
let arr=["a",'b','c','d','e']
console.log(arr.slice(3));
console.log(arr.slice(2,3));
console.log(arr.slice(-2));//these method does not change the original method
console.log(arr.slice(-1));
console.log(arr.slice(2,-1));
console.log(arr.slice());

//splice
// console.log(arr.splice(2));
console.log(arr.splice(-1));
// arr.splice(1,2)//fron 1 to two value
console.log(arr);

//reverse
const arr2=['j','i','h','g','f']
console.log(arr2.reverse());

//concat
const letters=arr.concat(arr2)
console.log(letters);
// also can be done as 
console.log([...arr,...arr2]);

//join method
console.log(letters.join('-'));

const arr=[23,45,57]
console.log(arr[0]);
console.log(arr.at(0));
// getting the last element
console.log(arr[arr.length-1]);
console.log(arr.at(-1));
//at method also work at string 
console.log('shivam'.at(-1));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (let [i,movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i+1}: you deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1} :you withdrew ${Math.abs(movement)}`);
  }
}
console.log("------foreach-------");
movements.forEach(function (movement,i,movemnets) {
  if (movement > 0) {
    console.log(`Movement ${i+1}: you deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1} :you withdrew ${Math.abs(movement)}`);
  }
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}:${value}`);
});
The Complete JavaScript Course 23
Working With Arrays
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶 ")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉

const juliaData =   [9, 16, 6, 8, 3];
const kateData =  [10, 5, 6, 1, 4];
//in julia data first and last owner has cats so remove them
const corJulia = juliaData.splice(1, juliaData.length - 2);
const checkDogs = [...kateData, ...corJulia];
console.log(checkDogs);
checkDogs.forEach(function (age, i) {
  if (age >= 4) {
    console.log(
      `Dog number ${i + 1} is an adult, and is ${checkDogs[i]} years old`
    );
  }
  else
  {
    console.log(`Dog number ${i + 1} is still a puppy`);
  }
});
const juliaData =   [9, 16, 6, 8, 3];
const kateData =  [10, 5, 6, 1, 4];

//best method

const checkDogs = function (juliaData, kateData) {
  let juliaCorrectData = juliaData.splice(1, juliaData.length - 2);
  let onlyDogsData = [...kateData, ...juliaCorrectData];
  onlyDogsData.forEach(function (age, i) {
    if (age >= 3) {
      console.log(
        `Dog number ${i + 1} is an adult, and is ${onlyDogsData[i]} years old`
      );
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => 
  mov * eurToUsd
)
console.log(movements);
console.log(movementsUSD);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposit=movements.filter(function(mov){
// return mov>0;

// })
// console.log(movements);
// console.log(deposit);

// for of method
const deposit = [];
for (const mov of movements) if (mov > 0) deposit.push(mov);

console.log(deposit);

const withdrawal = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawal);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//accumulator -->snowball
//acc=accumulator
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
});
console.log(balance);

//for of mothod
let balance2 = 0;
for (let mov of movements) balance2 += mov;

console.log(balance2);

//maximum value
const max = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

// The Complete JavaScript Course 24
// Coding Challenge #2
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]

// const dogsData=[5, 2, 4, 1, 15, 8, 3]

// const calcAverageHumanAge = function (ages) {
//   let humanAge = ages.map(function (age) {
//     return age <= 2 ? age * 2 : 16 + age * 4;
//   });
//   console.log(humanAge);
//  let adultDog= humanAge.filter(function(dogAge){
// return dogAge>18

//   })
//   console.log(adultDog);
//   let average=adultDog.reduce(function(acc,avr){
// return acc+avr/adultDog.length

//   },0)
// console.log(average);
// };

// const avg1=calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2=calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
// as an arrow function, and using chaining!
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = ages => {
  let humanAge = ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(dogAge => dogAge > 18)
    .reduce((acc, avr, i, arr) => acc + avr / arr.length,0);
    console.log(humanAge);
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);*/

// const array=[16, 6, 10, -5, 6, -1, 4]
// let find=array.find(mov=>mov<0)
// console.log(find);

// const account=accounts.find(acc=>acc.username==='ss');
// console.log(account);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// every
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));
// seperear=te call back
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

const arr = [[1, 3, 5], [4, 6, 2, 27, 7], 64, 34];
console.log(arr.flat());

let arrDeep = [[1, 2, [3]], [[4, 5], 6], 7, 8, 9];
console.log(arrDeep.flat(2));

// sorting
const owners = ['jonas', 'zack', 'Adam', 'Marta'];
console.log(owners.sort());
console.log(owners);
// number
console.log(movements);
console.log(movements.sort());

movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(movements);

const x = new Array(7);
console.log(x);
// x.fill(2)
x.fill(1, 3);
console.log(x);
// array.from
const bankDepositSum = accounts
  .map(acc => acc.movements)
  .flat()
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur);
console.log(bankDepositSum);

// const numDeposits1000=accounts.flatMap(acc=>acc.movements).filter(mov=> mov>1000).length;
// console.log(numDeposits1000);
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(numDeposits1000);

//3 exercise
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// this is a nice title --> This Is a Nice Title

const convertTitleCase = function (title) {
  const exception = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exception.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a Long title, but not to long'));
console.log(convertTitleCase('and here is a another title with an EXAMPLE'));

// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).
// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended foood
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects 😉)
// The Complete JavaScript Course 26
// Hints:
// § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them 😉
// § Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended *
// 1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.
// Test data:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));

console.log(dogs);

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
if (sarahDog.curFood > sarahDog.recFood) {
  console.log('eating to much');
} else {
  console.log('give him some food bitch');
}

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);
//
console.log(`${ownersEatTooMuch.join(' and ')}dogs eat to much `);
console.log(`${ownersEatTooLittle.join(' and ')}dogs eat to little `);

console.log(dogs.some(dog=>dog.curFood===dog.recFood));

console.log(dogs.sort((a,b)=>a.recFood-b.recFood));

// const info = [
//   { fName: "shivam", lName: "singh" },
//   { fName: "akshay", lName: "singh" },
// ];
// info.forEach(function(info){
// return info.adress="asother",
// info.pincode=212620
// })
// console.log(info);
