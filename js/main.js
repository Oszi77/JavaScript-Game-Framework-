let texture = new Image();
texture.src = 'img/background.jpg';


InitComponent = function InitComponent(w, h, canvasID){

    let canvas          = document.getElementById("canvas");
    canvas.width        = 900;
    canvas.height       = 500;
    canvas.style.width  = canvas.width + "px";
    canvas.style.height = canvas.height + "px";

    input.offset = new Vector2(GetLeft(canvas), GetTop(canvas));
     

    ctx = canvas.getContext('2d');
}

window.onload = InitComponent;




let player2 = new Player();
let player = new Rectangle(0, 0, 25,25);
player.color = new Color(255,0,0,1);
//let rect = new Rectangle(250, 250, 50, 50);
let floor = new Rectangle(0, 400, 400, 20);
floor.color = new Color(0,0,255, 0.5);


let Update = setInterval(function(){
    player2.Update();
    

    //Billentyű figyelés.
    /*if(input.a)
      player.x-= 1;
    if(input.d)
      player.x+= 1;
    if(input.w)
      player.y-= 1;
    if(input.s)
      player.y+= 1;*/


    //Nem engedjük ki a játék térből.  
    if(player2.rect.x < 0)
        player2.rect.x = 0;
    if(player2.rect.y < 0)
         player2.rect.y = 0;
    if(player2.rect.x + player2.rect.width > canvas.width)
        player2.rect.x = canvas.width - player2.rect.width;
    /*if(player2.rect.y + player2.rect.height > canvas.height)
        player2.rect.y = canvas.height -player2.rect.height ;*/

    
    //Tárggyal ütköztünk-e?    
    if(floor.Intersect(player2.rect) && !player2.jumping){
        //player.x = floor.x - player.width;
        player2.rect.y = floor.y - player2.rect.height;
        player2.jumpAvaiable = true;
    }else{
        player2.jumpAvaiable = false;
    }

}, 1);

let Draw = setInterval(function(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    let pattern = ctx.createPattern(texture, "");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 900, 500);
    

    floor.Draw(ctx);
    player.Draw(ctx);
    player2.Draw(ctx);


    //ctx.drawImage(sprite, 0, 0, 48, 91, 400, 300, 48, 91);
}, 33);

