///////////////////////////////////////////////////////////////////////////
// FUNCTION TO PLOT PIE CHART                                                          
///////////////////////////////////////////////////////////////////////////
function plotPieChart(inputDataArray,labelsArray,canvasID){
    var ctx = document.getElementById(canvasID).getContext('2d');
    var backgroundArray = [];
    var borderArray = [];
    for (let i = 0; i <inputDataArray.length; i++){
        backgroundArray.push(dynamicColor());
        borderArray.push('black');
    };
    var data = {
        datasets: [{
            data: inputDataArray,
            fill: true,
            backgroundColor: backgroundArray,
            borderColor: borderArray,
            borderWidth: 0.5

        }],
        labels: labelsArray
    };

    var chart = new Chart(ctx,{
        type: 'pie',
        data: data,
        options: {
            legend: {
                position: 'left'
            },
            cutoutPercentage: 30,
            maintainAspectRatio: false
        }
    });

    function dynamicColor(){
        var r = 0;
        var g = Math.floor(Math.random() * (255-128) + 128);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")"
    };

}

///////////////////////////////////////////////////////////////////////////
// FUNCTION TO PLOT BAR CHART                                                        
///////////////////////////////////////////////////////////////////////////
function plotBarChart(inputDataArray,labelsArray,canvasID){
    var ctx = document.getElementById(canvasID).getContext('2d');
    var data = {
        datasets: [{
            data: inputDataArray,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2
        }],
        labels: labelsArray
    };

    var options = {
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0
                }

            }],
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }]
        }
    }

    var chart = new Chart(ctx,{
        type: 'bar',
        data: data,
        options: options
    });

    function dynamicColor(){
        var r = 0;
        var g = Math.floor(Math.random() * (255-128) + 128);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")"
    };

}

///////////////////////////////////////////////////////////////////////////
// FUNCTION TO CALCULATE AGE                                                   
///////////////////////////////////////////////////////////////////////////
function calculateAge(inputMnfDate) {
    var today = new Date();
    var mnfDate = new Date(inputMnfDate);
    var months;
    months = (today.getFullYear() - mnfDate.getFullYear()) * 12;
    months -= mnfDate.getMonth() + 1;
    months += today.getMonth();
    var age = Math.round(months/12);
    return age;
}

///////////////////////////////////////////////////////////////////////////
// FUNCTION TO PLOT HORIZONTAL BAR CHART                                                        
///////////////////////////////////////////////////////////////////////////
function plotHBarChart(inputDataArray,labelsArray,canvasID){
    var ctx = document.getElementById(canvasID).getContext('2d');
    var data = {
        datasets: [{
            data: inputDataArray,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2
        }],
        labels: labelsArray
    };

    var options = {
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0
                }

            }],
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }, 
                ticks: {
                    suggestedMin: 0
                }
            }]
        }
    }

    var chart = new Chart(ctx,{
        type: 'horizontalBar',
        data: data,
        options: options
    });

    function dynamicColor(){
        var r = 0;
        var g = Math.floor(Math.random() * (255-128) + 128);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")"
    };

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
})
