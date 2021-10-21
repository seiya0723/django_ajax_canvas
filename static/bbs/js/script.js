window.addEventListener("load" , function (){

    //送信処理
    $("#submit").on("click", function(){ send(); });

});

function send(){

    let form_elem   = "#form_area";

    let data    = new FormData( $(form_elem).get(0) );
    let url     = $(form_elem).prop("action");
    let method  = $(form_elem).prop("method");

    //===================canvasの画像化処理==================================================

    //TODO:何も描いていない場合、そのまま送信されてしまう問題がある。
    let context = document.getElementById('canvas').getContext('2d');
    var base64  = context.canvas.toDataURL('image/png');

    // Base64からバイナリへ変換
    var bin     = atob(base64.replace(/^.*,/, ''));
    var buffer  = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }

    //ファイル名は日付
    let dt          = new Date();
    let filename    = dt.toLocaleString().replace(/\/| |:/g,"");

    //バイナリでファイルを作る
    var file    = new File( [buffer.buffer], filename + ".png", { type: 'image/png' });

    data.append("img",file);
    for (let v of data.entries() ){ console.log(v); }

    //===================canvasの画像化処理==================================================
    
    $.ajax({
        url: url,
        type: method,
        data: data,
        processData: false,
        contentType: false,
        dataType: 'json'
    }).done( function(data, status, xhr ) {

        if (!data.error){
            //リダイレクト
            window.location.replace("");
        }

    }).fail( function(xhr, status, error) {
        console.log(status + ":" + error );
    });

}

