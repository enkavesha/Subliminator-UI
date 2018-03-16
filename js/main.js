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
    $('#selling-price').on('input', function() { 
        var sellingPrice= $(this).val().replace(',','.');
        sellingPrice=parseFloat(sellingPrice).toFixed(2); 
        var profitYoga= document.getElementById('product-profit-yoga');
        if (isNaN(sellingPrice)|sellingPrice<38) { 
            profitYoga.innerHTML = '0.00'; 
        } else { 
            profitYoga.innerHTML = (sellingPrice-38).toFixed(2); 
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
    let productDescription = $(document.getElementById('product-description'));
    if(productDescription && productDescription.length > 0){
        var editor = new Simditor({
          textarea: $('#product-description'),
            placeholder:'Hoodie All-Over',
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
        var svgWrapperHeight=document.getElementById('hoodie-svg-height').height;
            document.getElementById('hoodie-label-svg').height = svgWrapperHeight;
        });

        window.onresize = function(event) {
            var div = $('.upload-file');
            var width = div.width();
            if(width>104){
                div.css('height', width*1.25);
            }
            var svgWrapperHeight=document.getElementById('hoodie-svg-height').height;
            document.getElementById('hoodie-label-svg').height = svgWrapperHeight;
        };
    }
    /////////

});