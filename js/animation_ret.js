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
    this.image = new Image();
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

       // this.cropPosition = this.width * this.column;
       // this.cropPosition = this.height * this.row;
    };

    //Képernyő frissítés..
    this.Update = function(){
       
       this.cropPosition.x = this.width * this.column;//A kivágás kezdete x irányban
       this.cropPosition.y = this.height * this.row;//A kivágás kezdete y irányban

       if (this.columns == null || this.columns == 0) 
           this.columns = this.image.width / this.width;//Ha nem állítotun be oszlopot, akkor a spriteshhet szélességében hány adott szélességű kis kép fér el.
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

        ctx.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
        
        this.fpsCounter ++;

        if(this.fpsCounter >= this.fps)
           this.fpsCounter = 0;
    };
};