function removeFromArray(bigArr, lilArr) {
    for(let i = 0; i < bigArr.length; i++) {
        for(let v of lilArr) {
            if(bigArr[i].id === v.id) {
                bigArr.splice(i, 1);
            }; 
        };    
    };
    return bigArr;
}

export default removeFromArray;