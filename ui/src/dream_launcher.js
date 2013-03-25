(function($) {
  "use strict";
  jsPlumb.bind("ready", function() {
    var graph_data = {}, dream_instance, available_people = {}, people_list,
        i, i_length;
    graph_data.throughput = 0;
    graph_data.box_list = [
        {id: 'window1', title: 'attach1', throughput: 30, target_list: ['window2'], coordinate: {top: 5, left: 5}},
        {id: 'window2', title: 'attach2', throughput: 21, target_list: ['window3'], coordinate: {top: 5, left: 15}},
        {id: 'window3', title: 'attach3', throughput: 29, target_list: ['window7'], coordinate: {top: 5, left: 25}},
        {id: 'window4', title: 'attach1', throughput: 22, target_list: ['window5'], coordinate: {top: 20, left: 5}},
        {id: 'window5', title: 'attach2', throughput: 27, target_list: ['window6'], coordinate: {top: 20, left: 15}},
        {id: 'window6', title: 'attach3', throughput: 26, target_list: ['window7'], coordinate: {top: 20, left: 25}},
        {id: 'window7', title: 'Moulding', throughput: 40, target_list: ['window8', 'window10'], coordinate: {top: 12, left: 35}},
        {id: 'window8', title: 'tests', throughput: 23, target_list: ['window9'], coordinate: {top: 5, left: 45}},
        {id: 'window9', title: 'packaging', throughput: 25, coordinate: {top: 5, left: 55}},
        {id: 'window10', title: 'tests', throughput: 28, target_list: ['window11'], coordinate: {top: 20, left: 45}},
        {id: 'window11', title: 'packaging', throughput: 27, coordinate: {top: 20, left: 55}},
    ];

    dream_instance = DREAM.newDream(graph_data);
    dream_instance.start();

    //Fill list of people
    people_list = ["Seb", "Jerome", "Jean-Paul", "Anna", "George", "Ivor", "Dipo", "Stephan"];
    i_length = people_list.length;
    for (i = 0; i < i_length; i++) {
      $("#not_available ul").append('<li class="ui-state-default">' + people_list[i] + "</li>");
    }

    // Make list of people draggable, update list of people depending
    // to make them available or not
    $("#available li").draggable({appendTo: "body"});
    $("#not_available li").draggable({appendTo: "body"});
    $("#available").droppable({
      drop: function(event, ui) {
        available_people[ui.draggable.text()] = true;
        dream_instance.setSimulationParameters(available_people);
      }
    });
    $("#not_available").droppable({
      drop: function(event, ui) {
        available_people[ui.draggable.text()] = false;
        dream_instance.setSimulationParameters(available_people);
      }
    });
  })

})(jQuery);