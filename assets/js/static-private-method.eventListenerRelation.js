let __addEventListenerRelation = function(){
  let _              = __privateMap.get(this);
  let id             = 'instance-'+this.id;
  let globalListener = __listener;
  let localListener  = _.listener;
  for(let key in globalListener) globalListener[key][id] = localListener[key];
}
let __removeEventListenerRelation = function(){
    let _              = __privateMap.get(this);
    let id             = 'instance-'+this.id;
    let globalListener = __listener;
    let localListener  = _.listener;
    for(let key in globalListener) delete globalListener[key][id];
}
