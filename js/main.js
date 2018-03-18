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
    let selectorChosenNoSearch = $(".chosen-select-no-search");
    if (selectorChosenNoSearch && selectorChosenNoSearch.length > 0) {
        selectorChosenNoSearch.chosen({disable_search_threshold: 5}); 
        selectorChosenNoSearch.chosen();
    }
    let selectorChosen = $(".chosen-select");
    if (selectorChosen && selectorChosen.length > 0) {
        selectorChosen.chosen();
    }
    $('.chosen-results').click(function(){
        $('.chosen-container').removeClass('chosen-container-active');
    });
    //////////////text editor
    ///////////take product name from header for text editor placeholder
    var productName=$('.product-name').text();
    //////////////hoodie
    let productDescription = $(document.getElementById('product-description'));
    if(productDescription && productDescription.length > 0){
        var editor = new Simditor({
          textarea: $('#product-description'),
            placeholder: productName,
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
   // modal for publishing
    let publishButton = $(document.getElementById('modalSubmit'));
    if(publishButton && publishButton.length > 0){
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
    }   
    // modal for file library
    let btnChooseFile = $('.btn-upload');
    if(btnChooseFile && btnChooseFile.length > 0){
        $('.btn-upload').onclick = function() {
         $('#modalFileLibrary').toggleClass('modal-body-visible');
        }
    }    
    //////////validate account
    function validateForm() {
      var isValid = true;
        if($('.payments-primary .account-active').is(":visible") |
           $('.payments-secondary .account-active').is(":visible")){
           isValid = true;
        }
        else{
            isValid = false;
        }
      $('.account-form').each(function() {
        if ( $(this).val() === '' )
            isValid = false;
      });
      return isValid;
    }
    let saveButton = $(document.getElementById('btnSave'));
    if(saveButton && saveButton.length > 0){
        document.getElementById('btnSave').onclick = function() {
            if(validateForm()){  
                 $('#accountInactive').hide();
                 $('#accountActive').show();
            }
            else{
                $('#accountInactive').show();
                $('#accountActive').hide();
            }
        }
    }
    ///////////choose payments
    let paymentPrimary = $(document.getElementById('paymentPrimary'));
    if(paymentPrimary && paymentPrimary.length > 0){
        document.getElementById('paymentPrimary').onchange = function() {
            if((this).value=="Paypal"){
                $('#paypalPaymentsPrimary').show();
                $('#creditPaymentsPrimary').hide();
            }
            else if((this).value=="Credit Card"){
                 $('#paypalPaymentsPrimary').hide();   
                 $('#creditPaymentsPrimary').show();   
            }
        };
    }
    let paymentSecondary = $(document.getElementById('paymentSecondary'));
    if(paymentSecondary && paymentSecondary.length > 0){
        document.getElementById('paymentSecondary').onchange = function() {
            if((this).value=="Paypal"){
                $('#paypalPaymentsSecondary').show();
                $('#creditPaymentsSecondary').hide();
            }
            else if((this).value=="Credit Card"){
                 $('#paypalPaymentsSecondary').hide();   
                 $('#creditPaymentsSecondary').show();   
            }
        };
    }

    ///////////connect primary payment
    let btnPaypalPrimary = $(document.getElementById('btnPaypalPrimary'));
    if(btnPaypalPrimary && btnPaypalPrimary.length > 0){
        document.getElementById('btnPaypalPrimary').onclick = function() {
            if($('#btnPaypalPrimary').text()==='Connect Paypal'){
                $('#paypalPaymentsPrimary .account-inactive').hide();
                $('#paypalPaymentsPrimary .account-active').show();
                $('#btnPaypalPrimary').html('Disconnect Paypal');
            }
            else{
                $('#paypalPaymentsPrimary .account-inactive').show();
                $('#paypalPaymentsPrimary .account-active').hide();
                $('#btnPaypalPrimary').html('Connect Paypal');
            }
        }
    }
    let btnCreditPrimary = $(document.getElementById('btnCreditPrimary'));
    if(btnCreditPrimary && btnCreditPrimary.length > 0){
        document.getElementById('btnCreditPrimary').onclick = function() {
            if($('#btnCreditPrimary').text()==='Connect Credit Card'){
                $('#creditPaymentsPrimary .account-inactive').hide();
                $('#creditPaymentsPrimary .account-active').show();
                $('#btnCreditPrimary').html('Disconnect Credit Card');
            }
            else{
                $('#creditPaymentsPrimary .account-inactive').show();
                $('#creditPaymentsPrimary .account-active').hide();
                $('#btnCreditPrimary').html('Connect Credit Card');
            }
        }
    }   
    ///////////connect secondary payment
    let btnPaypalSecondary = $(document.getElementById('btnPaypalSecondary'));
    if(btnPaypalSecondary && btnPaypalSecondary.length > 0){
        document.getElementById('btnPaypalSecondary').onclick = function() {
            if($('#btnPaypalSecondary').text()==='Connect Paypal'){
                $('#paypalPaymentsSecondary .account-inactive').hide();
                $('#paypalPaymentsSecondary .account-active').show();
                $('#btnPaypalSecondary').html('Disconnect Paypal');
            }
            else{
                $('#paypalPaymentsSecondary .account-inactive').show();
                $('#paypalPaymentsSecondary .account-active').hide();
                $('#btnPaypalSecondary').html('Connect Paypal');
            }
        }
    }
    let btnCreditSecondary = $(document.getElementById('btnCreditSecondary'));
    if(btnCreditSecondary && btnCreditSecondary.length > 0){
        document.getElementById('btnCreditSecondary').onclick = function() {
            if($('#btnCreditSecondary').text()==='Connect Credit Card'){
                $('#creditPaymentsSecondary .account-inactive').hide();
                $('#creditPaymentsSecondary .account-active').show();
                $('#btnCreditSecondary').html('Disconnect Credit Card');
            }
            else{
                $('#creditPaymentsSecondary .account-inactive').show();
                $('#creditPaymentsSecondary .account-active').hide();
                $('#btnCreditSecondary').html('Connect Credit Card');
            }
        }
    }
    /////////////search in file library
    $('#search-library').on('input', function() { 
        var search= $(this).value;
        $('.file-name:not(:contains('+ search +'))').each(function(el) {el.parent().parent().addClass('file-wrapper-hidden'); });                                                                                                         
    });
});