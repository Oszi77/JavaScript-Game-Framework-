
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
    
    //Keresztez e más alakzatokat és más alakzat keresztezi e őt.
    this.Intersect = function(shape){
        var offset = 0;
        
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

    this.Draw = function(ctx, color){
        ctx.fillStyle = color;
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