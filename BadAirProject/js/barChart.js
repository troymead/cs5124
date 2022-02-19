class barChart {
    constructor(_config, _data, _slices, _type) {

        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: { top: 10, bottom: 30, right: 50, left: 50 }      

        };
        this.data = _data;
        this.slices = _slices;
        this.type = _type;

        this.initVis();
    }

    initVis() {
        let vis = this;
        vis.colors = ["#C9D6DF", "#F7EECF", "#E3E1B2", "#F9CAC8"];

        vis.xValue = d => d.type;
        vis.yValue = d => d.value;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);
        
        // vis.xLabels = [];

        // vis.slices.forEach(elem => {
        //     vis.xLabels.push(elem.id);
        // })

        // console.log(vis.xLabels);

        // vis.newData = d3.layout.stack()(vis.xLabels.map(elem => {
        //     return vis.data.map(d => {
        //         return {x: d.year, y: +d[elem]}
        //     });
        // }));

        vis.xScale = d3.scaleBand()
            .domain(vis.data.map(vis.xValue))
            .range([0,vis.width]);


        vis.yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([vis.height,0]);

        // vis.zScale = d3.scaleOrdinal()
        //     .range(vis.colors);

        vis.yAxis = d3.axisLeft()
            .ticks(10)
            .scale(vis.yScale);

        vis.xAxis = d3.axisBottom()
            // .ticks()
            // .tickFormat(d3.time.format("%Y"))
            // .ticks(vis.xLabels.length)
            .scale(vis.xScale);

        // vis.svg.append('g')
        //     .attr('class', 'axis')
        //     .call(vis.yAxis);


        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);


        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`)
            .call(vis.xAxis);


        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis')
            .call(vis.yAxis);


        vis.chart.selectAll('.bar')
            .data(vis.data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .style('fill', '#C9D6DF')
            .attr('x', d => vis.xScale(d.type))
            .attr('y', d => vis.yScale(d.value))
            .attr('width', vis.xScale.bandwidth())
            .attr('height', d => vis.height - vis.yScale(d.value))
        // vis.svg.append('g')
        //     .attr('class', 'axis')
        //     .call(vis.yAxis)
        //     .append('text')
        //     .attr('transform', 'rotate(-90)')
        //     .attr('dy', '.75em')
        //     .attr('y', 6)
        //     .style('text-anchor', 'end')
        //     .text('Percentage');

        // vis.groups = vis.svg.selectAll("g.bars")
        //     .data(vis.slices)
        //     .enter();
            // .attr('class', 'bars')
            // .style('fill', (d,i) => vis.colors[i])
            // .attr('stroke', '#000');

        // vis.rect = vis.groups.selectAll('rect')
        //     .data(d => d)
        //     .enter()
        //     .append('rect')
        //     .attr('x', d => vis.xScale(d.date))
        //     .attr('y', d => vis.yScale(d.measurement))
        //     .attr('height', d => vis.yScale(d.y0) - vis.yScale(d.y0 + d.measurement))
            // .attr('width', vis.xScale.rangeBand());
    
        // vis.rect = vis.svg.selectAll('category')
        //     .data(vis.slices)
        //     .join('g')
        //     .selectAll('rect')
        //     .data(d => d)
        //     .join('rect')
        //     .attr('x')
        //     .attr('y')
        //     .attr('height')

    }

    updateVis() {

    }
}