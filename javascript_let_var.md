```javascript
var carName = "Volvo";

// code here can use carName

function myFunction() {
  // code here can also use carName 
}
```

```javascript
// code here can NOT use carName

function myFunction() {
  var carName = "Volvo";
  // code here CAN use carName
}

// code here can NOT use carName

Variables declared with the var keyword can not have Block Scope.
Variables declared inside a block {} can be accessed from outside the block.

```

```javascript
{ 
  var x = 2; 
}
// x CAN be used here
```

Variables declared with the let keyword can have Block Scope.
Variables declared inside a block {} can not be accessed from outside the block:

```javascript
{ 
  let x = 2;
}
// x can NOT be used here
```

Redeclaring a variable using the var keyword can impose problems.
Redeclaring a variable inside a block will also redeclare the variable outside the block:

```javascript
var x = 10;
// Here x is 10
{ 
  var x = 2;
  // Here x is 2
}
// Here x is 2
```

Redeclaring a variable using the let keyword can solve this problem.
Redeclaring a variable inside a block will not redeclare the variable outside the block:

```javascript
var x = 10;
// Here x is 10
{ 
  let x = 2;
  // Here x is 2
}
// Here x is 10
```
