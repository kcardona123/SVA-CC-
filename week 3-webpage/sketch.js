let links =[];

function setup() {
    for (let i = 0; i<25; i++ ) {
      const link = createA("#", "Yahoo!!");
      link.position (random(500), random(500));
      link.mouseClicked(onMouseClick);
      link.mouseOver(onMouseOver);
      link.mouseOut(onMouseOut);
      links.push(link);
}
}

 function onMouseClick() {
  this.style("background-color", "green");
  this.style("background-color", "white");
 }

 function onMouseOver() {
  this.style("background-color", "pink");
  this.style("color", "black");
 }

 function onMouseOut() {
  this.style("background-color", "red");
  this.style("color", "white");
 }