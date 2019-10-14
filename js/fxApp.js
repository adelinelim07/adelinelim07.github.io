
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
function plotChart(label,x,y,chartID) {
    var ctx = document.getElementById(chartID).getContext('2d');
    var dataset = [];

    dataset= [{
        label: label,
        borderColor: 'rgba(0,0,0,1)',
        data: y,
        fill: false
    }];

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: x,
            datasets: dataset
        },
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
// GET DATES INPUT
///////////////////////////////////////////////////////////////////////////
//var startDate = document.getElementById("dateInput");

var endDate = new Date(); //today's Date
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
// FUNCTION TO TABULATE ALL FX DATA
///////////////////////////////////////////////////////////////////////////
$(()=>{

    $("#submitSnapshotDate").click(function(){
        event.preventDefault();
        $("#fxTableBody").remove();
        $("#fx-numbers").append(`<tbody id="fxTableBody">`);

        var selectedDate = $("#snapshotDate").val(); //value is string yyyy-mm-dd

        var yearAgoDate = `${selectedDate.slice(0,4)-1}-${(selectedDate).slice(5,7)}-${selectedDate.slice(8,10)}`;
        var monthAgoDate = monthAgo(selectedDate);
        
        var quote = ["GBP","EUR","HKD","IDR","MXN","CNY","SGD","TRY","CAD","INR","JPY","RUB","THB","MYR","KRW"];
        var country = ["UK","EU","Hong Kong","Indonesia","Mexico","PRC","Singapore","Turkey","Canada","India","Japan","Russia","Thailand","Malaysia","South Korea"];


        var snapshotRate = [];
        var yearAgoRate = [];
        var monthAgoRate = [];
        var yoy = [];
        var mom = [];
        
        $.ajax({
            url: `https://api.ratesapi.io/api/${selectedDate}?base=USD`
        }).then((data)=> {
            for (let i=0; i< quote.length; i++){
                snapshotRate.push(Number(data['rates'][quote[i]].toPrecision(4)));
            }
            $.ajax({
                url: `https://api.ratesapi.io/api/${yearAgoDate}?base=USD`
            }).then((data)=>{
                for (let i=0; i< quote.length; i++){
                    yearAgoRate.push(Number(data['rates'][quote[i]].toPrecision(4)));
                    yoy.push((((snapshotRate[i]/yearAgoRate[i])-1)*100).toFixed(1));
                }
                $.ajax({
                    url: `https://api.ratesapi.io/api/${monthAgoDate}?base=USD`
                }).then((data)=>{
                    for (let i=0; i< quote.length; i++){
                        monthAgoRate.push(Number(data['rates'][quote[i]].toPrecision(4)));
                        mom.push((((snapshotRate[i]/monthAgoRate[i])-1)*100).toFixed(1));
                         if (i === (quote.length - 1)){
                             for (let j=0; j<quote.length; j++){
                                 $("#fxTableBody").append(`<tr><th style="width:20vw">${quote[j]}</th><th style="width:25vw">${country[j]}</th><th style="width:35vw">${snapshotRate[j]}</th><th style="width:10vw">${yoy[j]}</th><th style="width:10vw">${mom[j]}</th></tr>`);
                             }
                        }
                    }
                })
            })
        })
        console.log(snapshotRate);
        console.log(yoy);
        console.log(mom);
    });
});


function monthAgo(date){
    var dateformat = new Date(date);
    var datelastmonth = new Date(dateformat.getFullYear(), dateformat.getMonth()-1, dateformat.getDate());
    return convertDate(datelastmonth);
}

function plotTable(rates) {
    var fxLine = `<tr><td>USD SGD</td><td>${rates[rates.length-1]}</td></tr>`;
    $('#fx-numbers').append(fxLine);
}


///////////////////////////////////////////////////////////////////////////
// GET FX API
///////////////////////////////////////////////////////////////////////////
// Src API: https://ratesapi.io/documentation/
// date format on API: y-m-d

var quoteCurrency= "";

$(()=>{
    $("#submitCurrency").click(function(){
        event.preventDefault();
        $("canvas#fxChart").remove();
        $(".chart-container").append(`<canvas id="fxChart"></canvas>`);
        let ratesArray = [];
        quoteCurrency = $("#quote").find(":selected").text();
        console.log(quoteCurrency);
        
        for (let i=0; i<datesArray.length; i++){
            $.ajax({
                async: false,
                url: `https://api.ratesapi.io/api/${datesArray[i]}?base=USD`
            }).then((data)=> {
                var rate = data['rates'][quoteCurrency];
                ratesArray.push(rate);
                if(i == (datesArray.length - 1)) {
                    plotChart(quoteCurrency,datesArray,ratesArray,'fxChart')
                }
            })
        }
        console.log(ratesArray); 
    })
})
