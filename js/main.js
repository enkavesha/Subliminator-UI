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
    $('#selling-price').on('input', function() { 
        var sellingPrice= $(this).val();
        sellingPrice=parseFloat(sellingPrice).toFixed(2); 
        var profitYoga= document.getElementById('product-profit-yoga');
        if (isNaN(sellingPrice)|sellingPrice<38) { 
            profitYoga.innerHTML = '0.00'; 
        } else { 
            profitYoga.innerHTML = sellingPrice-38; 
        }
    }); 
    
    let selectorChosen = $(".chosen-select");
    if (selectorChosen && selectorChosen.length > 0) {
        selectorChosen.chosen()
    }
    

    $('.chosen-results').click(function(){
        $('.chosen-container').removeClass('chosen-container-active');
    });
    let productDescription = $(document.getElementById('product-description'));
    if(productDescription && productDescription.length > 0){
        var editor = new Simditor({
          textarea: $('#product-description'),
            placeholder:'Hoodie All-Over',
            toolbar:[ 'bold','italic','underline','strikethrough','link','image','code','ul', 'ol','alignment'],
            upload: true
        });
    }

    //////////
    $(function() {
    var div = $('.upload-file');
    var width = div.width();
    if(width>104){
            div.css('height', width*1.25);
        }
    var svgWrapperHeight=document.getElementById('hoodie-svg-height').height;
        document.getElementById('hoodie-label-svg').css('height', svgWrapperHeight);
    });
    
    window.onresize = function(event) {
        var div = $('.upload-file');
        var width = div.width();
        if(width>104){
            div.css('height', width*1.25);
        }
        var svgWrapperHeight=document.getElementById('hoodie-svg-height').height;
        document.getElementById('hoodie-label-svg').css('height', svgWrapperHeight); 
    };

});