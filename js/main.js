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
    
    $('#selling-price').not('.account-form').on('input', function() { 
        var sellingPrice= $(this).val().replace(',','.');
        sellingPrice=parseFloat(sellingPrice).toFixed(2); 
        var profit= document.getElementById('product-profit');
        if (isNaN(sellingPrice)| sellingPrice<cost) { 
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
            $('#changesSaved').css('opacity',1);
            if(validateForm()){  
                 $('#accountInactive').hide();
                 $('#accountActive').show();
            }
            else{
                $('#accountInactive').show();
                $('#accountActive').hide();
            }
            setTimeout(
              function() 
              {
                $('#changesSaved').css('opacity',0);
              }, 3000);
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
                setTimeout(function() {
                    $('#paypalPaymentsPrimary .account-inactive').hide();
                    $('#paypalPaymentsPrimary .account-active').show();
                    $('#btnPaypalPrimary').html('Disconnect Paypal');
                }, 500);
            }
            else{
                setTimeout(function() {
                    $('#paypalPaymentsPrimary .account-inactive').show();
                    $('#paypalPaymentsPrimary .account-active').hide();
                    $('#btnPaypalPrimary').html('Connect Paypal');
                }, 500);
            }
        }
    }
    let btnCreditPrimary = $(document.getElementById('btnCreditPrimary'));
    if(btnCreditPrimary && btnCreditPrimary.length > 0){
        document.getElementById('btnCreditPrimary').onclick = function() {
            if($('#btnCreditPrimary').text()==='Connect Credit Card'){
                setTimeout(function() {
                    $('#creditPaymentsPrimary .account-inactive').hide();
                    $('#creditPaymentsPrimary .account-active').show();
                    $('#btnCreditPrimary').html('Disconnect Credit Card');
                }, 500);
            }
            else{
                setTimeout(function() {
                    $('#creditPaymentsPrimary .account-inactive').show();
                    $('#creditPaymentsPrimary .account-active').hide();
                    $('#btnCreditPrimary').html('Connect Credit Card');
                }, 500);
            }
        }
    }   
    ///////////connect secondary payment
    let btnPaypalSecondary = $(document.getElementById('btnPaypalSecondary'));
    if(btnPaypalSecondary && btnPaypalSecondary.length > 0){
        document.getElementById('btnPaypalSecondary').onclick = function() {
            if($('#btnPaypalSecondary').text()==='Connect Paypal'){
                setTimeout(function() {
                    $('#paypalPaymentsSecondary .account-inactive').hide();
                    $('#paypalPaymentsSecondary .account-active').show();
                    $('#btnPaypalSecondary').html('Disconnect Paypal');
                }, 500);
            }
            else{
                setTimeout(function() {
                    $('#paypalPaymentsSecondary .account-inactive').show();
                    $('#paypalPaymentsSecondary .account-active').hide();
                    $('#btnPaypalSecondary').html('Connect Paypal');
                }, 500);
            }
        }
    }
    let btnCreditSecondary = $(document.getElementById('btnCreditSecondary'));
    if(btnCreditSecondary && btnCreditSecondary.length > 0){
        document.getElementById('btnCreditSecondary').onclick = function() {
            if($('#btnCreditSecondary').text()==='Connect Credit Card'){
                setTimeout(function() {
                    $('#creditPaymentsSecondary .account-inactive').hide();
                    $('#creditPaymentsSecondary .account-active').show();
                    $('#btnCreditSecondary').html('Disconnect Credit Card');
                }, 500);
            }
            else{
                setTimeout(function() {
                    $('#creditPaymentsSecondary .account-inactive').show();
                    $('#creditPaymentsSecondary .account-active').hide();
                    $('#btnCreditSecondary').html('Connect Credit Card');
                }, 500);
            }
        }
    }
    /////////////search in file library
    jQuery.expr[':'].icontains = function(a, i, m) {
      return jQuery(a).text().toUpperCase()
              .indexOf(m[3].toUpperCase()) >= 0;
        };
    
    $('#search-library').on('input', function() { 
       var search = $(this).val(); 
        $('.file-wrapper').removeClass('file-wrapper-hidden'); 
        $('.file-name:not(:icontains('+ search +'))').each(function(){
            $(this).closest('.file-wrapper').addClass('file-wrapper-hidden');
        })
    });
    //////////pop overs
    $('[data-toggle="popover"]').popover({ trigger: "hover" });
    var wrapper, newFileName;
    /////////show design preview modal
    $('[data-content="Preview"]').click(function(){
        $('#modalDesignPreview').modal('show');
        wrapper=$(this).closest('.file-wrapper');
        //////grab file name
        newFileName = $('#fileNameEdit').val($(this).closest(wrapper).find('.file-name').text());
        $('#fileNameEdit').attr('size', $('#fileNameEdit').val().length);
    });
    ////////choose file at design preview modal
    $('[data-content="ChooseFile"]').click(function (){
        $('#modalDesignPreview').modal('hide');
        $(wrapper).find('.file-name').text(newFileName.val()); 
    });
    ///////////close design preview modal without saving
    $('[data-content="closeDesignPreview"]').click(function (){
        $('#modalDesignPreview').modal('hide');
    });
    ////////// stack modals
    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
    /////////fix scrollbar for modal
    $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
    });
    //////reset inout focus on enter
    $('#fileNameEdit, #selling-price, input[type=text]').not('.bootstrap-tagsinput input').keypress(function(e){
        if (e.keyCode == 13) {
            $(this).blur(); 
        }
    });
    //////////////add&remove focus to input
       $('input').blur(function() {
        $('input').removeClass("focus");
      })
      .focus(function() {
        $(this).addClass("focus")
      });
    /////////add&remove focus to tagsinput
       $('.bootstrap-tagsinput input').blur(function() {
        $('.bootstrap-tagsinput').removeClass("focus");
      })
      .focus(function() {
        $('.bootstrap-tagsinput').addClass("focus")
      });
    /////////////payment warning close  
    $('#warningClose').click(function (){
        $('#paymentWarning').removeClass('payment-warning-show');
        $('.whatever').slideUp()
    });
    /////////fixed menu
    var lastScrollTop = 0,
        offsetBreakpoint = parseInt(window.getComputedStyle(document.querySelector('body'), ':before').height),
        mainContentWrapper = $('.main-content-wrapper'),
        header = $('header'),
        headerHeight = header.outerHeight() - 15;

    $(document).scroll(function () {
        var st = window.pageYOffset || document.documentElement.scrollTop,
            isCollapsing = false;

        if (st > lastScrollTop) {
            // scrolling down
            if (st > offsetBreakpoint) {
                header.addClass('header-fixed');
                mainContentWrapper.css("margin-top", headerHeight);
            }
        } else {
            // scrolling up
            if (!isCollapsing && header.hasClass('header-fixed') && st < offsetBreakpoint) {
                isCollapsing = true;
                header.addClass('header-collapsing').removeClass('header-fixed');
                setTimeout(function () {
                    header.removeClass('header-collapsing');
                    mainContentWrapper.css("margin-top", "0px");
                    isCollapsing = false;
                }, 100);
            }
        }
        lastScrollTop = st;
    });
    //////button animation
    let btnBlue = $(".waves-effect");
    if (btnBlue && btnBlue.length > 0) {
        Waves.init();
    }
});