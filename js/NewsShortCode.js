$(document).ready(()=>{
    $(".loading").show();
    getData();

    function bigScreenCard(type, item){
        var widthCard = "col-md-12";
        var colImg = "col-md-3";
        var colContent = "col-md-9";
        if(type == "ScreenDaily"){
            widthCard = "col-md-6";
            colImg = "col-md-4";
            colContent = "col-md-8";
        }
        return ` <div class="${widthCard}">
                    <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="${colImg}">
                        <img style="width: 100%;" src="${(item.image == null || item.image == undefined) ? "image/no-image-icon-15.png" : item.image.url}" alt="...">
                        </div>
                        <div class="${colContent}">
                        <div class="card-body">
                            <h5><a class="text-dark text-decoration-none head-text" href="${item.link}">${item.head}</a></h5>
                            <p class="card-text body-text">${item.body}</p>
                            <p class="card-text"><small class="text-muted">
                            <time class="timeago" datetime="${item.publishDateTime}">...</time>
                            </small></p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>`
    }

    function smallScreenCard(type, item){
        return ` <li class="list-group-item">
                    <div class="mb-3" style="max-width: 540px;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                        <img style="width: 100%;" src="${(item.image == null || item.image == undefined) ? "image/no-image-icon-15.png" : item.image.url}" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 ><a class="text-dark text-decoration-none head-text href="${item.link}">${item.head}</a></h5>
                            <p class="card-text body-text">${item.body}</p>
                            <p class="card-text"><small class="text-muted">
                            <time class="timeago" datetime="${item.publishDateTime}">...</time>
                            </small></p>
                        </div>
                        </div>
                    </div>
                    </div>

                </li>`
    }
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
            
           
            $(".loading").hide();
            console.log(response);
            let screenDailyContent = "";
            let VarietyContent = "";
            let TheHollywoodContent = "";
            let DeadlineContent = "";
            for(item of response.items){
                if(item.source.label == "ScreenDaily"){
                    screenDailyContent += bigScreenCard("ScreenDaily",item);
                }else if(item.source.label == "Variety"){
                    VarietyContent += bigScreenCard("Variety",item);
                }else if(item.source.label == "The Hollywood Reporter"){
                    TheHollywoodContent += smallScreenCard("The Hollywood Reporter",item);
                }else if(item.source.label == "Deadline"){
                    DeadlineContent += smallScreenCard("Deadline",item);
                }
                $(".screen-daily").html(screenDailyContent)
                $(".variety").html(screenDailyContent)
                $(".the-hollywood-reporter").html(TheHollywoodContent)
                $(".deadline").html(DeadlineContent)
                $("time.timeago").timeago();
            }
        });
    }
    // var content="";
    // function displayData(response){
        
    //     for(item of response.items){
    //         var publishAt = item.publishDateTime;
    //         var publishDateMili = Date.parse(publishAt)
    //         var pDate = new Date(publishDateMili)
    //         content += ` <div class="col-md-6">
    //                         <div class="card mb-3">
    //                             <div class="row g-0">
    //                             <div class="col-md-4">
    //                                 <img style="width: 100%;" src="${(item.image == null || item.image == undefined) ? "image/no-image-icon-15.png" : item.image.url}" alt="...">
    //                             </div>
    //                             <div class="col-md-8">
    //                                 <div class="card-body">
    //                                 <h5><a href="${item.link}">${item.head}</a></h5>
    //                                 <p class="card-text body-text">${item.body}</p>
    //                                 <p class="card-text"><small class="text-muted">${pDate.toLocaleDateString()}</small></p>
    //                                 </div>
    //                             </div>
    //                             </div>
    //                         </div>
    //                     </div>`
    //     }
    // $(".all-data").html(content);
    // }
})