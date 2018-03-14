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
        sellingPrice=parseFloat(sellingPrice); 
        var profitYoga= document.getElementById('product-profit-yoga');
        if (isNaN(sellingPrice)) { 
            profitYoga.innerHTML = '...'; 
        } else { 
            profitYoga.innerHTML = sellingPrice-38; 
        }
    });

});