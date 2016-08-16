    /**
    * @method Tutorial.changeConfig
    * @desc   change Tutorial.js configuration
    * @param  {(String|Object[])} name
    * @param  {String} name.name
    * @param  {*} name.val
    * @param  {*}                 [val]
    */
    static changeConfig(name, val){
      let confArr = Array.isArray(name) ? name : [{'name' : name, 'val' : val}];
      confArr.forEach( obj => conf[obj.name] = obj.val );
    }
    /**
    * @function myFunction
    */
    test(){

    }
