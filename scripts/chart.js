// YOUR CODE GOES HERE
var Grades = [
    {"grade": 'A', "frequency": 0.0},
    {"grade": 'B', "frequency": 0.0},
    {"grade": 'C', "frequency": 0.0},
    {"grade": 'D', "frequency": 0.0},
    {"grade": 'F', "frequency": 0.0},
];
    
     
    function getGrade(mark) {
        if (mark < 5.0) {
            return 'F';
        } else if (mark < 6.0) {
            return 'D';
        } else if (mark < 7.0) {
            return 'C';
        } else if (mark < 8.0) {
            return 'B';
        } else {
            return 'A';
        }
    }
    function calculateFreq(data){
        
        let size = data.length;
        let letters = ['A', 'B', 'C', 'D', 'F']
        for(var x = 0; x < size; x++){
            // console.log(parseFloat(data[x]));
            // Grade[getGrade(parseFloat(data[x])/10)] += 1;
            for(var y = 0; y < 5; y++){
                if(getGrade(parseFloat(data[x])/10) === letters[y]){
                    Grades[y].frequency += 1;
                    break;
                }
            }
        }

        
        for(var x = 0; x < letters.length; x++){
            Grades[x].frequency = Math.round((Grades[x].frequency/parseFloat(size)) * 100)/100;
        }
        // how to highlight with keyboard
        
        

        Graph(Grades);
        Grades = [
            {"grade": 'A', "frequency": 0.0},
            {"grade": 'B', "frequency": 0.0},
            {"grade": 'C', "frequency": 0.0},
            {"grade": 'D', "frequency": 0.0},
            {"grade": 'F', "frequency": 0.0},
        ];
    }

    function Graph(Grades){
        d3.select('svg').remove();
        
        const margin = 40;
        const width = 400;
        const height = 450;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;
    
        const colourScale = d3.scaleLinear() // scales the values in the y direction values closer to zero(closer to bottom) are more red
                              .domain([0, 1])  // values closer to top is more blue
                              .range(['red', 'blue']);
        
        const xScale = d3.scaleBand() // scales the values in a discrete format
                         .range([0, chartWidth]) // values go from 0 to 300px
                         .domain(Grades.map((s) => s.grade)) // split values [A,B,C,D,E,F] equally between the 300px
                         .padding(0.3);
        
        const yScale = d3.scaleLinear() // evenly distribute the grades between 200px - 0px
                         .range([chartHeight, 0])
                         .domain([0, 1]); // between 0 - 1
        
        const svg = d3.select('.chartContainer')  // add 
                      .append('svg')
                        .attr('width', width)
                        .attr('height', height);
          
        svg.append('text') // chart title
            .attr('x', margin + chartWidth / 2) // x and y values tell where text should be
            .attr('y', margin - 20)
            .attr('text-anchor', 'middle') // tells text where to go
            .text('Grade Distribution');

        svg.append('text')
            .attr('x', margin + chartWidth / 2 + margin)
            .attr('y', (chartHeight + 10) + 2 * margin - 15)
            .attr('text-anchor', 'middle')
            .text('Grade');

        svg.append('text')
            .attr('x', -margin + -(chartWidth / 2))
            .attr('y', margin)
            .attr('transform', 'rotate(-90)') // rotating 90 deg so that code is vertical
            .attr('text-anchor', 'middle') // placing in middle of svg tag
            .text('Frequency (%)');
        
        const canvas = svg.append('g')
                            .attr('transform', `translate(${margin}, ${margin})`); // canvas is the box where all ur scales and bars lay

        // x-axis and label
        canvas.append('g')
                 .attr('transform', `translate(${margin}, ${chartHeight})`) // this places the x axis line, try editing the margin for a 
                 .call(d3.axisBottom(xScale));                              // better explaination
    
        
    
        // y-axis and label
        canvas.append('g')
                 .attr('transform', `translate(${margin}, 0)`) // placing the y axis in the correct location
                 .call(d3.axisLeft(yScale));
    
        
        
        // the bar chart
        const bars = canvas.selectAll('rect') // in the canvas(box) select all rect
                           .data(Grades) // asscociate the data to grades
                           .enter() // if there is no rect than create on using enter() which will go through each index of Grades
                              .append('rect')
                                  .attr('x', (data) => margin + xScale(data.grade)) // set the starting point of rect using the current index of 
                                                                                    // grades since we are iterating through
                                  .attr('y', chartHeight) // the y value is chartHeight which is actually the bottom of the chart
                                  .attr('height', 0) // height of rectangle is zero since we use a animation to make is taller
                                  .attr('width', xScale.bandwidth()) // the width of each rectangle is determined by bandwith
                                                                     // since is only has 300px space with 5 elements [A B C D F] with .3 padding
                                  .attr('fill', (data) => colourScale(data.frequency)); // simply sets the colour of the rectangle
        bars.transition()
            .ease(d3.easeElastic)
            .duration(800)
            .delay((data, index) => index * 50)
            .attr('y', (data) => yScale(data.frequency))
            .attr('height', (data) => chartHeight - yScale(data.frequency));
  
        
    }
    


    // const xScale = d3.scaleBand()
    //                  .range([0, chartWidth])
    //                  .domain(salesData.map((s) => s.year))
    //                  .padding(0.3);

