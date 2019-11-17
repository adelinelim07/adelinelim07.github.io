
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
        var g = Math.floor(Math.random() * (255-128) + 128);
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
// FUNCTION TO TABULATE ALERTS
///////////////////////////////////////////////////////////////////////////
function plotAlert(quoteCurrency,datesArray,ratesArray) {
    var change =0;

    for (let i=0; i< quoteCurrency.length; i++){

        change= ((ratesArray[i][datesArray.length-2]/ratesArray[i][datesArray.length-1])-1)*100;
        
        if(change<0){
            var fxLine = `<tr><td>${quoteCurrency[i]}</td><td>${Number(ratesArray[i][ratesArray.length-1]).toPrecision(3)}</td><td style="color:red">&#9660</td></tr>`;
            $('#fx-numbers').append(fxLine);
            if (change <-0.5){
                var momLine = `<tr><td>${quoteCurrency[i]}</td><td style="color:red">${Number(change).toPrecision(2)}%</td></tr>`;
                $('#alert-numbers').append(momLine);
                setTimeout(function(){alert(`Depreciation of ${quoteCurrency[i]} against USD exceeded threshold of 0.5%!`);},1000);
            }
        } else {
            var fxLine = `<tr><td>${quoteCurrency[i]}</td><td>${Number(ratesArray[i][ratesArray.length-1]).toPrecision(3)}</td><td style="color:green">&#9650</td></tr>`;
            $('#fx-numbers').append(fxLine);
            if (change>0.5){
                var momLine = `<tr><td>${quoteCurrency[i]}</td><td style="color:green">${Number(change).toPrecision(2)}%</td></tr>`;
                $('#alert-numbers').append(momLine);
                setTimeout(function(){alert(`Appreciation of ${quoteCurrency[i]} against USD exceeded threshold of 0.5%!`);},1000);
            }
        }
    }
}


///////////////////////////////////////////////////////////////////////////
// GET DATES INPUT
///////////////////////////////////////////////////////////////////////////
//var startDate = document.getElementById("dateInput");
var endDate = new Date(); //today's Date
let datesArray = []; 

datesArray.push(convertDate(endDate));
var monthAgoRate = new Date(endDate.getFullYear(), endDate.getMonth()-1, endDate.getDate());
var chartDate = monthAgoRate;
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

function dateToYearMonthFormat(inputDate){
    var month= inputDate.getMonth()+1;

    if (month<10){
        month = '0'+month;
    } 

    var fuelDate = `${inputDate.getFullYear()}${month}`;
    return fuelDate;
}

function convertStringToDate(inputDate){
    var dateFormat = new Date (inputDate);
    return dateFormat;
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
// SHOW HEADER
///////////////////////////////////////////////////////////////////////////
    var options = { weekday: "long", year:"numeric" , month: "short", day: "numeric"};
    var displayDate = endDate.toLocaleDateString("end-US",options);
    $("#header").text(`Daily Updates as at ${displayDate}`);
    $("#header").css({'color':'rgb(255,255,255)'});

///////////////////////////////////////////////////////////////////////////
// GET FX API
///////////////////////////////////////////////////////////////////////////
// Src API: https://ratesapi.io/documentation/
// date format on API: y-m-d
    var quoteCurrency = ["SGD","BRL","RUB","CNY","INR"];
    let rawDataArray = [];
    let requiredDataArray = [];
    let ratesArray = [];
    let singleRatesArray = [];

    for (let i=0; i<datesArray.length; i++){
        $.ajax({
       //     async: false,
            url: `https://api.ratesapi.io/api/${datesArray[i]}?base=USD`
        }).then((data)=> {
            var rawData = data;
            rawDataArray.push(rawData);

            //check all ajax called
            if(rawDataArray.length===datesArray.length){
                //sort ajax data in right order required
                console.log(rawDataArray);
                
                for (let i=0; i<rawDataArray.length; i++){
                    requiredDataArray.push({"rates":rawDataArray[i]["rates"], "date": convertStringToDate(rawDataArray[i]["date"])});
                }
                requiredDataArray.sort(function(a,b){
                    var dateA = new Date(a.date), dateB = new Date(b.date);
                    return dateA - dateB;
                });
                //put ajax data into arrays for plotting
                for (let i=0; i<quoteCurrency.length; i++){

                    for (let j=0; j<datesArray.length; j++){
                        singleRatesArray.push(requiredDataArray[j]["rates"][quoteCurrency[i]]);
                    }
                    ratesArray.push(singleRatesArray);
                    singleRatesArray=[];
                }
                console.log(ratesArray);
                plotChart(quoteCurrency,datesArray,ratesArray,'fxChart');
                plotAlert(quoteCurrency,datesArray,ratesArray);
            }
        })

    } 

    
///////////////////////////////////////////////////////////////////////////
// GET Jet Fuel API
///////////////////////////////////////////////////////////////////////////
// Src API: https://api.eia.gov/series/?api_key=8650106704abd018341b51cb15952349&series_id=STEO.JKTCUUS.M
// https://www.eia.gov/opendata/qb.php?sdid=STEO.JKTCUUS.M
    let fuelRatesArray = [];
    var fuelDate = dateToYearMonthFormat(endDate);
    var dateAxis = [];
    var fuelRatesAxis = [];
    var indexFuelRateArray = 0;
    var units = 0;

    $.ajax({
        //async: false,
        url: `https://api.eia.gov/series/?api_key=8650106704abd018341b51cb15952349&series_id=STEO.JKTCUUS.M`
    }). then(
        (data)=>{
            fuelRatesArray = data["series"][0]["data"];
            units = data["series"][0]["units"];
            console.log(units);
            for(let i =0; i < fuelRatesArray.length; i++){
                if(fuelRatesArray[i][0] === fuelDate){
                    indexFuelRateArray = i;
                }
            }
            for (let i=indexFuelRateArray; i < indexFuelRateArray + 24 ; i++){
            dateAxis.push(`${fuelRatesArray[i][0].substring(0,4)}-${fuelRatesArray[i][0].substring(4,6)}`);
            fuelRatesAxis.push(fuelRatesArray[i][1]);
            }
            dateAxis.reverse();
            fuelRatesAxis.reverse();
            console.log(fuelRatesAxis);
            plotChart([`US ${units}`],dateAxis,[fuelRatesAxis],'FuelChart');
    })


///////////////////////////////////////////////////////////////////////////
// GET NEWS API
///////////////////////////////////////////////////////////////////////////
// Src API: https://newsapi.org/v2/everything?q=${topic}&apiKey=16eb9fb697714b3ca743394665a59dc2
    let newsTitleArray = [];
    var topic = "airlines";
    let urlWithNewsTopic = `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&apiKey=16eb9fb697714b3ca743394665a59dc2`;
    
    $.ajax({
        url: urlWithNewsTopic
    }).then(
        (data)=>{
            var articlesArray = data['articles'];

            for (article of articlesArray){
                var title = article['title'];
                var link = article['url'];
                $('#News-lines').append(`<a href="${link}"><li>${title}</li></a>`);
            }
              
    })
})
    

