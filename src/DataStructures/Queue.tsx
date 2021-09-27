// Basic queue with queue, enqueue, peek, etc.
class Queue {
    elements: any[]

    constructor(initElements?: any[]) {
        this.elements = [];
        if (initElements) this.elements = initElements;
    }

    enqueue(item: any) {
        return this.elements.push(item);
    }

    dequeue() {
        return this.elements.shift();        
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    peek() {
        return (this.isEmpty() ? undefined : this.elements[0]);
    }

    length() {
        return this.elements.length;
    }
}

export default Queue;

