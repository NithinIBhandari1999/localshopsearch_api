let myArray = [1,2,3,4,4,3,2,1,1,2,3,4];

myArray.filter((elem, pos) => {
    console.log(elem, pos, myArray.indexOf(elem));

    return myArray.indexOf(elem) == pos;
});