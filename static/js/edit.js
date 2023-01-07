  
// function cropImg(){

//   var image = new Image();
//   image.src = "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=725&q=80"; 
  
//   const canvas = document.getElementById('canvas');
//   const ctx = canvas.getContext('2d');

//   image.onload = function(){
//     ctx.drawImage(image, 150, 200, 500, 300, 60,60, 500, 300);
//   }
  
// }

// cropImg();


  $(function () {
    var $container = $('#container');
    var $selection = $('<div>').addClass('selection-box');
    var coord = {}

    $container.on('mousedown', function (e) {
      var click_y = e.pageY,
        click_x = e.pageX;
      var offset = $("#myImg").offset();
      var xp = e.pageX - offset.left,
        yp = e.pageY - offset.top

      coord['click_x'] =click_x ,coord['click_y'] =click_y;
      coord['x1'] =xp ,coord['y1'] =yp;

      $selection.css({
        'top': click_y,
        'left': click_x,
        'width': 0,
        'height': 0
      });

      $selection.appendTo($container);

      $container.on('mousemove', function (e) {
        var move_x = e.pageX,
          move_y = e.pageY,
          width = Math.abs(move_x - click_x),
          height = Math.abs(move_y - click_y),
          new_x, new_y;

        new_x = (move_x < click_x) ? (click_x - width) : click_x;
        new_y = (move_y < click_y) ? (click_y - height) : click_y;
        
        coord['hight'] = height ,coord['width'] = width;
        coord['new_x'] = new_x ,coord['new_y'] = new_y;
        $selection.css({
          'width': width,
          'height': height,
          'top': new_y,
          'left': new_x
        });

      }).on('mouseup', function (e) {
        var offset = $("#myImg").offset();
        var xp = e.pageX - offset.left,
          yp = e.pageY - offset.top
        $container.off('mousemove');
        coord['x2'] =xp ,coord['y2'] =yp;
        console.log(coord, 'End')

        $('#show_model').modal('toggle');

      });
    });
  });


  $('#add_process').on('click', function () {


  });

  function imagesPreview(input, placeToInsertImagePreview) {
    if (input.files) {
      var filesAmount = input.files.length;

      for (i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var ids = Math.floor((Math.random() * 50));
          ids = ids.toString();
          $($.parseHTML(`<img class="mt-2" height="120" width="100%" id="in_img${ids}" onclick="showimage(${ids})" >`)).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
        }
        reader.readAsDataURL(input.files[i]);

      }
    }

  }

  function showimage(id) {
    var img = $('#in_img' + id).attr('src')
    console.log('in_img' + id)
    $('#myImg').attr('src', img)
  }

  function update_img() {
    var input_id = document.getElementById("get_data")
    imagesPreview(input_id, '#show_img');
  }




  // const $ = document.querySelector.bind(document);
  // const rectangles = [];

  // // DOM elements
  // const $screenshot = $('#screenshot');
  // const $draw = $('#draw');
  // const $marquee = $('#marquee');
  // const $boxes = $('#boxes');

  // // Temp variables
  // let startX = 0;
  // let startY = 0;
  // const marqueeRect = {
  //   x: 0,
  //   y: 0,
  //   width: 0,
  //   height: 0,
  // };

  // $marquee.classList.add('hide');
  // $screenshot.addEventListener('pointerdown', startDrag);

  // function startDrag(ev) {
  //   // middle button delete rect
  //   if (ev.button === 1) {
  //     const rect = hitTest(ev.layerX, ev.layerY);
  //     if (rect) {
  //       rectangles.splice(rectangles.indexOf(rect), 1);
  //       redraw();
  //     }
  //     return;
  //   }
  //   window.addEventListener('pointerup', stopDrag);
  //   $screenshot.addEventListener('pointermove', moveDrag);
  //   $marquee.classList.remove('hide');
  //   startX = ev.layerX;
  //   startY = ev.layerY;
  //   drawRect($marquee, startX, startY, 0, 0);
  // }

  // function stopDrag(ev) {
  //   $marquee.classList.add('hide');
  //   window.removeEventListener('pointerup', stopDrag);
  //   $screenshot.removeEventListener('pointermove', moveDrag);
  //   if (ev.target === $screenshot && marqueeRect.width && marqueeRect.height) {
  //     rectangles.push(Object.assign({}, marqueeRect));
  //     redraw();
  //   }
  // }

  // function moveDrag(ev) {
  //   let x = ev.layerX;
  //   let y = ev.layerY;
  //   let width = startX - x;
  //   let height = startY - y;
  //   if (width < 0) {
  //     width *= -1;
  //     x -= width;
  //   }
  //   if (height < 0) {
  //     height *= -1;
  //     y -= height;
  //   }
  //   Object.assign(marqueeRect, {
  //     x,
  //     y,
  //     width,
  //     height
  //   });
  //   drawRect($marquee, marqueeRect);
  // }

  // function hitTest(x, y) {
  //   return rectangles.find(rect => (
  //     x >= rect.x &&
  //     y >= rect.y &&
  //     x <= rect.x + rect.width &&
  //     y <= rect.y + rect.height
  //   ));
  // }

  // function redraw() {
  //   boxes.innerHTML = '';
  //   rectangles.forEach((data) => {
  //     boxes.appendChild(drawRect(
  //       document.createElementNS("http://www.w3.org/2000/svg", 'rect'), data
  //     ));
  //   });
  // }

  // function drawRect(rect, data) {
  //   const {
  //     x,
  //     y,
  //     width,
  //     height
  //   } = data;

  //   rect.setAttributeNS(null, 'width', width);
  //   rect.setAttributeNS(null, 'height', height);
  //   rect.setAttributeNS(null, 'x', x);
  //   rect.setAttributeNS(null, 'y', y);

  //   return rect;
  // }