var inp,currentImage,newImage,poster,pg,gridItemW,gridRows,img,sourceImage,manipulatedImage,font,metaFont,posterW=586,posterH=810,imageOffsetX=0,imageOffsetY=0,started=!1,imageIsLoaded=!1,imgCounter=0,allImages=[],gotChanges=!1,mouseOffsetX=0,mouseOffsetY=0,dragging=!1,rollover=!1,grid=[],imageFilenames={},fontFilenames={},busy=!0;function preload(){imageFilenames=loadJSON("../../data/images.json"),fontFilenames=loadJSON("../../data/fonts.json"),sourceImage=loadImage("../../images/30.jpg"),font=loadFont("../../fonts/Cormorant-Regular.ttf"),metaFont=loadFont("../../fonts/Poppins-Bold.ttf")}function setup(){imageMode(CENTER),rectMode(CENTER),createCanvas(900,900).parent("sketch"),poster=createGraphics(586,810),manipulateImage(),busy=!1,buildUI(),generateDust()}var State={selectedLayer:"I",text:"ART IN THE AGE OF AUTOMATION",fontSize:200,lineHeight:.9,textX:0,textY:-20,font:"Cormorant-Italic.ttf",metaInfosX:10,metaInfosY:742,image:"9.jpg",imageX:10,imageY:10,width:700,gridCols:150,maxSize:4,Colors:{background:"#ffffff",text:"#f45642",image:"#2103A8"}};imgCounter=0;function mousePressed(){rollover&&(dragging=!0,mouseOffsetX=State.imageX-mouseX,mouseOffsetY=State.imageY-mouseY)}function mouseReleased(){dragging=!1}function mouseDragText(){rollover=0<mouseX&&mouseX<900&&0<mouseY&&mouseY<900,dragging&&(State.imageX=mouseX+mouseOffsetX,State.imageY=mouseY+mouseOffsetY)}function mouseDragImage(){rollover=0<mouseX&&mouseX<900&&0<mouseY&&mouseY<900,dragging&&(State.imageX=mouseX+mouseOffsetX,State.imageY=mouseY+mouseOffsetY)}function type(){poster.textFont(font),poster.textAlign(RIGHT,TOP),poster.rectMode(CORNER),poster.textSize(State.fontSize),poster.fill(249,48,17,240),poster.push(),poster.translate(State.textX,State.textY);for(var e=0,t=0,o=0;o<State.text.length;o++){var a=poster.textWidth(State.text[o]);posterW-20<e&&(e=0,t+=State.fontSize*State.lineHeight),e+=a,poster.text(State.text[o],e,t)}poster.pop()}function metaInfos(){poster.textFont(metaFont),poster.textAlign(CENTER,TOP),poster.fill(State.Colors.image),poster.textSize(11),poster.push(),poster.translate(State.metaInfosX,State.metaInfosY),poster.text("www.timrodenbroeker.de",posterW/2,32),poster.pop()}function getNewSourceImage(e){busy=!0,sourceImage=loadImage("../../images/"+e,function(){console.log(e+" loaded"),manipulateImage()})}function manipulateImage(){sourceImage.resize(200,0);var e=sourceImage.width,t=sourceImage.height/e,o=parseInt(State.width),a=parseInt(State.width*t),s=o/e,r=o/State.gridCols;State.gridCols;(manipulatedImage=createGraphics(o,a)).noStroke(),manipulatedImage.fill(State.Colors.image);for(var n=0;n<o;n+=r)for(var i=0;i<a;i+=r)var m=sourceImage.get(parseInt(n/s),parseInt(i/s)),g=brightness(m);for(n=0;n<o;n+=r){0;for(i=0;i<a;i+=r){m=sourceImage.get(parseInt(n/s),parseInt(i/s)),g=brightness(m);var p=map(g,100,0,0,State.maxSize);manipulatedImage.push(),manipulatedImage.translate(n,i),manipulatedImage.rect(0,0,p,p),manipulatedImage.pop()}}busy=!1}var posterSizeAdjust=!(document.onkeyup=function(e){192==e.keyCode&&(save("out"+imgCounter+".jpg"),imgCounter+=1),27==e.keyCode&&document.getElementById("overlay").classList.remove("visible")}),posterSizeAdjustWidth=State.width;function draw(){background("#000000"),poster.background(State.Colors.background),poster.rectMode(CORNER),poster.noStroke(),busy?(textAlign(CENTER,CENTER),fill("#ffffff"),push(),translate(width/2,height/2),textSize(33),text("loading image...",0,0)):(poster.push(),poster.translate(State.imageX,State.imageY),poster.image(manipulatedImage,0,0),poster.pop(),posterSizeAdjust&&(poster.push(),poster.translate(State.imageX,State.imageY),poster.noFill(),poster.strokeWeight(6),poster.stroke("#E25B46"),poster.rectMode(CORNER),poster.rect(0,0,posterSizeAdjustWidth,posterSizeAdjustWidth),poster.pop()),type(),metaInfos(),mouseDragImage(State.imageX,State.imageY),dust(),push(),translate(width/2,height/2),image(poster,0,0)),pop()}var rects=[];function generateDust(){for(var e=0;e<100;e++)rects.push({x:random(posterW),y:random(posterH),w:random(2),h:random(5)})}function dust(){poster.fill(State.Colors.background),poster.noStroke();for(var e=0;e<rects.length;e++)poster.rect(rects[e].x,rects[e].y,rects[e].w,rects[e].h)}