
///////////////////////////////////////////////////////////////////////////
// TOGGLE SIDE BAR                                                         
///////////////////////////////////////////////////////////////////////////
$(() => {
    $("#mySidebar").mouseover(function(){
        console.log("opening sidebar");
        $(event.currentTarget).width("300px");
    });
    $("#mySidebar").mouseout(function(){
        console.log("closing sidebar");
        $(event.currentTarget).width("85px");
    });
})

///////////////////////////////////////////////////////////////////////////
// FUNCTION TO PLOT CHART                                                          
///////////////////////////////////////////////////////////////////////////
function plotChart(labelArray,x,yArray,chartID) {
    var ctx = document.getElementById(chartID).getContext('2d');
    var dataset = [];
    for (let i=0; i<labelArray.length; i++){
        var dataObject = {
            label: labelArray[i],
            borderColor: dynamicColor(),
            data: yArray[i],
            fill: false
        }
        dataset.push(dataObject);
    };

    function dynamicColor(){
        var r = 0;
        var g = Math.floor(Math.random() * (255-100) + 100);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")"
    };

    //console.log(dataset);

    var data = {
        labels: x,
        datasets: dataset 
    };

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: data,
        // Configuration options go here
        options: {
            legend:{
                display: true,
                fillStyle: Color,
            },
            elements: {
                line: {
                    tension:0
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

///////////////////////////////////////////////////////////////////////////
// FUNCTION TO TABULATE DATA
///////////////////////////////////////////////////////////////////////////
function plotTable(quoteCurrency, rates) {
    var fxLine = `<tr><td>USD ${quoteCurrency}</td><td>${Number(rates[rates.length-1]).toPrecision(5)}</td></tr>`;
    $('#fx-numbers').append(fxLine);
}

///////////////////////////////////////////////////////////////////////////
// SHOW HEADER
///////////////////////////////////////////////////////////////////////////
var endDate = new Date(); //today's Date

$(() =>{
    var options = { weekday: "long", year:"numeric" , month: "short", day: "numeric"};
    var displayDate = endDate.toLocaleDateString("end-US",options);
    $("#header").text(`Dashboard as at ${displayDate}`);
    $("#header").css({'color':'rgb(255,255,255)'});
})

///////////////////////////////////////////////////////////////////////////
// GET DATES INPUT
///////////////////////////////////////////////////////////////////////////
//var startDate = document.getElementById("dateInput");
let datesArray = []; 

datesArray.push(convertDate(endDate));
monthEnd = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
for (i=0; i<13; i++){
    datesArray.push(convertDate(monthEnd));
    monthEnd = new Date(monthEnd.getFullYear(), monthEnd.getMonth(), 0);

}
datesArray.reverse();
console.log(datesArray);

function convertDate(rawDateFormat){
    convertedDate = `${rawDateFormat.getFullYear()}-${rawDateFormat.getMonth()+1}-${rawDateFormat.getDate()}`;
    return convertedDate;
}

///////////////////////////////////////////////////////////////////////////
// GET FX API
///////////////////////////////////////////////////////////////////////////
// Src API: https://ratesapi.io/documentation/
// date format on API: y-m-d
var quoteCurrency = ["SGD","GBP","EUR","CNY"];
let rawRatesArray = [];
let ratesArray = [];
let singleRatesArray = [];

$(()=>{

    for (let i=0; i<datesArray.length; i++){
        $.ajax({
            async: false,
            url: `https://api.ratesapi.io/api/${datesArray[i]}?base=USD`
        }).then((data)=> {
            var rate = data['rates'];
            rawRatesArray.push(rate);
        })
    }   
})
console.log(rawRatesArray);


$(document).ajaxStop(function(){
    for (let i=0; i<quoteCurrency.length; i++){
        console.log(quoteCurrency[i]);

        for (let j=0; j<datesArray.length; j++){
            singleRatesArray.push(rawRatesArray[j][quoteCurrency[i]]);
        }
        ratesArray.push(singleRatesArray);
        singleRatesArray=[];
        
        plotTable(quoteCurrency[i], ratesArray[i]);
    }
    //console.log(ratesArray);
    plotChart(quoteCurrency,datesArray,ratesArray,'fxChart');
})

///////////////////////////////////////////////////////////////////////////
// GET NEWS API
///////////////////////////////////////////////////////////////////////////
// Src API: https://newsapi.org/v2/everything?q=${topic}&apiKey=16eb9fb697714b3ca743394665a59dc2
let newsTitleArray = [];
var topic = "airlines";

$(()=>{

    let urlWithNewsTopic = `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&apiKey=16eb9fb697714b3ca743394665a59dc2`;
    
    $.ajax({
        url: urlWithNewsTopic
    }).then(
        (data)=>{
            var articlesArray = data['articles'];
            console.log(articlesArray);

            for (article of articlesArray){
                var title = article['title'];
                var link = article['url'];
                //newsTitleArray.push(title);
                $('#News-lines').append(`<a href="${link}"><li>${title}</li></a>`);
                
            }  
    })

})
    

