///////////////////////////////////////////////////////////////////////////
// FUNCTION TO PLOT PIE CHART                                                          
///////////////////////////////////////////////////////////////////////////
function plotPieChart(inputDataArray,canvasID){
    var ctx = document.getElementById(canvasID).getContext('2d');
    var data = {
        datasets: [{
            data: inputDataArray
        }],
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };

    var chart = new Chart(ctx,{
        type: 'pie',
        data: data,
      //  options: options
    });

    function dynamicColor(){
        var r = 0;
        var g = Math.floor(Math.random() * (255-128) + 128);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")"
    };

}
///
plotPieChart([1,2,3],"aircraftTypeChart");
console.log("test");