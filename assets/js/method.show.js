/**
* @function show
*
* @memberof Tutorial
* @instance
* @return {Number | String} [order]
*/
show(order){

  //if(__activeInstance && __activeInstance !== this) __activeInstance.hide();
  //
  let _ = __privateMap.get(this);
  let $ = __conf.$;
  let d = new $.Deferred();

  if(__activeInstance && __activeInstance === this) __$content.empty();

  // let oldPointer = _.pointer;
  // _.pointer      = order || _.pointer;
  // order = order || _.pointer;


  _.active = true;

  __animate.show.call(this, d);

  d.done(()=>{
  });


  // if((__activeInstance && __activeInstance === this)){
    // console.log("ok");
  // }

  __activeInstance = this;
  // this.id
  // let _ = privateMap.get(this);
  // order = order || _.pointer;



  // _.animation
}
