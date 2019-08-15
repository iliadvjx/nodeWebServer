
$(() => {

    $('form').submit(function (e) {
        e.preventDefault();
        const srch = $('input').val()
        $('#msg-1').text('Loading...')
        $('#msg-2').text('')
        fetch('http://localhost:3000/weather?address=' + srch).then((response) => {
            response.json().then((data) => {
                if (data.error){ 
                    $('#msg-1').text("ERROR: " + data.error)
                    $('#msg-2').text('')
                }else {
                    $('#msg-1').text(data.forcast);
                    $('#msg-2').text(data.location)
                }

            })
        })
    })
})