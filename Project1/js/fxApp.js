
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
chartDate = new Date(endDate.getFullYear(), endDate.getMonth()-1, endDate.getDate());
for (i=0; i<13; i++){
    datesArray.push(convertDate(chartDate));
    chartDate = new Date(chartDate.getFullYear(), chartDate.getMonth()-1, chartDate.getDate());

}
datesArray.reverse();
console.log(datesArray);


function convertDate(rawDateFormat){
    convertedDate = `${rawDateFormat.getFullYear()}-${rawDateFormat.getMonth()+1}-${rawDateFormat.getDate()}`;
    return convertedDate;
}

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



///////////////////////////////////////////////////////////////////////////
// FUNCTION TO TABULATE ALL FX DATA
///////////////////////////////////////////////////////////////////////////


    $("#submitSnapshotDate").click(function(){
        event.preventDefault();
        $("#fxTableBody").remove();
        $("#fx-numbers").append(`<tbody id="fxTableBody">`);

        var selectedDate = $("#snapshotDate").val(); //value is string yyyy-mm-dd

        var yearAgoDate = `${selectedDate.slice(0,4)-1}-${(selectedDate).slice(5,7)}-${selectedDate.slice(8,10)}`;
        var monthAgoDate = monthAgo(selectedDate);
        
        var quote = ["NZD","CZK","CHF","ZAR","BRL","NOK","SEK","GBP","EUR","HKD","IDR","MXN","CNY","SGD","TRY","CAD","INR","JPY","RUB","THB","MYR","KRW"];
        var country = ["New Zealand","Czech Republic","Switzerland","South Africa","Brazil","Norway","Sweden","UK","EU","Hong Kong","Indonesia","Mexico","PRC","Singapore","Turkey","Canada","India","Japan","Russia","Thailand","Malaysia","South Korea"];


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
                    yoy.push((((yearAgoRate[i]/snapshotRate[i])-1)*100).toFixed(1));
                }
                $.ajax({
                    url: `https://api.ratesapi.io/api/${monthAgoDate}?base=USD`
                }).then((data)=>{
                    for (let i=0; i< quote.length; i++){
                        monthAgoRate.push(Number(data['rates'][quote[i]].toPrecision(4)));
                        mom.push((((monthAgoRate[i]/snapshotRate[i])-1)*100).toFixed(1));
                         if (i === (quote.length - 1)){
                             for (let j=0; j<quote.length; j++){
                                 $("#fxTableBody").append(`<tr><th style="width:20vw">${quote[j]}</th><th style="width:25vw">${country[j]}</th><th style="width:35vw">${snapshotRate[j]}</th><th style="width:10vw">${yoy[j]}</th><th style="width:10vw">${mom[j]}</th></tr>`);
                             }
                             $("#rate-column").click(function(){
                                event.preventDefault;
                                console.log("clicked");
                                sort_table(fxTableBody, 2, -1);
                             });

                             $("#yoy-column").click(function(){
                                event.preventDefault;
                                console.log("clicked");
                                sort_table(fxTableBody, 3, 1);
                             });

                             $("#mom-column").click(function(){
                                event.preventDefault;
                                console.log("clicked");
                                sort_table(fxTableBody, 4, 1);
                             });
                        }
                    }
                })
            })
        })
        console.log(snapshotRate);
        console.log(yoy);
        console.log(mom);
    });





///////////////////////////////////////////////////////////////////////////
// GET FX API
///////////////////////////////////////////////////////////////////////////
// Src API: https://ratesapi.io/documentation/
// date format on API: y-m-d

    var quoteCurrency= "";

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
///////////////////////////////////////////////////////////////////////////
// FUNCTION TO SORT TABLE
///////////////////////////////////////////////////////////////////////////
function sort_table(tbody, col, dsc){
    var rows = tbody.rows;
    var rlen = rows.length;
    var arr = [];
    var i, j, cells, clen;
    // fill the array with values from the table
    for(i = 0; i < rlen; i++)
    {
        cells = rows[i].cells;
        clen = cells.length;
        arr[i] = [];
      for(j = 0; j < clen; j++) { arr[i][j] = cells[j].innerHTML; }
    }
    // sort the array by the specified column number (col) and order (asc)
    arr.sort(function(a, b)
    {
        var retval=0;
        var fA=parseFloat(a[col]);
        var fB=parseFloat(b[col]);
        if(a[col] != b[col])
        {
            if((fA==a[col]) && (fB==b[col]) ){ retval=( fA > fB ) ? dsc : -1*dsc; } //numerical
            else { retval=(a[col] > b[col]) ? dsc : -1*dsc;}
        }
        return retval;      
    });
    for(var rowidx=0;rowidx<rlen;rowidx++)
    {
        for(var colidx=0;colidx<arr[rowidx].length;colidx++){ tbody.rows[rowidx].cells[colidx].innerHTML=arr[rowidx][colidx]; }
    }
}
