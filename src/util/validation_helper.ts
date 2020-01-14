import { TableData} from '../components/Store'

// Duplicates. Duplicate Domain - Range pairs: Two rows in the dictionary map to the same value, 
//simply resulting in duplicate content.


export function duplicatesValidation(table: TableData): Array<number>[] {
  const data = table.data
  let invalidByIndex: Array<number>[] = []
  for (let i = 0; i < data.length - 1; i++) {
    let domainI = data[i].Domain
    let rangeI = data[i].Range
    for (let j = i + 1; j < data.length; j++) {
      let domainJ = data[j].Domain
      let rangeJ = data[j].Range

      if ((domainI === domainJ) && (rangeI === rangeJ)) {
       invalidByIndex.push([i,j])
      }
    }
  }
  return invalidByIndex
}

// Forks. Duplicate Domains with different Ranges: Two rows in the dictionary map 
//to different values, resulting in an ambiguoustransformation

export function forksValidation(table: TableData): Array<number>[] {
  const data = table.data
  let invalidByIndex: Array<number>[] = []
  for (let i = 0; i < data.length - 1; i++) {
    let domainI = data[i].Domain
    let rangeI = data[i].Range
    for (let j = i + 1; j < data.length; j++) {
      let domainJ = data[j].Domain
      let rangeJ = data[j].Range

      if ((domainI === domainJ) && (rangeI !== rangeJ)) {
       invalidByIndex.push([i,j])
      }
    }
  }
  return invalidByIndex
}
//Cycles. Two or more rows in a dictionary result in cycles, 
//resulting in a never-ending transformation.

export function cyclesValidation(table: TableData): Array<number>[] {
  const data = table.data
  let invalidByIndex: Array<number>[] = []
  for (let i = 0; i < data.length - 1; i++) {
    let domainI = data[i].Domain
    let rangeI = data[i].Range
    for (let j = i + 1; j < data.length; j++) {
      let domainJ = data[j].Domain
      let rangeJ = data[j].Range
      if ((domainI === rangeJ) && (domainJ === rangeI)) {
       invalidByIndex.push([i,j])
      }
    }
  }
  return invalidByIndex
}

// Chains. A chain structure in the dictionary (a value in Range column also appears 
//in Domain column of another entry), resulting in inconsistent transformation. 
export function chainsValidation(table: TableData): Array<number>[] {
  const data = table.data
  let invalidByIndex: Array<number>[] = []
  for (let i = 0; i < data.length - 1; i++) {
    let domainI = data[i].Domain
    let rangeI = data[i].Range
    for (let j = i + 1; j < data.length; j++) {
      let domainJ = data[j].Domain
      let rangeJ = data[j].Range
      if ((rangeI === domainJ) && (domainI !== rangeJ)) {
       invalidByIndex.push([i,j])
      }
    }
  }
  return invalidByIndex
}



type Ivalidation = {
  error: string;
  indexes: number[]
}

// severity scale Cycles > Chains > Fork > Duplicates
export function checkAllValidation(table: TableData): Ivalidation{
  const flatArray = (arr: Array<any>) =>  Array.prototype.concat.apply([], arr);
  let invalidCycle = cyclesValidation(table)
  if (invalidCycle.length === 0){
    let invalidChains =  chainsValidation(table)
    if (invalidChains.length === 0){
      let invalidForks = forksValidation(table)
      if(invalidForks.length ===0){
        let invalidDuplicated = duplicatesValidation(table)
        if (invalidDuplicated.length > 0) {
          return {error:"Duplicates. Duplicate Domain - Range pairs", indexes: flatArray(invalidDuplicated)}
        }
      }else{
        return {error:"Forks: Duplicate Domains with different Ranges", indexes: flatArray(invalidForks)}
       }
    }else{
      return {error:"Chain: a value in Range column also appears in Domain column of another entry", indexes: flatArray(invalidChains)}
    }
  }else {
   return {error:"Cycle: inconsistent transformation", indexes: flatArray(invalidCycle)}
  }
  return {error:"", indexes: []} 
}