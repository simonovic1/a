var canvas_settings, two, step, field_size, corner_offset, index;

$('#user-schedule-modal').on('show.bs.modal', function (e) {
    setTimeout(init_schedule, 500);
})

init_schedule = function() {

  if (two)
    return;

  var canvas = document.getElementById('schedule');

  canvas_settings = {
    width: canvas.offsetWidth,
    height: Math.ceil(canvas.offsetWidth * 0.5),
    type: Two.Types.canvas
  }

  two = new Two(canvas_settings).appendTo(canvas);

  step = {
    x: Math.floor(canvas_settings.width / 160),
    y: Math.floor(canvas_settings.height / 80)
  }

  field_size = {
    x: step.x * 30,
    y: step.y * 5
  }

  corner_offset = {
    x: step.x * 10,
    y: step.y * 5
  }

  index = {
    day: 0,
    hour: 0
  }

  var days = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak'];
  var hours = ['08-09', '09-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22'];
  var hour_labels = true;

  for (var i = 0; i < 5; i++, index.hour=0, index.day++)
  {
    add_day_label(i, days[i]);

    for (var j = 0; j < 12; j++, index.hour++)
    {
      if (hour_labels)
        add_hour_label(j, hours[j]);

      add_field(index);
    }

    hour_labels = false;
  }
  // Groups can take an array of shapes and/or groups.
  //var schedule_group = two.makeGroup(circle, rect);

  // And have translation, rotation, scale like all shapes.
  //schedule_group.translation.set(two.width / 2, two.height / 2);
  //schedule_group.rotation = Math.PI;
  //schedule_group.scale = 0.75;

  // You can also set the same properties a shape have.
  //schedule_group.linewidth = 7;


  // DEBUG
  class_index = {
    day: 0,
    hour: 4
  }
  add_class(class_index, 3, 'SISTEMI ZA UPRAVLJANJE BAZOM PODATAKA');
  class_index.hour = 7;
  add_class(class_index, 3, 'KRIPTOGRAFIJA');
  class_index.day++;
  class_index.hour = 4;
  add_class(class_index, 3, 'SVEPRISUTNO RAČUNARSTVO');
  class_index.hour = 7;
  add_class(class_index, 3, 'TESTIRANJE I KVALITET SOFTVERA');
  class_index.day++;
  class_index.hour = 6;
  add_class(class_index, 3, 'SOFT KOMPJUTING');
  class_index.day++;
  class_index.hour = 5;
  add_class(class_index, 3, 'SISTEMI VIRTUELNE I PROŠIRENE REALNOSTI');


  // Don't forget to tell two to render everything
  // to the screen
  two.update();
  $('#user-schedule-modal').data('bs.modal').handleUpdate();

  //fill_schedule_query('localStorage.username'); // or something like this
}

add_field = function(field_index) {
  var field_offset = {
    x: step.x * (15 + field_index.day * 30) + corner_offset.x,
    y: step.y * (5 + field_index.hour * 5) + corner_offset.y
  }
  return two.makeRectangle(field_offset.x, field_offset.y, field_size.x, field_size.y);
}

add_day_label = function(day_index, label_string) {
  var label_offset = {
    x: step.x * (15 + day_index * 30) + corner_offset.x,
    y: corner_offset.y
  }

  var text_params = {
    size: field_size.y * 0.7
  }

  var label = new Two.Text(label_string, label_offset.x, label_offset.y, text_params);
  two.add(label);

  return label;
}

add_hour_label = function(hour_index, label_string) {
  var label_offset = {
    x: corner_offset.x / 2,
    y: step.y * (5 + hour_index * 5) + corner_offset.y
  }

  var text_params = {
    size: field_size.y * 0.7
  }

  var label = new Two.Text(label_string, label_offset.x, label_offset.y, text_params);
  two.add(label);

  return label;
}

// class_index needs to have 'day' and 'hour' properties
// TODO: check if indices and duration are in the schedule limits
add_class = function(class_index, duration, class_name) {
  var field_offset = {
    x: step.x * (15 + class_index.day * 30) + corner_offset.x,
    y: step.y * (5 + class_index.hour * 5) + corner_offset.y + (field_size.y/2) * (duration - 1)
  }

  var name_offset = {
    x: field_offset.x - field_size.x/2,
    y: field_offset.y - (field_size.y/2) * (duration - 1)
  }

  // DEBUG
  //console.log(field_offset.x + " " + field_offset.y);
  //console.log(name_offset.x + " " + name_offset.y);

  var renderer = $("canvas");

  var field = two.makeRectangle(field_offset.x, field_offset.y, field_size.x, field_size.y * duration);

  field.fill = 'rgb(200, 200, 200)';
  //field.noStroke();

  centered_word_wrap(renderer[0], field_offset.x, field_offset.y, field_size.x, field_size.y * duration, class_name, 12, 2);

  two.update(); // just in case
  $('#user-schedule-modal').data('bs.modal').handleUpdate(); // also just in case
}

// TODO: if we cannot wrap the text inside provided box
//       we need to set smaller font size and try to draw it again
/**
 * @param canvas : The canvas object where to draw .
 *                 This object is usually obtained by doing:
 *                 canvas = document.getElementById('canvasId');
 * @param x     :  The x position of the rectangle.
 * @param y     :  The y position of the rectangle.
 * @param w     :  The width of the rectangle.
 * @param h     :  The height of the rectangle.
 * @param text  :  The text we are going to centralize.
 * @param fh    :  The font height (in pixels).
 * @param spl   :  Vertical space between lines
 */
centered_word_wrap = function(canvas, x, y, w, h, text, fh, spl) {
    // The painting properties
    // Normally I would write this as an input parameter
    var font_params = {
      size: 15,
      family: 'Arial'
    };
    var label_font = font_params.size + 'px ' + font_params.family;

    /*
     * @param ctx   : The 2d context
     * @param mw    : The max width of the text accepted
     * @param font  : The font used to draw the text
     * @param text  : The text to be splitted   into
     */
    var split_lines = function(ctx, mw, font, text) {
        // We give a little "padding"
        // This should probably be an input param
        // but for the sake of simplicity we will keep it
        // this way
        mw = mw * 0.9;
        // We setup the text font to the context (if not already)
        ctx.font = font;
        // We split the text by words
        var words = text.split(' ');
        var new_line = words[0];
        var lines = [];
        for(var i = 1; i < words.length; ++i) {
           if (ctx.measureText(new_line + " " + words[i]).width < mw) {
               new_line += " " + words[i];
           } else {
               lines.push(new_line);
               new_line = words[i];
           }
        }
        lines.push(new_line);

        // DEBUG
        // for(var j = 0; j < lines.length; ++j) {
        //    console.log("line[" + j + "]=" + lines[j]);
        // }

        return lines;
    }
    // Obtains the context 2d of the canvas
    // It may return null
    var ctx2d = canvas.getContext('2d');
    if (ctx2d) {

      var lines, both;

      do {
        // Paint text
        lines = split_lines(ctx2d, w, label_font, text);

        // Block of text height
        both = lines.length * (fh + spl);

        // Setup for next phase, if this one does not pass
        font_params.size--;
        label_font = font_params.size + 'px ' + font_params.family;

        console.log(label_font);

      } while (both >= h);
          // THIS MIGHT BE RESOLVED
          // We won't be able to wrap the text inside the area
          // the area is too small. We should inform the user
          // about this in a meaningful way

      // We determine the y of the first line
      var ly = y + (spl - fh/2) * lines.length;
      var lx = x;

      var text_params = {
        size: font_params.size
      }

      for (var j = 0, ly; j < lines.length; ++j, ly+=fh+spl) {
          // DEBUG
          //console.log("new Two.Text('"+ lines[j] +"', "+ lx +", " + ly + ")");

          var text_part = new Two.Text(lines[j], lx, ly, text_params);
          two.add(text_part);
      }

    } else {
      // Do something meaningful, like some alert or something
    }
}

fill_schedule_query = function(username) {

  // DEBUG
  username = 'djolej@elfak.rs';

  fill_schedule = function(data) {
    //var courses = JSON.parse(data);
    for (var i = 0; i < data.length; i++) {

      // DEBUG
      class_index = {
        day: 3,
        hour: 4
      };
      class_duration = 2;

      add_class(class_index, class_duration, data[i].properties.name);
    }

    two.update(); // just in case
    $('#user-schedule-modal').data('bs.modal').handleUpdate(); // also just in case
  }

  $.ajax({
		type: 'GET',
		url: '/getAllFollowedCourses',
		dataType: 'json',
		data: { 'username': username },
		success: function(data){
				fill_schedule(data);
	  }
	});
}
