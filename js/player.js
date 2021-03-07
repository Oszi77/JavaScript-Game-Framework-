
Bullet = function(vel, rectangle){
    this.velocity = vel;
    this.rect =  rectangle;

    this.Update = function(){

    };

    this.Draw = function(){

    };
}


Player = function(){

    this.rect = new Rectangle(0, 0, 48, 91);

    this.animation = new Animation(48, 91, 6, 0, 9,'img/player.png', 12, 9, 8);

    //gravitációs állandó
    //let gravity = 9.8;
    this.gravity = 2.8;

    this.moving = false;

    //lövedékek tömb.
    this.bullets = new Array();
    this.shootBullet = false;

    this.jumpAvaiable = false;
    this.jumping = false;
    this.JUMP_MAX = 2;
    this.velocity = 0;

    

    this.SetPosition = function(x, y, mod){
        if(mod == null || !mod){
            if(x != null)
                this.rect.x = x;
            if(y != null)
                this.rect.y = y;
        }else{
            if(x != null)
                this.rect.x += x;
            if(y != null)
                this.rect.y += y;
        }
    };

    this.Update = function(){
        this.moving = false;
       
        if(input.left){
            this.animation.SetRow(2);
            this.rect.x -= 1;
            this.moving = true;
        };
        if(input.right){
            this.animation.SetRow(6);
            this.rect.x += 1;
            this.moving = true;
        };  
        if(input.up){
            this.Jump();
        }
        if (this.jumping) {
            this.rect.y -= this.velocity;
            this.velocity -= 0.01;

            if (this.velocity <= 0) {
                this.jumping = false;
                this.jumpAvaiable = true;
            }
        }else{
            //Gravitációs erőhatás.
            this.rect.y += this.gravity;
        };

        if(input.v){
            this.Shoot();     
        }else{
            this.shootBullet = false;
        }

        /*if(input.up){
            this.animation.SetRow(4);
            this.rect.y -= 1;
            this.moving = true;
        }   
        if(input.down){
           this.animation.SetRow(0);
           this.rect.y += 1;
           this.moving = true;
        }*/

        

        //A keret négyszög x, y koordinátáinak megfelelően frisítjük a player pozíciót.
        this.animation.position.Set(this.rect.x, this.rect.y);

        if(this.moving)
            this.animation.Update();
        else
            this.animation.SetColumn(0);
    };

    //Lövések.
    this.Shoot = function(){
        if (!this.shootBullet) {
            //lövedék.
            let bullet = new Rectangle(this.rect.x + (this.rect.width / 2) - 4, this.rect.y + (this.rect.height / 2) - 4, 8, 8);
            bullet.color.g = 0;
            bullet.color.b = 0;

            this.bullets.push(bullet);
        }else{
            this.shootBullet = true;
        }
        
    };

    //Ugrás függvény.
    this.Jump = function(){
        if (this.jumpAvaiable) {
            this.velocity = this.JUMP_MAX;
            this.jumping = true;
        }
    };

    this.Draw = function(ctx){
        for (let i = 0; i < this.bullets.length; i++) {
            console.log(this.bullets[i]);
             this.bullets[i].Draw(ctx); 
        }

        this.animation.Draw(ctx);
    };
}