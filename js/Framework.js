
//Canvas balja az offsethez.
function GetLeft(elem){
    let left = elem.offsetLeft;
    while(elem = elem.offsetParent){
        left += elem.offsetLeft;
    }

    left -= window.pageXOffset;

    return left;
}

//Canvas teteje az offsethez.
function GetTop(elem){
    let top = elem.offsetTop;
    while(elem = elem.offsetParent){
        top += elem.offsetTop;
    }

    top -= window.pageYOffset;

    return top;
}



/**Exttra tömb függvények */

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

    let arr_begin = this.slice(0, position);//visszatér a start, vége intervallumon lévő tömb darabbal.
    let arr_end = this.slice(position);//Ha a második para hiányzik, akkor a tömb végéig.
    this.Clear();

    for(i = 0; i < arr_begin.length; i++){
        this.push(arr_begin[i]);
    }
    this.push(arg);

    for(j = 0; j < arr_end.length; j++){
        this.push(arr_end[j]);
    }
}
//arg benne van-e a tömben.
Array.prototype.Contains = function(arg){

    for(i = 0; i < this.length; i++){
        if(this[i] == arg)
            return true;
    }
    return false;

}
//arg hányszor van meg a tömben. 
Array.prototype.Occurs = function(arg){

    let counter = 0;

    for(i = 0; i < this.length; i++){
        if(this[i] == arg)
            counter ++;
    }
    return counter;
}
/**Exttra tömb függvények VÉGE */


/**Vector2 bbjektum */
//A Vektor2 az egy x, y koordinátát tároló objektum.
Vector2 = function(x, y){

    //x és y pozició mezők deklarálása és definiálása az objektumhoz.
    this.x = 0;
    this.y = 0;

    //Ha csak egy paraméter van megadva.
    if (x != null && y == 0) {
        this.x = x;
        this.y = x;
    }else{
        //Alapvető hibakezelés.
        if (x !=null) {
            this.x = x;
        }
        if (y !=null) {
            this.y = y;
        }
    }

    //Előző pozició mezők dek. és def.
    this.previousX = 0;
    this.previousY = 0;

    //Setter.
    this.Set = function(x, y){
        //Hiba lekezelése.
        if (x == null && y == null) {
            console.log("x vagy y nem lett megadva a függvény hívásakor");
        }else{
            this.previousX = this.x; //Az előző x eltárolása.
            this.previousY = this.y;//Az előző y eltárolása.

            //Ha csak egy paraméter van megadva.
            if (x != null && y == 0) {
                this.x = x;
                this.y = x;
            }else{
                if (x !=null) {
                    this.x = x;//Új x hozzárendelése.
                }
                if (y !=null) {
                    this.y = y;//Új y hozzárendelése.
                }
            }   
        }
    };

        //Normalizáló függvény
        this.Normalise = function() {
            let tmp = new Vector2(this.x, this.y);

            //magnitude beállítása.
            let mag = Math.sqrt((tmp.x*tmp.x)+(tmp.y*tmp.y));
            tmp.x = tmp.x/mag;
            tmp.y = tmp.y/mag;

            return tmp;
        };

        //Távolság mérés. Paraméteréül egy 2 dim. vec objektumot vár.
        this.Distance = function(vec2){
            if (vec2 !=null) {
                /*Pitágórász alapján a két vektor x és y értékeire egy
                 derékszögű háromszöget emelünk.*/
                 return Math.sqrt(((vec2.x - this.x)*(vec2.x - this.x)) + ((this.y - vec2.y)*(this.y - vec2.y)));
            }else{
                return Math.sqrt(((this.previousX - this.x)*(this.previousX - this.x)) + ((this.previousY - this.y)*(this.previousY - this.y)));
            }
        };

    //Volt-e változás tesztelés, pl: Volt-e mozgás.
    this.HasChanged = function(){
        if (this.x != this.previousX || this.y != this.previousY) {
            return true;
        }
        return false;
    };

    //delta x és delta y előző és jelenlegi koordináta pontok különbsége.
    //invert a megadott értékek inverze. Ha -2 akkor 2, ha 2 akkor -2.
    this.Difference = function(vec2, invert){

        let inv = 1;
        if(invert)
            inv = -1;//Egy utasítás esetén elhagyható az utasítás blok. 

        if (vec2 == null) {
            return new Vector2((this.x - this.previousX) * inv, (this.y - this.previousY) * inv);
        }else{
            return new Vector2((this.x - vec2.x) * inv, (this.y - vec2.y) * inv);
        }
    };
};
/**Vector2 bbjektum VÉGE */


/**Color bbjektum */
//Működik.
//Szín objektum.
Color = function(r, g, b, a){

    //Alapbeállítások. Fehér, alpha 1.
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.a = 1;

    if(r != null)
        this.r = r;
    if(g != null)
        this.g = g;
    if(b != null)
        this.b = b;
    if(a != null)
        this.a = a;
    
    this.ToStandard = function(noAlpha){
        if(noAlpha == null || !noAlpha)
            return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
        else
            return "rgba(" + this.r + "," + this.g + "," + this.b + ")";
    };
};
/**Color bbjektum VÉGE */


/**Rectangle bbjektum */
//Működik
//Négyszög objektum 
 Rectangle = function(x, y, w, h){
    //Hiba kezelés
    if(x == null || y == null || w == null || h == null){

        errMsg = "A következő megadása szükséges:";

        if(x == null){
            errMsg += "x";
        }
        if(y == null){
            errMsg += "y";
        }
        if(w == null){
            errMsg += "szélesség";
        }
        if(h == null){
            errMsg += "magasság";
        }

        throw new Error(errMsg);
    }
    
    //'this' Rectangle objektumra mutat.
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    //Alap fehér szín beállítása
    this.color = new Color();
    
    //Keresztez e más alakzatokat és más alakzat keresztezi e őt.
    this.Intersect = function(shape){
        let offset = 0;
        
        //Ha az alakzat kör, akkot offset 0 -tól különböző értékű.
        if (shape.radius =!null) {
            offset = shape.radius;
        }

        //Ha a négyszög  alakzattal.
        if(this.Contains(shape.x - offset, shape.y - offset) || this.Contains(shape.x + shape.width - offset, shape.y - offset) ||
           this.Contains(shape.x - offset, shape.y + shape.height - offset) || this.Contains(shape.x + shape.width - offset, shape.y + shape.height - offset))
            {
                return true;
            //Ha az alakzat találkozik a négyszöggel.    
            }else if(shape.Contains(this.x - offset, this.y - offset) || shape.Contains(this.x - offset + this.width, this.y - offset) ||
                     shape.Contains(this.x - offset, this.y + this.height - offset) || shape.Contains(this.x - offset + this.width - offset, this.y + this.height - offset)) 
                     {
                        return true;
                     }
           return false;          
    };

    this.Draw = function(ctx){
       
        ctx.fillStyle = this.color.ToStandard();
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //Metódus hozzárendelés.
    //x, y pontok rajta vannak e a négyszögön.
    this.Contains = function(x, y){
        if (x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height) 
        {
            return true;
        } else {
            return false;
        }
    }
}
/**Rectangle bbjektum VÉGE */


/**Animation bbjektum */
//Animációk objektum. Pl: player.
Animation = function(w, h, row, col, limit, imgSrc, fps, columns, rows){
    //                     
    if(fps == null || fps >= 33)
        this.fps = 1;//fps -> képkockák száma másodpercenként.
    else
        this.fps = 33/fps;

    this.fpsCounter = 0;//Minden egyes kirajzolásnál, amilyen gyakorisággal hívjuk a Draw metódust fpsCounter++ lesz.
    this.width = w;
    this.height = h;
    this.rowStart = row;//A sor ahonnan kezdődjön. Alap esetben 0
    this.columnStart = col;//Az oszlop ahonnan kezdődjön. Alap esetben 0
    this.column = col;//Oszlopk száma. Ez kezdetben = a kezdő oszloppal.
    this.row = row;//Sorok száma. Ez kezdetben = a kezdő sorokkal.
    this.rows = rows;//A sprite sheet osszes sora.
    this.columns = columns;//A sprite sheet osszes oszlopa.

    if(limit == null || limit == 0)
        this.limit = 999999999999;
    else
        this.limit = limit - 1;//Az animációban résztvevő képek max. száma pl 4*6 spritesheet esetén, ha 2 sorban kell animálni, akkor 8.

    this.limitCount = 0;//Szünet számláló
    this.image = new Image();//Új kép objektum létrehozása.
    this.image.src = imgSrc;//Kép elérési útvonala.
    this.position = new Vector2(0);//Pozicíókat mindig vektorral adjuk meg.
    this.cropPosition = new Vector2(0);//A spritesheet kezdeti kivágási poziciója.
    

    //A szünet hosszának a beállítása
    this.SetLimit = function(l){
        this.limit = l - 1;
    };

    //Egy sor számának a beállítása.
    this.SetRow = function(rNum){
        this.row = rNum;
        this.rowStart = rNum;

        //this.cropPosition = this.width * this.column;
        //this.cropPosition = this.height * this.row;
    };

    //Egy oszlop számának a beállítása.
    this.SetColumn= function(colNum){
        this.column = colNum;
        this.columnStart = colNum;

        //this.cropPosition = this.width * this.column;
        //this.cropPosition = this.height * this.row;
    };

    //Képernyő frissítés..
    this.Update = function(){
       
       this.cropPosition.x = this.width * this.column;//A kivágás kezdete x irányban
       this.cropPosition.y = this.height * this.row;//A kivágás kezdete y irányban

       if (this.columns == null || this.columns == 0) 
           this.columns = this.image.width / this.width;//Ha nem állítotunk be oszlopot, akkor a spriteshhet szélességében hány adott szélességű kis kép fér el.
           
       if(this.rows == null || this.rows == 0)
            this.rows = this.image.height / this.height;//Ugyanez magaságra.
    };

    /**
     *Ha, a képkocka számláló 0, akkor és ha a szünet számláló kisebb, mint a szünetek száma, akkor
     *szünet számláló ++ és oszlopok száma ++ és ha a oszlopok száma >= mint az összes oszlop, akkor sor++ és
     *oszlopok száma = 0 és ha sorok száma >= mint az összes sor, akkor sor száma = kezdő sor és a
     * az oszlopok száma = kezdő oszlop és szünet számláló = 0. különben ha képkocka számláló != 0 akkor
     * sorok - és oszlopok száma = kezdő sor és oszloppal és szünet számláló = 0.
     * Képkocka számláló++
     * Ha képkocka számláló >= másodpecenkénti képkockák száma, akkor képkocka számláló = 0.
     */
    this.Draw = function(ctx){
        if (this.fpsCounter == 0) {
            
            if (this.limitCount < this.limit) {
                this.limitCount++;
                this.column++;

                if (this.column >= this.columns) {
                    this.row ++;
                    this.column = 0;

                    if (this.row >= this.rows) {
                        this.row = this.rowStart;
                        this.column = this.columnStart;
                        this.limitCount = 0;
                    }
                }
            }else{
                this.row = this.rowStart;
                this.column = this.columnStart;
                this.limitCount = 0;  
            }
        }

        //Canvas beépített metódusa drawImage();
        ctx.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
        
        this.fpsCounter ++;

        if(this.fpsCounter >= this.fps)
           this.fpsCounter = 0;
    };
};
/**Animation bbjektum VÉGE */


/**Input bbjektum */
//Működik.
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
/**Input bbjektum VÉGE*/

let input = new Input();

//Egér gomb események
//Egér mozgatás esemény.
document.documentElement.onmousemove = function(e){
    e = e || window.event;

    input.mausePosition.x = e.clientX - input.offset.x;
    input.mausePosition.y = e.clientY - input.offset.y;
};

//Egér gomb lenyomásának eseménye.
document.documentElement.onmousedown = function(e){
    input.mauseIsDown = true;
};
//Egér gomb eseményének feleengedése.
document.documentElement.onmouseup = function(e){
    input.mauseIsDown = false;
};
//Egér gomb események VÉGE .

//Billentyű események
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
document.documentElement.onkeyup = function(e){
    let keycode;
    if(window.event)
        keycode = window.event.keyCode;
    else if(e)
        keycode = e.which;

    switch(keycode){
        case 13:
            input.enter = false;
            break;
        case 32:
            input.space = false;
            break;
        case 37:
            input.left = false;
            break;
        case 38:
            input.up = false;
            break;
        case 39:
            input.right =false;
            break;
        case 40:
            input.down = false;
            break;
        case 65:
            input.a = false;
            break;
        case 66:
            input.b = false;
            break;
        case 67:
            input.c = false;
            break;
        case 68:
            input.d = false;
            break;
        case 69:
            input.e = false;
            break;
        case 70:
            input.f = false;
            break;
        case 71:
            input.g = false;
            break;
        case 72:
            input.h = false;
            break;
        case 73:
            input.i = false;
            break;
        case 74:
            input.j = false;
            break;
        case 75:
            input.k = false;
            break;
        case 76:
            input.l = false;
            break;
        case 77:
            input.m = false;
            break;
        case 78:
            input.n =false;
            break;
        case 79:
            input.o = false;
            break;
        case 80:
            input.p = false;
            break;
        case 81:
            input.q = false;
            break;
        case 82:
            input.r = false;
            break;
        case 83:
            input.s = false;
            break;
        case 84:
            input.t = false;
            break;
        case 85:
            input.u = false;
            break;
        case 86:
            input.v = false;
            break;
        case 87:
            input.w = false;
            break;
        case 88:
            input.x= false;
            break;
        case 89:
            input.y = false;
            break;
        case 90:
            input.z = false;
            break;
    }
};
//Billentyű események VÉGE .