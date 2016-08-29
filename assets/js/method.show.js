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
  let _          = __privateMap.get(this);
  let $          = __conf.$;
  let d          = new $.Deferred();
  let oldPointer = _.pointer;
  _.pointer      = order || _.pointer;
  order = order || _.pointer;

  _.active = true;


  d.done(()=>{
    console.log("ddd");
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
