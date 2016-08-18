    // =========================================================================
    /**
    * @function name2index
    *
    * @memberof Tutorial
    * @instance
    * @return {Number|Number[]}
    */
    name2index(name = ''){
      let _   = privateMap.get(this);
      let arr = [];
      _.step.forEach((el, i)=>{
        if(typeof el === 'object' && el.name === name) arr.push(i);
      });
      return arr.length > 1 ? arr : arr.length === 1 ? arr[0] : -1;
    }
    isActive(){
      // return @stepIsActive
    }
