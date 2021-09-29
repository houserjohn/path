// basic stack with push, pop, peek

class Stack {
    elements: any[]
    constructor(initElements: any[]) {
        this.elements = initElements;
    } 

    push(item: any) {
        this.elements.push(item);
    }

    length() {
        return this.elements.length;
    }

    isEmpty() {
        return this.length() === 0;
    }

    pop() {
        if (!this.isEmpty()) return this.elements.pop();
    }
}


export default Stack;