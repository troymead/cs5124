class Line3 {
    constructor(_config, _data, _slices, _type) {

        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: { top: 10, bottom: 30, right: 50, left: 50 }      

        }

        this.data = _data;
        this.slices = _slices;
        this.type = _type;

        this.initVis();
    }

    initVis() {

        let vis = this;
        console.log(vis.slices);

        // vis.keys =
        vis.colorsArr = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]

        // vis.colors = d3.scaleOrdinal()
        //     .domain(vis.keys)
        //     .range(vis.colorsArr);

        if (vis.type == "AQI") {
            vis.aqiMaxMax = d3.max(vis.slices[0].values, d => d.measurement);
            vis.aqi90Max = d3.max(vis.slices[1].values, d => d.measurement);
            vis.aqiMedMax = d3.max(vis.slices[2].values, d => d.measurement);
    
            vis.aqiAllMax = d3.max([vis.aqiMaxMax,vis.aqi90Max,vis.aqiMedMax]);
            console.log(vis.aqiAllMax);
    
        }

        vis.allMaxPollutantsArr = []

        if (vis.type == "pollutant") {
            vis.slices.forEach(pollutant => {
                // TODO: FINISH THIS
                console.log(pollutant);
                vis.allMaxPollutantsArr.push(d3.max(pollutant.values, d => d.measurement));

            })
            vis.pollutantAllMax = d3.max(vis.allMaxPollutantsArr);

            console.log(vis.allMaxPollutantsArr);
            console.log(vis.pollutantAllMax);
        }


        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

        vis.xScale = d3.scaleLinear().range([0,vis.width]);
        vis.yScale = d3.scaleLinear().rangeRound([vis.height,0]);

        vis.xScale.domain(d3.extent(vis.data, function(d) {
            return d.year;
        }));

        if (vis.type == "AQI") {
            vis.yScale.domain([(0), vis.aqiAllMax]);
        }
        
        if (vis.type == "pollutant") {
            vis.yScale.domain([(0), vis.pollutantAllMax]);
        }

        vis.yAxis = d3.axisLeft()
            .ticks((vis.slices[0].values).length)
            .scale(vis.yScale);

        vis.xAxis = d3.axisBottom()
            .scale(vis.xScale);

        vis.line = d3.line()
            .x(function(d) { return vis.xScale(d.date); })
            .y(function(d) { return vis.yScale(d.measurement); });
            // .style('stroke', d => vis.colors(d));

        vis.counter = 0;

        vis.id = 0;
        vis.ids = function () {
            return "line-"+vis.id++;
        };

        vis.svg.append('g')
            .attr('class', 'axis')
            .attr('transform', "translate(0," + vis.height + ")")
            .call(vis.xAxis);

        vis.svg.append('g')
            .attr('class', 'axis')
            .call(vis.yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('dy', '.75em')
            .attr('y', 6)
            .style('text-anchor', 'end')
            .text('AQI');

        vis.lines = vis.svg.selectAll('lines')
            .data(vis.slices)
            .enter()
            .append('g');
            // .attr('stroke', (d) => vis.colors(d));

        vis.lines.append('path')
            .attr('class', vis.ids)
            .attr('d', function(d) { return vis.line(d.values); });

    }
}