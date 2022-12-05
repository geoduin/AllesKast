export class Relation<P> {
    type!: string;
    properties!: P;
  
    // ids are strings as JS doesn't support 64 bit ints
    // https://stackoverflow.com/questions/9643626/does-javascript-support-64-bit-integers
    id!: string;
    start!: string;
    end!: string;
  }
  
  export class Node<P> {
    labels!: string[];
    properties!: P;
  
    // ids are strings as JS doesn't support 64 bit ints
    // https://stackoverflow.com/questions/9643626/does-javascript-support-64-bit-integers
    id!: string;
  }
  
  export type ReadWriteMode = 'read' | 'write';
  
  export class Neo4jQuery<R> {
    constructor(readonly text: string, readonly mode: ReadWriteMode) {}
  }