let batch = {
    batchWeight: null,
    initial: null,
    desired: null,
    initialWeight: {},
    ratioMax: 1,
    finalWeight: {},
    addWeightPerElement: {},
    sumFinalWeight: 0,
    percentFinal: {},
    setCheckInputs: function(batchWeight, initial, desired) {
        this.batchWeight = batchWeight
        this.initial = initial
        this.desired = desired
        let sumCheck=(data)=>{
            let sum = 0;
            for (let x in data){
                sum += data[x]
            }
            return Math.round(sum*10000)/10000
        }
        console.log(sumCheck(this.desired))
        if (sumCheck(this.initial) !== 100){
            return `Initial Percentages equal ${sumCheck(this.initial)}% and should total to 100%`
        } 
        if (sumCheck(this.desired) !== 100){
            return `Desired Percentages equal ${sumCheck(this.desired)}% and should total to 100%`
        }
        for (let x in this.initial) {
            if (this.initial[x] < 0){
                return `The value for element "${x}" cannot be a negative number`
            }
            if (!this.desired.hasOwnProperty(x)){
                return `Property "${x}" is listed in the initial percentages, but not in the desired percentages`
            }
        }
        for (let x in this.desired) {
            if (this.desired[x] <= 0){
                return `The value for element "${x}" cannot be a zero or a negative number`
            }
            if (!this.initial.hasOwnProperty(x)){
                return `Property "${x}" is listed in the initial percentages, but not in the desired percentages`
            }
        }

        return true

    },
    getInitialWeight: function(batchWeight, initial, desired) {
        let check = this.setCheckInputs(batchWeight, initial, desired)
        console.log(check)
        if (check !== true) {
            return check
        }
        for (let x in this.initial){
            this.initialWeight[x] = this.initial[x]/100*this.batchWeight
            let ratio = this.initial[x]/this.desired[x];
            if (ratio > this.ratioMax) {
                this.ratioMax = ratio
            }    
        }
        return true
    },
    getAddWeight: function(batchWeight, initial, desired) {
        let initialWeight = this.getInitialWeight(batchWeight, initial, desired);
        if (initialWeight !== true) {
            return initialWeight
        }
        this.sumFinalWeight = this.ratioMax * this.batchWeight;
        for (let x in this.desired) {
            this.finalWeight[x] = this.desired[x]/100*this.ratioMax*this.batchWeight
            this.addWeightPerElement[x] = Math.abs(Math.round((this.finalWeight[x] - this.initialWeight[x])*1000000)/1000000)
            this.percentFinal[x]  = Math.round(100*this.finalWeight[x]/this.sumFinalWeight*10000)/10000
        }
        console.log(this.addWeightPerElement)
        // console.log(this.percentFinal)
        return batch
    }
}

export {batch};