$(document).ready(()=>{
    getData();
    function getData(){
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://imdb8.p.rapidapi.com/actors/get-all-news?nconst=nm0001667",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "23fbbc426cmsh64d1b294e1c07f2p1f184ajsn05ce925d3001",
                "x-rapidapi-host": "imdb8.p.rapidapi.com"
            }
        };
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            displayData(response);
        });
    }
    var content="";
    function displayData(response){
        
        for(item of response.items){
            var publishAt = item.publishDateTime;
            var publishDateMili = Date.parse(publishAt)
            var pDate = new Date(publishDateMili)
            content += ` <div class="col-md-6">
                            <div class="card mb-3">
                                <div class="row g-0">
                                <div class="col-md-4">
                                    <img style="width: 100%;" src="${(item.image == null || item.image == undefined) ? "image/no-image-icon-15.png" : item.image.url}" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                    <h5><a href="${item.link}">${item.head}</a></h5>
                                    <p class="card-text body-text">${item.body}</p>
                                    <p class="card-text"><small class="text-muted">${pDate.toLocaleDateString()}</small></p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>`
        }
    $(".all-data").html(content);
    }
})