/**
* @function addStep
*
* @memberof Tutorial
* @instance
* @param    {Object | Object[]} step
*/
addStep(step){
  let steps = Array.isArray(step) ? step : [step];
  let _     = __privateMap.get(this);
  steps.forEach( obj => _.step.push(obj) );
  __adjustStepNum.call(this);
  return this;
}
