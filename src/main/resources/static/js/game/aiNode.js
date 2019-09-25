class Node{
    constructor(data){
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
class aiNode {
    constructor(){
        this.head = null;
        this.tail = null;
    }
    append(data){
        let node = new Node(data);
        if(!this.head){
            this.head = node;
            this.tail = node;
        }else {
            node.prev = this.tail;
            this.tail.next =node;
            this.tail = node;
        }
    }
    appendAt( pos, item ) {
        let current = this.head;
        let counter = 1;
        let node = new Node( item );
        if( pos == 0 ) {
            this.head.prev = node
            node.next = this.head
            this.head = node
        } else {
            while(current) {
                current = current.next;
                if( counter == pos ) {
                    node.prev = current.prev
                    current.prev.next = node
                    node.next = current
                    current.prev = node
                }
                counter++
            }
        }
    }
    remove( item ) {
        let current = this.head;
        while( current ) {
            if( current.data === item ) {
                if( current == this.head && current == this.tail ) {
                    this.head = null;
                    this.tail = null;
                } else if ( current == this.head ) {
                    this.head = this.head.next
                    this.head.prev = null
                } else if ( current == this.tail ) {
                    this.tail = this.tail.prev;
                    this.tail.next = null;
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
            }
            current = current.next
        }
    }
    removeAt( pos ) {
        let current = this.head;
        let counter = 1;
        if( pos == 0 ) {
            this.head = this.head.next;
            this.head.prev = null;
        } else {
            while( current ) {
                current = current.next
                if ( current == this.tail ) {
                    this.tail = this.tail.prev;
                    this.tail.next = null;
                } else if( counter == pos ) {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    break;
                }
                counter++;
            }
        }
    }
    length() {
        let current = this.head;
        let counter = 0;
        while( current !== null ) {
            counter++
            current = current.next
        }
        return counter;
    }

    isEmpty() {
        return this.length() < 1
    }

    search( item ) {
        let current = this.head;
        let counter = 0;
        while( current ) {
            if( current.data == item ) {
                return counter
            }
            current = current.next
            counter++
        }
        return false;
    }
    
}