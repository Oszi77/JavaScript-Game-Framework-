//Animációk objektum.
Animation = function(w, h, row, col, limit, imgSrc, fps, columns, rows){
//                     
if(fps == null || fps >= 33)
this.fps = 1;
else
this.fps = 33/fps;

this.fpsCounter = 0;
this.frame = 0;
this.width = w;
this.height = h;
this.rowStart = row;//
this.columnStart = col;//
this.column = col;
this.row = row;
this.rows = rows;
this.columns = columns;
if(limit == null || limit == 0)
this.limit = 999999999999;
else
this.limit = limit - 1;//
this.limitCount = 0;//
this.image = new Image();
this.image.src = imgSrc;
this.position = new Vector2(0);//Pozicíókat mindig vektorral adjuk meg.
this.cropPosition = new Vector2(0);//Pozicíókat mindig vektorral adjuk meg.

//
this.SetLimit = function(l){
this.limit = l - 1;
};
//Egy sor számának a beállítása.
this.SetRow = function(rNum){
this.row = rNum;
this.rowStart = rNum;
};
//Egy oszlop számának a beállítása.
this.SetColumn= function(colNum){
this.column = colNum;
this.columnStart = colNum;
};
//Képernyő frissítés..
this.Update = function(pos){
this.position = pos;
this.cropPosition.x = this.width * this.column;
this.cropPosition.y = this.height * this.row;

if (columns == null || columns == 0) {
this.columns = this.image.width / this.width;
this.columns = this.image.height / this.height;
}
};
//
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

ctx.drawImage(this.image, this.cropPosition.x, 
this.cropPosition.y, this.width, this.height,
this.position.x, this.position.y, 
this.width, this.height);

this.fpsCounter++;

if(this.fpsCounter >= this.fps)
this.fpsCounter = 0;
};
};