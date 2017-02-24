# linqjs

Some LINQ functionality for JavaScript Array

## Installation

```
npm install varcache
```

---

Supplies the following functions for arrays:

* ```all```
* ```any```
* ```copy```
* ```distinct```
* ```first```
* ```orderBy```
* ```orderByDescending```
* ```select```
* ```skip```
* ```take```
* ```where```

Say you have the following array:

```js
let people = [
  { name: 'Barack Obama', age: 55, isAlive: true, gender: 'M' },
  { name: 'Genghis Khan', age: 65, isAlive: false, gender: 'M' },
  { name: 'Britney Spears', age: 35, isAlive: true, gender: 'F' },
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' },

  // Yes I know she is added twice, it's for the distinct() call!
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' }
];
```

## all

Determines whether all elements of a sequence satisfy a condition.

Param: ```Function predicate```

Returns: ```boolean```

---

Example:

```js
let allIsAlive = people.all(x => x.isAlive);
```

Will produce:

```js
false
```

## any

Determines whether any element of a sequence satisfies a condition.

Param: ```Function predicate```

Returns: ```boolean```

---

Example:

```js
let females = people.any(x => x.gender === 'F');
```

Will produce:

```js
true
```

## copy

Make an exact copy of the array, not a reference.

Param *none*

Returns: ```Array```

---

Example:

```js
let copiedList = people.copy();
```

Will produce:

```js
[
  { name: 'Barack Obama', age: 55, isAlive: true, gender: 'M' },
  { name: 'Genghis Khan', age: 65, isAlive: false, gender: 'M' },
  { name: 'Britney Spears', age: 35, isAlive: true, gender: 'F' },
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' },
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' }
]
```

## distinct

Returns distinct elements from a sequence.

Param: *none*

Returns: ```Array```

---

Example:

```js
let distinctList = people.distinct();
```

Will produce:

```js
[
  { name: 'Barack Obama', age: 55, isAlive: true, gender: 'M' },
  { name: 'Genghis Khan', age: 65, isAlive: false, gender: 'M' },
  { name: 'Britney Spears', age: 35, isAlive: true, gender: 'F' },
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' }
]
```

## first

Returns the first element of a sequence based on a predicate, or a null if the sequence contains no elements.
I've combined First(), FirstOrDefault(), Single(), and SingleOrDefault() into first(), and all "fails" just return a null.

Param: ```Function predicate```

Returns: ```Object```

---

Examples:

```js
let khan = people.first(x => x.name.endsWith('Khan'));
```

Will produce:

```js
{ name: 'Genghis Khan', age: 65, isAlive: false, gender: 'M' }
```

---

```js
let obama = people.first();
```

Will produce:

```js
{ name: 'Barack Obama', age: 55, isAlive: true, gender: 'M' }
```

---

```js
let nonExisting = people.first(x => x.age === 100);
```

Will produce:

```js
null
```

## orderBy

Sorts the elements of a sequence in ascending order according to a key.

Param: ```string key```

Returns: ```Array```

---

Example:

```js
let alphabetically = people.orderBy('name');
```

Will produce:

```js
[
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' },
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' },
  { name: 'Barack Obama', age: 55, isAlive: true, gender: 'M' },
  { name: 'Britney Spears', age: 35, isAlive: true, gender: 'F' },
  { name: 'Genghis Khan', age: 65, isAlive: false, gender: 'M' }
]
```

## orderByDescending

Sorts the elements of a sequence in descending order.

Param: ```string key```

Returns: ```Array```

---

Example:

```js
let unalphabetically = people.orderByDescending('name');
```

Will produce:

```js
[
  { name: 'Genghis Khan', age: 65, isAlive: false, gender: 'M' },
  { name: 'Britney Spears', age: 35, isAlive: true, gender: 'F' },
  { name: 'Barack Obama', age: 55, isAlive: true, gender: 'M' },
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' },
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' }
]
```

## select

Projects each element of a sequence into a new form.

Param: ```Object map```

Returns: ```Array```

---

Example:

```js
let firstNamesAndGender = people.select({
  firstName: x => x.name.substr(0, x.name.indexOf(' ')),
  gender: x => x.gender === 'M' ? 'Male' : 'Female'
});
```

Will produce:

```js
[
  { firstName: 'Barack', gender: 'Male' },
  { firstName: 'Genghis', gender: 'Male' },
  { firstName: 'Britney', gender: 'Female' },
  { firstName: 'Ada', gender: 'Female' },
  { firstName: 'Ada', gender: 'Female' }
]
```

## skip

Bypasses a specified number of elements in a sequence and then returns the remaining elements.

Param: ```int number```

Returns: ```Array```

---

Example:

```js
let skipped = people.skip(2);
```

Will produce:

```js
[
  { name: 'Britney Spears', age: 35, isAlive: true, gender: 'F' },
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' },
  { name: 'Ada Lovelace', age: 36, isAlive: false, gender: 'F' }
]
```

## take

Returns a specified number of contiguous elements from the start of a sequence.

Param: ```int number```

Returns: ```Array```

---

Example:

```js
let taken = people.take(2);
```

Will produce:

```js
[
  { name: 'Barack Obama', age: 55, isAlive: true, gender: 'M' },
  { name: 'Genghis Khan', age: 65, isAlive: false, gender: 'M' }
]
```

## where

Filters a sequence of values based on a predicate.

Param: ```Function predicate```

Returns: ```Array```

---

Example:

```js
let wheres = people.where(x => x.age > 50);
```

Will produce:

```js
[
  { name: 'Barack Obama', age: 55, isAlive: true, gender: 'M' },
  { name: 'Genghis Khan', age: 65, isAlive: false, gender: 'M' }
]
```

## chains

You can chain multiple functions as they're prototypes of the Array object.

---

Examples:

```js
let names = people
  .orderBy('name')
  .skip(2)
  .take(2)
  .where(x => x.age < 40);
```

Will produce:

```js
[
  { name: 'Britney Spears', age: 35, isAlive: true, gender: 'F' }
]
```

---

```js
let otherPerson = people
  .where(x => !x.isAlive &&
              x.gender === 'M')
  .first();
```

Will produce:

```js
{ name: 'Genghis Khan', age: 65, isAlive: false, gender: 'M' }
```