function Bar(){
    console.log(this.a); //this here refers to global/window
}

let hello = {
    a: "hello"
};

Bar.call(hello);