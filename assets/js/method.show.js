/**
* @function show
*
* @memberof Tutorial
* @instance
* @return {Number | String} [order]
*/
show(order, animationDisable = false){

  let _ = __privateMap.get(this);
  let $ = __conf.$;
  let d = new $.Deferred();

  if(this.isFire) this.fastForward();

  order = __changePointer.call(this, order);
  let step = _.step[order];
  console.log(step);

  if(__activeInstance && __activeInstance === this) __$content.empty();
  if(__activeInstance && __activeInstance !== this) __activeInstance.destroy();


  _.active = true;

  d.done(()=>{
    console.log("dds");
  });

  __activeInstance = this;

  if(animationDisable || !_.animation) __animate.show.call(this, d, 0);
  else __animate.show.call(this, d);


  // if((__activeInstance && __activeInstance === this)){
    // console.log("ok");
  // }


  // this.id
  // let _ = privateMap.get(this);
  // order = order || _.pointer;



  // _.animation
}
