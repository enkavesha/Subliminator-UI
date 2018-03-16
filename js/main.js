$(document).ready(function(){
	$('#template-view').click(function(){
        $('.view-controls').toggleClass('view-controls-visible');
        $('.mockup-view-wrapper').toggleClass('mockup-view-wrapper-visible');
        $(this).toggleClass('btn-grey-active');
        $('#mockup-view').toggleClass('btn-grey-active');
        $('.file-views').toggleClass('file-views-visible');
	});
	$('#mockup-view').click(function(){
        $('.view-controls').toggleClass('view-controls-visible');
        $('.mockup-view-wrapper').toggleClass('mockup-view-wrapper-visible');
        $(this).toggleClass('btn-grey-active');
        $('#template-view').toggleClass('btn-grey-active');
        $('.file-views').toggleClass('file-views-visible');
	});	
//    $('.file-view').click(function(){
//        $('.file-view').removeClass('file-view-active');
//        $(this).toggleClass('file-view-active');
//	});
    $(".file-views a").click(function() { 
        $(".file-views a").not($(this)).removeClass('file-view-active');
        $(this).toggleClass('file-view-active');
    });
    
    ///////////calculate profit from sale
    var cost=$(document.getElementById('shipping-cost')).text().replace(/[^0-9]/g, '');
    cost=parseFloat(cost);
    
    $('#selling-price').on('input', function() { 
        var sellingPrice= $(this).val().replace(',','.');
        sellingPrice=parseFloat(sellingPrice).toFixed(2); 
        var profit= document.getElementById('product-profit');
        if (isNaN(sellingPrice)|sellingPrice<cost) { 
            profit.innerHTML = '0.00'; 
        } else { 
            profit.innerHTML = (sellingPrice-cost).toFixed(2); 
        }
    }); 
    //////////////two decimal digits max
    $('#selling-price').on("keyup", function(){
        var val = this.value,
            valid = /^\d{0,3}([\,\.]\d{0,2})?$/.test(val);

        if(!valid){
            this.value = val.substring(0, val.length - 1);
        }
    });
    ///////////////chosen selector
    let selectorChosen = $(".chosen-select");
    if (selectorChosen && selectorChosen.length > 0) {
        selectorChosen.chosen()
    }
    $('.chosen-results').click(function(){
        $('.chosen-container').removeClass('chosen-container-active');
    });
    //////////////text editor
    //////////////hoodie
    let productDescriptionHoodie = $(document.getElementById('product-description-hoodie'));
    if(productDescriptionHoodie && productDescriptionHoodie.length > 0){
        var editor = new Simditor({
          textarea: $('#product-description-hoodie'),
            placeholder:'Hoodie All-Over',
            toolbar:[ 'bold','italic','underline','strikethrough','link','image','code','ul', 'ol','alignment'],
            upload: true
        });
    }    
    //////////////leggings
    let productDescriptionLeggings = $(document.getElementById('product-description-leggings'));
    if(productDescriptionLeggings && productDescriptionLeggings.length > 0){
        var editor = new Simditor({
          textarea: $('#product-description-leggings'),
            placeholder:'Leggings All-Over',
            toolbar:[ 'bold','italic','underline','strikethrough','link','image','code','ul', 'ol','alignment'],
            upload: true
        });
    }    
    //////////////sweatshirt
    let productDescriptionSweatshirt = $(document.getElementById('product-description-sweatshirt'));
    if(productDescriptionSweatshirt && productDescriptionSweatshirt.length > 0){
        var editor = new Simditor({
          textarea: $('#product-description-sweatshirt'),
            placeholder:'Sweatshirt All-Over',
            toolbar:[ 'bold','italic','underline','strikethrough','link','image','code','ul', 'ol','alignment'],
            upload: true
        });
    }    
    //////////////yoga
    let productDescriptionYoga = $(document.getElementById('product-description-yoga'));
    if(productDescriptionYoga && productDescriptionYoga.length > 0){
        var editor = new Simditor({
          textarea: $('#product-description-yoga'),
            placeholder:'Yoga Pants All-Over',
            toolbar:[ 'bold','italic','underline','strikethrough','link','image','code','ul', 'ol','alignment'],
            upload: true
        });
    }

    //////////upload file div resize
    if($('.upload-file')[0]){
        $(function() {
        var div = $('.upload-file');
        var width = div.width();
        if(width>104){
                div.css('height', width*1.25);
            }
        window.onresize = function(event) {
            var div = $('.upload-file');
            var width = div.width();
            if(width>104){
                div.css('height', width*1.25);
            }
        };
    });
    };    
    /////////modal
   // When the user clicks the button, open the modal 
    document.getElementById('modalSubmit').onclick = function() {
         $('#modalPublishLoading').toggleClass('modal-body-visible');
         $('#modalPublishRequest').toggleClass('modal-body-visible');
        setTimeout(
          function() 
          {
            $('#modalPublishLoading').toggleClass('modal-body-visible');
            $('#modalPublishConfirmation').toggleClass('modal-body-visible');
          }, 3000);
    }


});