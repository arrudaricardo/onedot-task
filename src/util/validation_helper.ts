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