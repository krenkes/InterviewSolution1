//Weight of the molten metal in the ladle after removing the sample(although probably neglible and )
let batchWeight = 1; 

//Input initial percentages of each element
let initial = {
    'Cr': 14.79,
    'Ni': 2,
    'Mo': .5,
    'C': .01,
    'Mn': 1,
    'P': .03,
    'S': .02,
    'Si': .6,
    'N' : .05,
    'Fe' : 81
  };

//Input desired percentages of each element for the desired steel grade  
const desired = {
    'Cr': 17,
    'Ni': 12,
    'Mo': 2.5,
    'C': .08,
    'Mn': 2,
    'P': .05,
    'S': .03,
    'Si': .75,
    'N' : .1,
    'Fe' : 65.49
};

// initialWeight is the weight of each element in the batch before any additional amount of material is added
let initialWeight = {};

//ratioMax is the maximum ratio initial%/desired% of all the elementsgiven element 
let ratioMax = 1

// Calculates the initial and ratioMax
for (let x in initial){
    initialWeight[x] = initial[x]/100*batchWeight
    let ratio = initial[x]/desired[x];
    if (ratio > ratioMax) {
        ratioMax = ratio
    }    
}

// sumFinalWeight is the total weight of the batch after all adjustments are made
let sumFinalWeight = ratioMax * batchWeight;

// finalWeight is the weight of each element in the batch once the adjustments/additions are made by the operator
let finalWeight = {}

// addWeightPerElement is the amount of each element to add to the batch to get the desired percentages
let addWeightPerElement = {}

// percentFinal is based on the final weights of each element and should read the same as the desired 
let percentFinal = {}

// calculates finalWeight, addWeightPerElement, and percentFinal
for (let x in desired) {
    finalWeight[x] = desired[x]/100*ratioMax*batchWeight
    addWeightPerElement[x] = Math.abs(Math.round((finalWeight[x] - initialWeight[x])*10000)/10000)
    percentFinal[x]  = Math.round(100*finalWeight[x]/sumFinalWeight*10000)/10000
}


console.log("Add this amount of each element to the batch:")
console.log(addWeightPerElement)
console.log("These are the final percentages of each element in the batch and should be the same as the desired percentages:")
console.log(percentFinal)