
//A Vektor2 az egy x, y koordinátát tároló objektum.
Vector2 = function(x, y){

    //x és y pozició mezők deklarálása és definiálása az objektumhoz.
    this.x = 0;
    this.y = 0;

    //Alapvető hibakezelés.
    if (x !=null) {
        this.x = x;
    }
    if (y !=null) {
        this.y = y;
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

            if (x !=null) {
                this.x = x;//Új x hozzárendelése.
            }
            if (y !=null) {
                this.y = y;//Új y hozzárendelése.
            }
        }
    };

        //Normalizáló függvény
        this.Normalise = function() {
            var tmp = new Vector2(this.x, this.y);

            //magnitude beállítása.
            var mag = Math.sqrt((tmp.x*tmp.x)+(tmp.y*tmp.y));
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

    //Volt-e változás tesztelés
    this.HasChanged = function(){
        if (this.x != this.previousX || this.y != this.previousY) {
            return true;
        }
        return false;
    };

    //delta x és delta y előző és jelenlegi koordináta pontok különbsége.
    //invert a megadott értékek inverze. Ha -2 akkor 2, ha 2 akkor -2.
    this.Difference = function(vec2, invert){

        var inv = 1;
        if(invert)
            inv = -1;//Egy utasítás esetén elhagyható az utasítás blok. 

        if (vec2 == null) {
            return new Vector2((this.x - this.previousX) * inv, (this.y - this.previousY) * inv);
        }else{
            return new Vector2((this.x - vec2.x) * inv, (this.y - vec2.y) * inv);
        }
    };
};