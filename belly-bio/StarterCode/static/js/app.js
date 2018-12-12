function buildMetadata(sample) {

  d3.json(`/metadata/${sample}`).then(function(sample){
    
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");
    
    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");
   
    Object.entries(sample).forEach(function ([key, value]) {
      var row = sample_metadata.append("panel-body");
      row.text(`${key}: ${value} \n`);
  });
 });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(`/samples/${sample}`).then(function(data) {
      console.log(data);
    // @TODO: Build a Bubble Chart using the sample data
    
    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      text: data.otu_labels,
      mode: 'markers',
      marker: {
        size: data.sample_values,
        color: data.otu_ids,
        colorscale: "Bluered"
  
      }
    };
    
    var bbl_data = [trace1];
    
    var bbl_layout = {
      showlegend: false,
      xaxis: { title: "OTU ID"},
      height: 500,
      width: 1200
    };
    
    Plotly.newPlot('bubble', bbl_data, bbl_layout);

    // @TODO: Build a Pie Chart
    var d = [{
      values: data.sample_values.slice(0, 10),
      labels: data.otu_ids.slice(0, 10),
      type: 'pie'
    }];
    
    var layout = {
      height: 650,
      width: 800
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
