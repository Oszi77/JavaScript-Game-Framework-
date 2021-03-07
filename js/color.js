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
