///////////////////////////////////////////////////////////////////////////
// FUNCTION TO PLOT PIE CHART                                                          
///////////////////////////////////////////////////////////////////////////
function plotPieChart(inputDataArray,labelsArray,canvasID){
    var ctx = document.getElementById(canvasID).getContext('2d');
    var data = {
        datasets: [{
            data: inputDataArray,
            fill: true,
            backgroundColor: [dynamicColor(),dynamicColor(),dynamicColor()],
            borderColor: ['black','black','black'],
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
            cutoutPercentage: 30
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
// Activate plot chart                                                      
///////////////////////////////////////////////////////////////////////////
 //   plotPieChart([1,2,3],'aircraftTypeChart');


});