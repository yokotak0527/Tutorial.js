let __canvasBGSetup = function($parent){
  let conf    = __conf;
  let $       = conf.$;
  let $win    = conf.$window;
  let $canvas = $('<canvas>');

  let param     = __canvasParam;
  param.w       = 0;
  param.h       = 0;
  param.bgColor = conf.focusBGColor;
  param.rect    = [
    [0, 0, 0, 0]
  ]; // x, y, w, h
  param.$cvs    = $canvas;
  param.cvs     = param.$cvs[0];
  param.ctx     = param.cvs.getContext('2d');

  $win.on('resize', (()=>{
    let timer = null;
    let w     = null;
    let h     = null;
    return ()=>{
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=>{
        w                   = $win.innerWidth();
        h                   = $win.innerHeight();
        param.cvs.width     = w;
        param.cvs.height    = h;
        param.ctx.fillStyle = param.bgColor;
        param.ctx.clearRect(0, 0, w, h);
        param.ctx.fillRect(0, 0, w, h);
        if(param.rect) param.rect.forEach((val)=> param.ctx.clearRect(val[0], val[1], val[2], val[3]) );
      }, conf.resizeInterval);
    }
  })());

  $parent.append($canvas);
}
