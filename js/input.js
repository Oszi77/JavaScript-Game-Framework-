//Bemenetek objektum. Billentyű gombok és egér gombok és egér mozgatás.
Input = function(){

    this.a = false;
    this.b = false;
    this.d = false;
    this.e = false;
    this.f = false;
    this.g = false;
    this.h = false;
    this.i = false;
    this.j = false;
    this.k = false;
    this.l = false;
    this.m = false;
    this.n = false;
    this.o = false;
    this.p = false;
    this.q = false;
    this.r = false;
    this.s = false;
    this.t = false;
    this.u = false;
    this.v = false;
    this.w = false;
    this.x = false;
    this.y = false;
    this.z = false;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.enter = false;
    this.space = false;
    this.mauseIsDown = false;
    this.mausePosition = new Vector2(0);
    this.offset = new Vector2(0);
    this.clamp = new Vector2(0);
};

let input = new Input();

document.documentElement.onmousemove = function(e){
    e = e || window.event;

    input.mausePosition.x = e.clientX - input.offset.x;
    input.mausePosition.y = e.clientY - input.offset.y;
};

document.documentElement.onmousedown = function(e){

};

document.documentElement.onmouseup = function(e){
    
};

document.documentElement.onkeydown = function(e){
    let keycode;
    if(window.event)
        keycode = window.event.keyCode;
    else if(e)
        keycode = e.which;

    switch(keycode){
        case 13:
            input.enter = true;
            break;
        case 32:
            input.space = true;
            break;
        case 37:
            input.left = true;
            break;
        case 38:
            input.up = true;
            break;
        case 39:
            input.right = true;
            break;
        case 40:
            input.down = true;
            break;
        case 65:
            input.a = true;
            break;
        case 66:
            input.b = true;
            break;
        case 67:
            input.c = true;
            break;
        case 68:
            input.d = true;
            break;
        case 69:
            input.e = true;
            break;
        case 70:
            input.f = true;
            break;
        case 71:
            input.g = true;
            break;
        case 72:
            input.h = true;
            break;
        case 73:
            input.i = true;
            break;
        case 74:
            input.j = true;
            break;
        case 75:
            input.k = true;
            break;
        case 76:
            input.l = true;
            break;
        case 77:
            input.m = true;
            break;
        case 78:
            input.n = true;
            break;
        case 79:
            input.o = true;
            break;
        case 80:
            input.p = true;
            break;
        case 81:
            input.q = true;
            break;
        case 82:
            input.r = true;
            break;
        case 83:
            input.s = true;
            break;
        case 84:
            input.t = true;
            break;
        case 85:
            input.u = true;
            break;
        case 86:
            input.v = true;
            break;
        case 87:
            input.w = true;
            break;
        case 88:
            input.x= true;
            break;
        case 89:
            input.y = true;
            break;
        case 90:
            input.z = true;
            break;
    }
};