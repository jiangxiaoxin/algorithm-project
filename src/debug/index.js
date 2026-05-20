import {add} from './add.js';

function loop() {
    for(let i=0;i<10;i++) {
        add(i,i+1)
    }
}

loop()