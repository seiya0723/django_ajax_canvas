window.addEventListener("load" , function (){
    const canvas        = document.querySelector('#canvas');
    const ctx           = canvas.getContext('2d');
    const last_pos      = { x: null, y: null };

    //canvasの配置座標を取得
    const CANVAS_X      = canvas.getBoundingClientRect().left;
    const CANVAS_Y      = canvas.getBoundingClientRect().top;

    let is_drag         = false;
 
    //描画(線の始まりと終わりの座標を指定してstroke()で描画)
    function draw(x, y) {
        if (!is_drag) { return; }
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        ctx.lineWidth   = 5;
        ctx.strokeStyle = "#000000";

        if (last_pos.x === null || last_pos.y === null) { ctx.moveTo(x, y); }
        else { ctx.moveTo(last_pos.x, last_pos.y); }

        ctx.lineTo(x, y);
        ctx.stroke();
 
        last_pos.x  = x;
        last_pos.y  = y;
    }
 
    //全消し
    function clear() { ctx.clearRect(0, 0, canvas.width, canvas.height); }
 
    function drag_start(event) {
        ctx.beginPath();
        is_drag     = true;
    }
 
    function drag_end(event) {
        ctx.closePath();
        is_drag     = false;
        last_pos.x  = null;
        last_pos.y  = null;
    }
 
    //イベント
    const clearButton = document.querySelector('#canvas_clear');
    clearButton.addEventListener('click', clear);

    canvas.addEventListener('mousedown', drag_start);
    canvas.addEventListener('mouseup', drag_end);
    canvas.addEventListener('mouseout', drag_end);
    canvas.addEventListener('mousemove', (event) => { draw(event.clientX - CANVAS_X, event.clientY - CANVAS_Y); });
    //↑クリックされた座標からcanvasの配置座標を減算、draw関数の引数として与える。.layerX、.layerYではズレる。


});

