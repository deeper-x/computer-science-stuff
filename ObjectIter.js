let a = {
    "one": 1,
    "two": 2,
    "three": 3
}

// get keys
for (let x of Object.keys(a)){
    console.log(x);
}

// get keys
for (let x in a){
    console.log(x);
}

//get values
for (let x in a){
    console.log(a[x]);
}

for (let x of Object.values(a)){
    console.log(x);
}

//true 
console.log(a.hasOwnProperty("one"));

//false
console.log(a.hasOwnProperty("x"));


// freeze - immutable property
let Configuration = function() {
    this.dbName = "fooBar";
    this.userName = "blahBlah";
    this.password = "qwerty";
}

let objConf = new Configuration();
Object.freeze(objConf);
objConf.password = "newPasswd";
console.log(objConf.password);

// seal - mutabls properties, prevent adding new
let defaultConfig = function(){
    this.username = "admin";
    this.password = "password";
}

let customConfig = new defaultConfig();
Object.seal(customConfig);
customConfig.password = "203480@23uoncksjh!";
customConfig.protocol = "https";

console.log(Object.isSealed(customConfig), customConfig);