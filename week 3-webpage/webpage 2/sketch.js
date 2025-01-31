function setup() {
  createCanvas(400, 400);
  background(190);

  circle(width/2, height/2, 200);
  const sideNavItems = selectAll(".side-nav-item");
  for (let i = 0; i < sideNavItems.length; i ++) {
    sideNavItems[i].mousePressed(onMouseClick);
    sideNavItems[i].mouseOver(onMouseOver);
    sideNavItems[i].mouseOut(onMouseOut);
  }
}

 function onMouseClick() {
  const id= this.elt.dataset.id;
  const className = "." + id;
  const contents = selectAll('.project');
  for (let i=0; i< contents.length; i++) {
    contents[i].hide();
  }
  const project = select(className);
  project.show();
 }

 function onMouseOver() {
    this.style("color", "red"); 
 }

 function onMouseOut() {
  this.style("color", "black");
 }