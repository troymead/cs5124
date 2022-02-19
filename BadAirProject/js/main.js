d3.csv('data/bad_air_hamiltonOhio.csv')
    .then(data => {

        console.log('Data loading complete. Work with dataset.');
        console.log(data);

        let slices = data.columns.slice(3).map(function(id) {
            return {
                id: id,
                values: data.map(function(d) {
                        return {
                            date: +d.year,
                            measurement: +d[id]
                        };

                })
            };
        });

        console.log(slices);

        let missedDays = []

        // process data
        data.forEach(d => {
            // convert any strings to numbers
            d.year = +d.year;
            d.days_aqi = +d.days_aqi;
            d.good_days = +d.good_days;
            d.moderate_days = +d.moderate_days;
            d.unhealthy_sensitive = +d.unhealthy_sensitive;
            d.unhealthy_days = +d.unhealthy_days;
            d.very_unhealthy_days = +d.very_unhealthy_days;
            d.hazardous_days = +d.hazardous_days;
            d.max_aqi = +d.max_aqi;
            d.percentile_90_aqi = +d.percentile_90_aqi;
            d.median_aqi = +d.median_aqi;
            d.days_co = +d.days_co;
            d.days_no2 = +d.days_no2;
            d.days_ozone = +d.days_ozone;
            d.days_so2 = +d.days_so2;
            d.days_pm25 = +d.days_pm25;
            d.days_pm10 = +d.days_pm10;

            d.state_county = d.state+d.county;

            missedDays.push({type: d.year, value: (365 - (+d.days_aqi))})

        });

        console.log(data);
        console.log(slices);
        console.log(slices[0]);

        // let minYear = +d3.min(data, d => d.year);
        // let maxYear = +d3.max(data, d => d.year);

        medianAQIPerYear = [];

        console.log(medianAQIPerYear);

        console.log(medianAQIPerYear);
        console.log(data);

        let vis1Slices = [slices[7], slices[8], slices[9]];
        let vis2Slices = [slices[10], slices[11], slices[12], slices[13], slices[14], slices[15]];
        let vis3Slices = [slices[0]];
        let vis4Slices = [slices[0],slices[1],slices[2],slices[3],slices[4],slices[5],slices[6]]; // need days_aqi for calculation
        let vis5Slices = [slices[0],slices[10], slices[11], slices[12], slices[13], slices[14], slices[15]]; // need days_aqi for calculation

        let vis1Type = "AQI";
        let vis2Type = "pollutant";
        let vis4Type = "days";
        let vis5Type = "";

        let daysPercent = [
            {type: 'good_days', value: ((data[40].good_days / data[40].days_aqi)*100)},
            {type: 'hazardous_days', value: ((data[40].hazardous_days / data[40].days_aqi)*100)},
            {type: 'unhealthy_days', value: ((data[40].unhealthy_days / data[40].days_aqi)*100)},
            {type: 'moderate_days', value: ((data[40].moderate_days / data[40].days_aqi)*100)},
            {type: 'unhealthy_sensitive', value: ((data[40].unhealthy_sensitive / data[40].days_aqi)*100)}
        ];

        let pollutantPercent = [
            {type: 'CO', value: ((data[40].days_co / data[40].days_aqi)*100)},
            {type: 'NO2', value: ((data[40].days_no2 / data[40].days_aqi)*100)},
            {type: 'SO2', value: ((data[40].days_so2 / data[40].days_aqi)*100)},
            {type: 'PM2.5', value: ((data[40].days_pm25 / data[40].days_aqi)*100)},
            {type: 'PM10', value: ((data[40].days_pm10 / data[40].days_aqi)*100)},
            {type: 'Ozone', value: ((data[40].days_ozone / data[40].days_aqi)*100)},
        ]


        console.log(daysPercent);
        // vis2Slices.forEach(pollutant => {
        //     pollutantPercent.push({
        //         id: pollutant.id,
        //         values: pollutant.values.map(value => pollutant.id))
        //     })
        // })



        let lineChartAQI = new Line3({
            'parentElement' : '#lineAQI',
            'containerHeight': 400,
            'containerWidth' : 1000
        }, data, vis1Slices, vis1Type);

        let lineChartPollutants = new Line3({
            'parentElement' : '#linePollutant',
            'containerHeight': 400,
            'containerWidth' : 1000
        },data, vis2Slices, vis2Type);

        // TODO: BAR CHART FOR DAYS WITHOUT MEASUREMENT HERE
        /*
        a chart (pie or bar) displaying the percentage of days 
        where the AQI was good / moderate / unhealthy for 
        sensitive / unhealthy / very unhealthy / hazardous 
        (note- not all days have measurements (see 'Days.with.AQI'), 
        so the total is not always out of 365) .  (Vis 4)
         */


        // TODO: BAR CHART FOR HEALTHY / UNHEALTHY AQI DAYS

        let healthBarChart = new barChart({
            'parentElement' : '#healthyBar',
            'containerHeight': 400,
            'containerWidth' : 1000
        },daysPercent);


        let pollutantBarChart = new barChart({
            'parentElement' : '#pollutantBar',
            'containerHeight': 400,
            'containerWidth' : 1000
        }, pollutantPercent)
        // PIE CHART FOR POLLUTANTS

        let missedDaysChart = new barChart({
            'parentElement' : '#missedDays',
            'containerHeight': 400,
            'containerWidth' : 1000
        }, missedDays)
        
    })
    .catch(error => {
        console.log(error);
        console.log('Error loading the data');
    });


    // TODO: event listeners here