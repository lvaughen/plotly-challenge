// Use the D3 library to read in sample.json
var names = [];
var metadata = [];
var sample_data = [];

function filter_data(selection) {

    // Get the data and split it into the keys from the samples
    d3.json("samples.json").then(function (data) {

        metadata = data.metadata;
        // console.log(metadata)
        sample_data = data.samples;
        // console.log(sample_data)

        // Update the metadaata based on the selected ID
        var person_table = metadata.filter(person => person.id === parseInt(selection));
        // console.log(person_table)

        // filter data for bar chart
        var person_bar = sample_data.filter(person => person.id === selection);
        // console.log(person_bar);

        // var filtered = {
        // "person_table": person_table, 
        // "person_bar": person_bar};

        // console.log(filtered);
        // return filtered;

        render_table(person_table);
        render_bar(person_bar);
    });
};


function render_table(person_table) {

    // **************demo table udpate****************
    // Get a reference to the table body
    var tbody = d3.select("tbody");

    //  Update table based on filter

    tbody.html("");

    person_table.forEach(function (person_table) {
        var row = tbody.append("tr");

        Object.entries(person_table).forEach(function ([key, value]) {

            // Add a table data cell and obj value into the table
            var cell = row.append("tr");
            cell.text(`${key}: ${value}`)
        });
    });

    // **************gauge chart udpate****************
    // data for gauge chart
    // var person_table = metadata.filter(person => person.id === parseInt(selection));



    console.log(person_table[0])

    var data2 = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: person_table[0].wfreq,
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 10] },
                steps: [
                    { range: [0, 2], color: "lightgray" },
                    { range: [2, 4], color: "lightyellow" },
                    { range: [4, 6], color: "palegoldenrod" },
                    { range: [6, 8], color: "yellowgreen" },
                    { range: [8, 10], color: "limegreen" }
                ]
            }
        }
    ];
    var layout2 = {
        width: 600,
        height: 500,
        margin: { t: 0, b: 0 },
    };

    Plotly.newPlot('gauge', data2, layout2);


};

function render_bar(person_bar) {

    // **************bar chart udpate****************


    x_data = [];
    y_data = [];
    labels = [];

    // var SlicedSampleValues = person_bar[0].sample_values.slice(0,10).reverse();
    // var slicedOTUs = person_bar[0].otu_ids.slice(0,10).reverse().map(data => `OTU ` + data);
    // var slicedLabels = person_bar[0].otu_labels.slice(0,10).reverse();

    // x_data = SlicedSampleValues;
    // y_data = slicedOTUs;
    // label_names = slicedLabels;


    var x_data = person_bar[0].sample_values.slice(0, 10)
    // console.log(x_data)
    var y_data = [];
    for (i = 0; i < 10; i++) {
        y_data.push(`OTU ${person_bar[0].otu_ids[i]}`)
        // console.log(y_data)
    };

    var label_names = person_bar[0].otu_labels.slice(0, 10)
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

    // **************bubble chart udpate****************
    // filter data for bubble chart
    // var person_bar = sample_data.filter(person => person.id === selection);

    var x_values = person_bar[0].otu_ids;
    var y_values = person_bar[0].sample_values;
    var labels = person_bar[0].otu_labels;

    var tracebub = {
        x: x_values,
        y: y_values,
        mode: 'markers',
        marker: {
            size: person_bar[0].sample_values,
            color: person_bar[0].otu_ids
        }

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

};

function init() {

    d3.json("samples.json").then(function (data) {

        // console.log(data);
        var names = data.names;

        // INITIALIZE the page values

        // Try to set initial selection to empty
        // d3.select("#selDataset").property("value", "");
        var message = ("Choose a Subject");
        d3.select("#selDataset").append("option")
            .attr("value", message).html(message);

        var dropdown = d3.select("#selDataset");
        names.forEach(function (id) {
            var row = dropdown.append("option");
            row.property("value", id)
            // console.log(row.html())
            row.text(id);
        });
    });
};

// When a change happens update information/page
const dropdownchange = (selection) => {

    // console.log(selection);
    filter_data(selection);
    // console.log(data)
    
    // render_table(data.person_table);
    // render_bar(data.person_bar);

}

init();



















