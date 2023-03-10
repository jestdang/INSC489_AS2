
    const data = [
        {campus: "UT KNOXVILLE", enrollment: 29460, color: '#fd8105' },
        {campus: "UT CHATTANOOGA", enrollment:11590, color:'#ecaa1f'},
        {campus: "MARTIN", enrollment: 7280, color: '#0e223f'},
        {campus: "HEALTH SCIENCE CENTER", enrollment: 2815, color: '#036646'}
    ];

    // add canvas dimensions
    const margin = {left: 100, top: 10, right: 10, bottom: 50},
        width = 600 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    // create svg
    const svg = d3.select('body').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);


    // create xScale bands & yScale
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.campus))
        .range([0, width])
        .paddingInner(0.15);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.enrollment)])
        .range([height, 0]);

    // create axes
    const xAxis = d3.axisBottom(xScale)
        .tickSizeOuter(0);

    const yAxis = d3.axisLeft(yScale)
        .ticks(6)
        .tickSizeOuter(0);

    // call axes + translate xAxis to the bottom
    const xAxisGroup = svg.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    const yAxisGroup = svg.append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis);

    // add bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.campus))
            .attr('y',  d => yScale(d.enrollment))
            .attr('width', xScale.bandwidth())
            .attr("height", d => yScale(height - d.enrollment))
            .attr('fill', d => d.color)

    // add label
    svg.append("text")
        .attr("transform", `0, translate(${height})`)
        .attr("x", 200)
        .attr("y", 50)
        .attr("font-size", "15px")
        .text("The Enrollment of UT Campuses");
