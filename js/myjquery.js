function $(selector) {
    return new Fn(selector)
}

function Fn(selector) {
    let firstChar =selector.charAt(0);
    let elems;
    if (firstChar === '.'){
        let classname =selector.substring(1);
        elems =document.getElementsByClassName(classname);
    } else {
         elems =document.getElementsByTagName(selector)
    }
    for (let i=0;i<elems.length;i++){
        this[i]=elems[i];
    }
    this.length =elems.length;
}
Fn.prototype.each =function(callback){
    for(let i=0;i<this.length;i++){
        callback(i,this[i])
    }
};

Fn.prototype.html=function (value) {
    // for(let i=0;i<this.length;i++){
    //     this[i].innerHTML =value;
    // }
    this.each(function (index,elem) {
        elem.innerHTML =value;
    });
    return this;
};
Fn.prototype.css=function (obj) {
    // for (let i=0;i<this.length;i++){
    //     for(let j in obj){
    //         this[i].style[j]=obj[j];
    //     }
    // }
  this.each(function (index,elem) {
     for (let j in obj){
         elem.style[j]=obj[j];
     }
  });
    return this;
};
Fn.prototype.addClass =function (classname) {
    for (let i=0;i<this.length;i++){
        this[i].classList.add(classname)
    }
    return this;
};
Fn.prototype.click=function (fn) {
    this.each(function (index,elem) {
        elem.addEventListener('click',fn)
    })
};
Fn.prototype.prepend=function () {

};
Fn.prototype.first=function () {

};