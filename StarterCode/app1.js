// Use the D3 library to read in sample.json
var names =[];
var metadata=[];
var sample_data=[];

// Get the data and split it into the keys from the samples
d3.json("samples.json").then(function(data) {
    // console.log(data);
    names = data.names;
    // console.log(names)
    metadata = data.metadata;
    // console.log(metadata)
    sample_data = data.samples;
    // console.log(sample_data)

// populate the dropdown menu with the name ids
    
// Try to set initial selection to empty
    // d3.select("#selDataset").property("value", "");
    var message = ("Choose a Subject");
    d3.select("#selDataset").append("option")
    .attr("value", message).html(message);

    var dropdown = d3.select("#selDataset");
    names.forEach(function(id){
        var row = dropdown.append("option");
        row.property("value", id)
        // console.log(row.html())
        row.text(id);
    });

// When a change happens update information/page
    const dropdownchange = () => {    

    // d3.select("#selDataset").on("change", getData());

// Get the value selected from the dropdown menu
    var selection = d3.select("#selDataset").property("value");
    console.log(selection);

// Update the metadaata based on the selected ID
    var person_table = metadata.filter(person => person.id === parseInt(selection));
    // console.log(person_table)
 


// **************demo table udpate****************
 // Get a reference to the table body
    var tbody = d3.select("tbody");

//  Update table based on filter

    tbody.html("");

    person_table.forEach(function(person_table) {
        var row = tbody.append("tr");

        Object.entries(person_table).forEach(function([key, value]) {

 // Add a table data cell and obj value into the table
        var cell = row.append("tr");
        cell.text(`${key}: ${value}`)
       });
   });

// **************bar chart udpate****************
// filter data for bar chart
var person_bar = sample_data.filter(person => person.id === selection);
// console.log(person_bar);

x_data = [];
y_data = [];
labels = [];

// var SlicedSampleValues = person_bar[0].sample_values.slice(0,10).reverse();
// var slicedOTUs = person_bar[0].otu_ids.slice(0,10).reverse().map(data => `OTU ` + data);
// var slicedLabels = person_bar[0].otu_labels.slice(0,10).reverse();

// x_data = SlicedSampleValues;
// y_data = slicedOTUs;
// label_names = slicedLabels;


var x_data = person_bar[0].sample_values.slice(0,10)
// console.log(x_data)
for (i=0; i<10; i++){
var y_data = `OTU ${person_bar[0].otu_ids[i]}`
// console.log(y_data)
};

var label_names = person_bar[0].otu_labels.slice(0,10)
// console.log(label_names)

var trace1 = {
    x: x_data,
    y: y_data,
    text: label_names,
    type: "bar",
    orientation: 'h'
  };

// Combining both traces
var data = [trace1];

// Apply the group barmode to the layout
var layout = {
  title: "Top 10 OTUs Found",
//   barmode: "group",

};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", data, layout);

// **************bar chart udpate****************
// filter data for bubble chart
// var person_bar = sample_data.filter(person => person.id === selection);

var x_values = person_bar[0].otu_ids;
var y_values = person_bar[0].sample_values;
var labels = person_bar[0].otu_labels;

var tracebub = {
    x: x_values,
    y: y_values,
    mode: 'markers',
    marker:{
        size: person_bar[0].sample_values,
        color: person_bar[0].otu_ids}
    
    };

// Apply the group barmode to the layout
var layout1 = {
    title: "Sample Display",
    xaxis: {
        title: `OTU ${person_bar[0].id}`
    }   
}

var data1 = [tracebub];   
// Render the plot to the div tag with id "plot"
Plotly.newPlot("bubble", data1, layout1);

// **************gauge chart udpate****************
// data for gauge chart
// var person_table = metadata.filter(person => person.id === parseInt(selection));

console.log(person_table[0])

var data2 = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: person_table[0].wfreq,
        title: { text: "Belly Button Washing Frequency"},
		type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null, 10]},
            steps: [
               { range: [0,2], color: "lightgray"},
               { range: [2,4], color: "lightyellow"},
               { range: [4,6], color: "palegoldenrod"},
               { range: [6,8], color: "yellowgreen"},
               { range: [8,10], color: "limegreen"}
            ]
        }
	}
];
var layout2 = { 
    width: 600, 
    height: 500, 
    margin: { t: 0, b: 0 },
    // 'shapes': [
    //     {
    //         'type': 'path',
    //         'path': 'M 0.235 0.5 L 0.24 0.65 L 0.245 0.5 Z',
    //         'fillcolor': 'rgba(44, 160, 101, 0.5)',
    //         'line': {
    //             'width': 0.5
    //         },
    //         'xref': 'paper',
    //         'yref': 'paper'
    //     }
    // ], 

};

Plotly.newPlot('gauge', data2, layout2);









}
// Listen for event change with dropdown menu
    dropdown.on("change", dropdownchange);
});










