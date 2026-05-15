let Obj = {
    'A' : 1,
    'B' : '12',
    'C' : {
        'D' : '23',
        'E' : {
            'F' : '44'
        }
    }
}

flattenDeeplyNetsedObject(Obj);

function flattenDeeplyNetsedObject(obj){
    const newObj = {}
    function doFlat(obj, parent){
        for(let key in obj){
            const newParent = parent + key;
            const value = obj[key];

            if(typeof value === 'object'){
                doFlat(value, newParent + ".");
            }
            else{
                newObj[newParent] = value;
            }
        }
    }

    doFlat(obj, "")
    return newObj;
}