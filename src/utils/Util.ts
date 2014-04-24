module Sef {

    export function clearArray(array: any[]) {
        while (array.length > 0) {
          array.shift();
        }
    }

    export function indexOf(array: any[], val: any) {
        for (var i = 0, max = array.length; i < max; ++i){
            if (val === array[i])
                return i;
        }

        return -1;
    }

}
