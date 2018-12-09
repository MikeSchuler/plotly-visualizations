function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // var tbody = d3.select("tbody");
  // // Use `d3.json` to fetch the metadata for a sample
  // d3.json(`/metadata/${sample}`, function(data) {
  //   console.log(data);
  // });

  // data.forEach(function(buildMetadata) {
  //   console.log(buildMetadata);
  //   var row = tbody.append("tr");

  // // Use `Object.entries` to add each key and value pair to the panel
  
  //   Object.entries(buildMetadata).forEach(function([key, value]) {
  //     console.log(key, value);
  //     // Append a cell to the row for each value
  //     // in the weather report object
  //     var cell = tbody.append("td");
  //   });
  // });
    
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(`/samples/${sample}`).then(function(data) {
      console.log(data);
    // @TODO: Build a Bubble Chart using the sample data
    

    // @TODO: Build a Pie Chart
    var d = [{
      values: data.sample_values.slice(0, 10),
      labels: data.otu_ids.slice(0, 10),
      type: 'pie'
    }];
    
    var layout = {
      height: 400,
      width: 500
    };
    
    Plotly.newPlot('pie', d, layout);


    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    })
  }


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    console.log(sampleNames)
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
