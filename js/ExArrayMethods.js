
//A tömb objektum (js Obj)extra mezőkkel vagy metódusokkal való kiegészítése
//prototype.
//arg értéket és a hozzátartozó tömb elemet kitörli. Ha (all) true akkor az utánna levő minden elemet is.
Array.prototype.Remove = function(arg, all){
    for (let i = 0; i < this.length; i++) {
        if (this[i] == arg) {
            this.splice(i, 1);

            if(all == null || !all)
                break;
            else
                i--;
        }
    }
}
//psition -tól kezdve kitöröl egy tömb elemet. 
Array.prototype.RemoveAt = function(position){ 
    this.splice(position, 1);
}
//Kitörli a tömböt.
Array.prototype.Clear = function(){
    this.length = 0;
}
//Beszúr újabb tömb részt (arg) position -tól.
Array.prototype.InsertAt = function(arg, position){

    var arr_begin = this.slice(0, position);//visszatér a start, vége intervallumon lévő tömb darabbal.
    var arr_end = this.slice(position);
    this.Clear;

    for(i = 0; i < arr_begin.length; i++){
        this.push(arr_begin[i]);
    }
    this.push(arg);

    for(j = 0; j < arr_begin.length; j++){
        this.push(arr_end[j]);
    }
}
//arg benne van e a tömben.
Array.prototype.Contains = function(arg){

    for(i = 0; i < this.length; i++){
        if(this[i] == arg)
            return true;
    }
    return false;

}
//arg hányszor van meg a tömben. 
Array.prototype.Occurs = function(arg){

    var counter = 0;

    for(i = 0; i < this.length; i++){
        if(this[i] == arg)
            counter ++;
    }
    return counter;
}