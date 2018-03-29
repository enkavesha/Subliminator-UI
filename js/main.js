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
    $('[data-toggle="popover"]').popover({ 
        trigger: "hover"
    });
    $('[data-toggle="popover"]').on('shown.bs.popover', function () {
      $('.popover').css('top','15px');
      $('.popover').css('left','2px');
      $('.popover .arrow').css('left','60%');
    })
    $('[data-toggle="popover-pending"]').popover({ 
        trigger: "hover",
        html: true,
        content: "<div class='popover-order'><p>The order is well received but has not been charged by us yet.</p><p>You will be charged in batches twice daily for seller payments of unpaid orders.</p></div>",
        placement: "top"
    });
    $('[data-toggle^="popover-"]').on('shown.bs.popover', function () {
      $('.popover').css('top','7px');
      $('.popover').css('left','8px');
      $('.popover .arrow').css('left','50%');
    })
    $('[data-toggle="popover-hold"]').popover({ 
        trigger: "hover",
        html: true,
        content: "<div class='popover-order'><p>OOPS! There’s an issue with this order.</p><p>Please contact us with the ORDER ID so we can update you on the status of your order.</p></div>",
        placement: "top"
    });
    $('[data-toggle="popover-production"]').popover({ 
        trigger: "hover",
        html: true,
        content: "<div class='popover-order'><p>Good news! Your customer’s order is currently in production.</p><p>What do you have to do next? Absolutely nothing! We’ll automatically notify your customer when the order is shipped.</p></div>",
        placement: "top"
    });
    $('[data-toggle="popover-shipped"]').popover({ 
        trigger: "hover",
        html: true,
        content: "<div class='popover-order'><p>The order has been shipped to your customer.</p><p>And your customer will automatically receive an email coming from your store with the tracking details.</p></div>",
        placement: "top"
    });
    $('[data-toggle="popover-error"]').popover({ 
        trigger: "hover",
        html: true,
        content: "<div class='popover-order'><p>OOPS! Looks like something went wrong authorizing your payment. This could be due to various reasons.</p><p>Please retry the payment, and if it still doesn’t come through please contact your bank. </p></div>",
        placement: "top"
    });
    $('[data-toggle="popover-pocket"]').popover({ 
        trigger: "hover",
        html: true,
        content: "<div class='popover-order popover-pocket'><p>When you check the box you will link the pocket with the frontside.</p><p>This way you only have to upload the frontside design to have it projected on both the frontside <i>and</i> the pocket.</p></div>",
        placement: "top"
    });
    
    $('#ckeckboxPocket').click(function() {
        if($('#btnPocket').hasClass('btn-disabled')){
            $('#btnPocket').removeClass('btn-disabled');
            $('#btnPocket').addClass('waves-effect');
            $('#btnPocket').css('cursor','pointer');
            $('#btnPocket').attr('data-toggle','modal');
            
        } else{
            $('#btnPocket').removeClass('waves-effect');
            $('#btnPocket').css('cursor','default');
            $('#btnPocket').addClass('btn-disabled');
            $('#btnPocket').attr('data-toggle', '');
        }
    });

    /////////show design preview modal
    var wrapper, newFileName;
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
     ///////faq show needed questions block
    $('.card-header').click(function(){
        var faqBlockLink = $(this).data('faq-block');
        $('.faq-block').each(function(){
            var faqBlock = $(this).data('faq-block');
            if(faqBlockLink==faqBlock){
                $(this).addClass('faq-block-show');
            } else{
                $(this).removeClass('faq-block-show');
            }
        });
    });
    ///////faq collapse questions all but one
    $('.faq-question-link').click(function(){
        var faqLink=$(this).data('faq-link');
        var clickedLink=$(this);
        
        function hideOtherQuestions(){
            $('.faq-block-show').find('.faq-question').each(function(){
                var faqQuestion=$(this).data('faq-question');
                if (faqLink==faqQuestion){
                    $(this).collapse('show');
                    clickedLink.addClass('question-link-active');
                } else{
                    $(this).collapse('hide');
                };
            });
        };
        
        if($('.faq-block-show').find('.show').length!=1){
            hideOtherQuestions();
        } else{
            if(clickedLink.hasClass('question-link-active')){
                $('.faq-block-show .faq-question').collapse('show');
                clickedLink.removeClass('question-link-active');
            } else{
                $('.faq-question-link').removeClass('question-link-active');
                clickedLink.addClass('question-link-active');
                hideOtherQuestions();
            }
        }
        
    });
    //////////stop playing video after closing faq modal
        var url1 = $('#faqVideoHowTo iframe').attr('src');
        var url2 = $('#faqVideoDelivery iframe').attr('src');
        $('.faq-video').on('hidden.bs.modal', function(){
            $(this).find('iframe').attr('src', '');
        });
        $('#faqVideoHowTo').on('show.bs.modal', function(){
            $(this).find('iframe').attr('src', url1+'?autoplay=1');
        });
        $('#faqVideoDelivery').on('show.bs.modal', function(){
            $(this).find('iframe').attr('src', url2+'?autoplay=1');
        });
    //////button animation
    let btnBlue = $(".waves-effect");
    if (btnBlue && btnBlue.length > 0) {
        Waves.init();
    };
    //////////TABLES/////////////////
    $.fn.dataTable.moment( 'M/D/YYYY' );
     $('#ordersTable').DataTable({
         sDom: 'fr<"fixed-table-height"t>p',
         "info": false,
         "lengthChange": false,
         "columnDefs": [
            { "orderable": false, "targets": 5 }
          ],
         "pageLength": 10,
         "language": {
         "zeroRecords":  '<i class="zmdi zmdi-search"></i><p>No orders found</p><p>You can find orders by changing your search or filtering options</p>'             
        }
     });
     var adminTable = $('#adminTable').DataTable({
         "ajax": "adminTable.txt",
         "sDom": 'fr<"fixed-table-height"t>p',
         "info": false,
         "lengthChange": false,
         "columnDefs": [
            { "orderable": false, "targets": 6 }
          ],
         "columns": [
                 { "data": "orderID" },
                 { "data": "orderNumber" },
                 { "data": "shop" },
                 { "data": "orderDate" },
                 { "data": "amount" },
                 { "data": "status"},
                {
                     "className": 'details-control',
                     "orderable": false,
                     "data": null,
                     "defaultContent": '',
                     "render": function () {
                         return '<button class="btn btn-order waves-effect waves-light btn-details">Order details</button>';
                     },
                     width:"15px"
                 },
                {"data":'statusFilter',
                "className": 'order-status-hidden'}
             ],
         "pageLength": 10,
         "language": {
         "zeroRecords":  '<i class="zmdi zmdi-search"></i><p>No orders found</p><p>You can find orders by changing your search or filtering options</p>'             
        }
     });

    // Add event listener for opening and closing details
         $('#adminTable tbody').on('click', 'td.details-control', function () {
             var tr = $(this).closest('tr');
             var tdButton = tr.find("button");
             var row = adminTable.row(tr);
             var status = $(this).parent().find('.order-status-hidden').text();
             
             if (row.child.isShown()) {
                 // This row is already open - close it
                 row.child.hide();
                 tr.removeClass('shown');
                 tr.find('td:first-child').removeClass('details-active-order');
                 tdButton.first().removeClass('btn-details-collapsed');
             }
             else {
                 // Open this row
                 row.child(format(row.data()),'details-wrapper').show();
                 tr.addClass('shown');
                 tr.find('td:first-child').addClass('details-active-order');
                 tdButton.first().addClass('btn-details-collapsed');
                ////////show fulfilled data
                if(status=='shipped'){
                    $(this).parent().parent().find('.usps-wrapper').removeClass('display-none');
                    $(this).parent().parent().find('.btn-details-wrapper').addClass('display-none');
                }
                 ///////disable hold button and show hold reason
                 if(status=='hold'){
                     var btnHold=$(this).parent().parent().find('.btn-details-wrapper button:first-child');
                     btnHold.addClass('btn-disabled');
                     btnHold.addClass('btn-disabled-yellow');
                     btnHold.removeClass('waves-effect');
                     btnHold.css('cursor','default');
                     btnHold.attr('data-toggle', '');
                     $(this).parent().parent().find('.hold-reason-wrapper').removeClass('display-none');
                 }

             }
         });

         adminTable.on("user-select", function (e, dt, type, cell, originalEvent) {
             if ($(cell.node()).hasClass('details-control')) {
                 e.preventDefault();
             }
         });
        ////////////////adding classes to table
        adminTable.on('draw', function () {
            $('.order-status-hidden').each(function () {
                var status = this.textContent;
                var row = this.closest('tr');
                if (status) {
                    $(row).find('button').addClass('btn-order-' + status);
                    $(row).find('td:nth-child(6)').addClass('order-color-' + status);
                };
                if(status=='error'){
                    $(row).find('.details-control').removeClass('details-control');
                    $(row).find('button').css('display','none');
                };
            });
        });
    function format(d){
        
         // `d` is the original data object for the row
         return '<table cellpadding="5" cellspacing="0" border="0" class="details-table" id="detailsTableTop">' +
             '<tr>' +
                 '<th>Shipping address</th>' +
                 '<th>Billing address</th>' +
                 '<th>Customer note</th>' +
             '</tr>' +
             '<tr>' +
                 '<td><p class="semibold">'+d.shippingName+'</p><p>'+d.shippingAddress+'</p></td>' +
                 '<td><p class="semibold">'+d.billingName+'</p><p>'+d.billingAddress+'</p></td>' +
                 '<td>'+d.customerNote+'</td>' +
             '</tr>' +
         '</table>'+
             
             
        '<table cellpadding="5" cellspacing="0" border="0" class="details-table" id="detailsTableBottom">' +
             '<tr>' +
                 '<th class="details-eye-icon"></th>' +
                 '<th>Product type</th>' +
                 '<th>SKU</th>' +
                 '<th class="details-stitching"></th>' +
                 '<th class="details-drawstring"></th>' +
                 '<th>Size</th>' +
                 '<th>QTY</th>' +
                 '<th>Design Files</th>' +
                 '<th class="order-status-hidden">Ready</th>' +
             '</tr>' +
             '<tr>' +
                 '<td class="details-eye-icon"><i class="zmdi zmdi-eye"></i></td>' +
                 '<td>Hoodie All-Over</td>' +
                 '<td>'+d.skuHoodie+'</td>' +
                 '<td>'+d.stitchingHoodie+'</td>' +
                 '<td>'+d.drawstringHoodie+'</td>' +
                 '<td>'+d.sizeHoodie+'</td>' +
                 '<td>'+d.qtyHoodie+'</td>' +
                 '<td><button class="btn btn-blue waves-effect waves-light btn-upload">Download<i class="zmdi zmdi-download"></i></button></td>' +
                 '<td class="order-status-hidden"><label class="checkbox-label">'+
                    '<input type="checkbox" class="checkbox-input">'+
                    '<span class="checkbox-checkmark"></span>'+
                    '</label></td>' +
             '</tr>' +
             '<tr>' +
                 '<td class="details-eye-icon"><i class="zmdi zmdi-eye"></i></td>' +
                 '<td>Sweatshirt All-Over</td>' +
                 '<td>'+d.skuSweatshirt+'</td>' +
                 '<td>'+d.stitchingSweatshirt+'</td>' +
                 '<td class="details-not-available">N/A</td>' +
                 '<td>'+d.sizeSweatshirt+'</td>' +
                 '<td>'+d.qtySweatshirt+'</td>' +
                 '<td><button class="btn btn-blue waves-effect waves-light btn-upload">Download<i class="zmdi zmdi-download"></i></button></td>' +
                 '<td class="order-status-hidden"><label class="checkbox-label">'+
                    '<input type="checkbox" class="checkbox-input">'+
                    '<span class="checkbox-checkmark"></span>'+
                    '</label></td>' +
             '</tr>' +
             '<tr>' +
                 '<td class="details-eye-icon"><i class="zmdi zmdi-eye"></i></td>' +
                 '<td>Leggings All-Over</td>' +
                 '<td>'+d.skuLeggings+'</td>' +
                 '<td>'+d.stitchingLeggings+'</td>' +
                 '<td class="details-not-available">N/A</td>' +
                 '<td>'+d.sizeLeggings+'</td>' +
                 '<td>'+d.qtyLeggings+'</td>' +
                 '<td><button class="btn btn-blue waves-effect waves-light btn-upload">Download<i class="zmdi zmdi-download"></i></button></td>' +
                 '<td class="order-status-hidden"><label class="checkbox-label">'+
                    '<input type="checkbox" class="checkbox-input">'+
                    '<span class="checkbox-checkmark"></span>'+
                    '</label></td>' +
             '</tr>' +
             '<tr>' +
                 '<td class="details-eye-icon"><i class="zmdi zmdi-eye"></i></td>' +
                 '<td>Yoga All-Over</td>' +
                 '<td>'+d.skuYoga+'</td>' +
                 '<td>'+d.stitchingYoga+'</td>' +
                 '<td class="details-not-available">N/A</td>' +
                 '<td>'+d.sizeYoga+'</td>' +
                 '<td>'+d.qtyYoga+'</td>' +
                 '<td><button class="btn btn-blue waves-effect waves-light btn-upload">Download<i class="zmdi zmdi-download"></i></button></td>' +
                 '<td class="order-status-hidden"><label class="checkbox-label">'+
                    '<input type="checkbox" class="checkbox-input">'+
                    '<span class="checkbox-checkmark"></span>'+
                    '</label></td>' +
             '</tr>' +
         '</table>'+
        '<div class="btn-details-wrapper">'+
             '<button class="btn waves-effect waves-light btn-order btn-order-hold" data-toggle="modal" data-target="#modalPutOnHold"><i class="zmdi zmdi-info"></i>Put on Hold</button>' +
            '<button class="btn btn-blue waves-effect waves-light" id="detailsMarkFulfilled">Mark as fulfilled<i class="zmdi zmdi-arrow-right"></i></button>'+
        '</div>'+
        '<div class="hold-reason-wrapper display-none">'+
            '<table cellpadding="5" cellspacing="0" border="0" class="details-table" id="detailsTableHold">' +
                 '<tr>' +
                     '<th>Reason for putting order on hold:</th>' +
                 '</tr>' +
                 '<tr>' +
                     '<td>'+d.holdReason+'</td>' +
                 '</tr>' +
            '</table>'+
        '</div>' +
        '<div class="usps-wrapper display-none">'+
             '<div>'+
                '<i class="zmdi zmdi-pin"></i>'+
                '<p>USPS Tracking Number: <span id="uspsNumber">'+d.uspsTrack+
                '</span></p>'+
             '</div>'+    
             '<div>'+    
                '<p>Order Fulfilled On: <span id="fulfillDate">'+d.fulfillDate+'</span><i class="zmdi zmdi-check"></i></p>'
             '</div>'+    
        '</div>';  
    };
    
    //////////cloning details table to fulfill modal
            var showTableOrigin; 
            var showTable; 

            $(document).on('click', '#detailsMarkFulfilled', function(){
                showTableOrigin=$(this).parent().parent().find('#detailsTableBottom');
                showTable=showTableOrigin.clone();
                $('#modalFulfillOrder').modal('show');
            });

            $('#modalFulfillOrder').on('show.bs.modal', function() {
                if (showTable) {
                    showTable.attr('id','modalTable');
                    ////////clearing modal
                    $('#modalFulfillTable').find('#modalTable').remove();
                    $('#modalFulfillOrder').find('.usps-modal-wrapper input').val("");
                    //////hiding download buttons
                    showTable.find('th:nth-child(8)').addClass('order-status-hidden');
                    showTable.find('td:nth-child(8)').addClass('order-status-hidden');
                    ////////showing checkbox column
                    showTable.find('th:nth-child(9)').removeClass('order-status-hidden');
                    showTable.find('td:nth-child(9)').removeClass('order-status-hidden');
                    showTable.appendTo('#modalFulfillTable');
                }
            });
    ///////////adding usps track number and fulfill date
    $('#btnFulfillOrder').click(function(){
        var uspsTrack = $('#modalFulfillOrder').find('.usps-modal-wrapper input').val();
        var chkReady = $('#modalTable').find('input:checked').length;
        //////fulfill validate
        if(uspsTrack.length>0 && chkReady==4){
            var parentRow = showTableOrigin.parent().parent().parent().find('.shown');
            var d = new Date();
            var month = d.getMonth()+1;
            var day = d.getDate();
            var fulfillDate =  
                ((''+month).length<2 ? '0' : '') + month + '/' +
                ((''+day).length<2 ? '0' : '') + day + '/' +
                d.getFullYear();
            //////adding data
            showTableOrigin.parent().find('#uspsNumber').text(uspsTrack);            
            showTableOrigin.parent().find('#fulfillDate').text(fulfillDate);
            showTableOrigin.parent().find('.usps-wrapper').removeClass('display-none');
            showTableOrigin.parent().find('.btn-details-wrapper').addClass('display-none');
            /////changing status
            parentRow.find(':nth-child(8)').text('shipped');
            parentRow.find(':nth-child(6)').text('Fulfilled');
            parentRow.find(':nth-child(6)').addClass('order-color-shipped');
            parentRow.find('button').removeClass('btn-order-production');
            parentRow.find('button').removeClass('btn-order-hold');
            parentRow.find('button').addClass('btn-order-shipped');
            ////////removing hold message & enabling button
            var btnHold = showTableOrigin.parent().find('.btn-details-wrapper button:first-child');
            btnHold.removeClass('btn-disabled');
            btnHold.removeClass('btn-disabled-yellow');
            btnHold.addClass('waves-effect');
            btnHold.css('cursor','pointer');
            btnHold.attr('data-toggle', 'modal');
            showTableOrigin.parent().find('.hold-reason-wrapper').addClass('display-none');
            
            $('#modalFulfillOrder').modal('hide');
        }
    });
    ///////////putting order on hold
     $('#btnPutOnHold').click(function(){
        var holdReason = $('#modalPutOnHold').find('textarea').val();
        //////fulfill validate
        if(holdReason.length>0){
            var parentRow = $('#adminTable').find('tbody .shown');
            //////adding data
            parentRow.parent().find('#detailsTableHold td').text(holdReason);
            /////changing status
            parentRow.find(':nth-child(8)').text('hold');
            parentRow.find(':nth-child(6)').text('Order On Hold');
            parentRow.find(':nth-child(6)').removeClass('order-color-production');
            parentRow.find(':nth-child(6)').addClass('order-color-hold');
            parentRow.find('button').removeClass('btn-order-production');
            parentRow.find('button').addClass('btn-order-hold');
            ////////adding hold message & disabling button
            var btnHold = parentRow.parent().find('.btn-details-wrapper button:first-child');
            btnHold.addClass('btn-disabled');
            btnHold.addClass('btn-disabled-yellow');
            btnHold.removeClass('waves-effect');
            btnHold.css('cursor','default');
            btnHold.attr('data-toggle', '');
            parentRow.parent().find('.hold-reason-wrapper').removeClass('display-none');
            
            $('#modalFulfillOrder').modal('hide');
        }
     });
    ///////////////////
     //////////filtering
        var filterString = '';
        function filterClick(status, tableID, lastColumn, tableAPI){
            $('#filterTotal').removeClass('filter-active');
            var filters = [];
            tableAPI = tableAPI ? tableAPI : $(tableID).dataTable().api();
            if (filterString.length) {
                filters = filterString.slice(1, -1).split('|');
            }
            var index = filters.indexOf(status);
            if (index >= 0) {
                filters.splice(index, 1);
            } else {
                filters.push(status);
            }
            if (filters.length > 0) {
                filterString = '(' + filters.join('|') + ')';
            } else {
                filterString = '';
            }
            tableAPI.column(lastColumn).search(filterString, true).draw();
        }
    /////////////// Read a page's GET URL variables and return them as an associative array.
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    var filter = getUrlVars()["filter"];
    
    /////////filtering orders
    let orderFilter = $("#ordersTable");
    if (orderFilter && orderFilter.length > 0) {
        var tableID="#ordersTable";
        var lastColumn=6;
        var tableAPI = $('#ordersTable').dataTable().api();
        tableView('#ordersTable_filter');
        /////////getting active filter after page loading
        if(filter=='total'){
            $('.orders-table-row').addClass('orders-unfiltered');
        };
        if(filter=='pending'){
            $('.orders-table-row:not(".order-pending")').toggleClass('orders-table-row-hidden');
            $('.order-pending').addClass('orders-filtered');
            $('#filterTotal').removeClass('filter-active'); 
        };
        if(filter=='hold'){
            $('.orders-table-row:not(".order-hold")').toggleClass('orders-table-row-hidden');
            $('.order-hold').addClass('orders-filtered');
            $('#filterTotal').removeClass('filter-active'); 
        };
        if(filter=='production'){
            $('.orders-table-row:not(".order-production")').toggleClass('orders-table-row-hidden');
            $('.order-production').addClass('orders-filtered');
            $('#filterTotal').removeClass('filter-active'); 
        };
        if(filter=='shipped'){
            $('.orders-table-row:not(".order-shipped")').toggleClass('orders-table-row-hidden');
            $('.order-shipped').addClass('orders-filtered');
            $('#filterTotal').removeClass('filter-active'); 
        };
        if(filter=='error'){
            $('.orders-table-row:not(".order-error")').toggleClass('orders-table-row-hidden');
            $('.order-error').addClass('orders-filtered');
            $('#filterTotal').removeClass('filter-active'); 
        };
        $("[class*='" + filter + "']").addClass('filter-active');
        /////resetting filter after last filter unchecked
        function checkFilter(){
            if($('.orders-wrapper').find('.filter-active').length === 0){
                $('#filterTotal').addClass('filter-active');
                $('.orders-table-row').removeClass('orders-table-row-hidden');
                $('.orders-table-row').removeClass('orders-filtered');
                $('.orders-table-row').addClass('orders-unfiltered');
            }
        };
        $('.orders-wrapper .orders').click(function(){
            $(this).toggleClass('filter-active');
        });
        $('#filterTotal').click(function () {
            $('.orders').removeClass('filter-active');
            $('#filterTotal').addClass('filter-active');
            tableAPI = tableAPI ? tableAPI : $('#ordersTable').dataTable().api();
            filterString = '';
            tableAPI.column(6).search(filterString, true).draw();
        });
        $('#filterPending').click(function () {
            var status='pending';
            filterClick(status, tableID, lastColumn, tableAPI);
        });

        $('#filterHold').click(function () {
            var status='hold';
            filterClick(status, tableID, lastColumn, tableAPI);
        });

        $('#filterProduction').click(function () {
            var status='production';
            filterClick(status, tableID, lastColumn, tableAPI);
        });

        $('#filterShipped').click(function () {
            var status='shipped';
            filterClick(status, tableID, lastColumn, tableAPI);
        });

        $('#filterError').click(function () {
            var status='error';
            filterClick(status, tableID, lastColumn, tableAPI);
        });
        
    }
    let adminFilter = $("#adminTable");
    if (adminFilter && adminFilter.length > 0) {
        var tableID="#adminTable";
        var lastColumn=7;
        var tableAPI = $('#adminTable').dataTable().api();
        tableView('#adminTable_filter');
        $("[class*='" + filter + "']").addClass('filter-active');
        /////resetting filter after last filter unchecked
        function checkFilter(){
            if($('.orders-wrapper').find('.filter-active').length === 0){
                $('#filterTotal').addClass('filter-active');
                $('.orders-table-row').removeClass('orders-table-row-hidden');
                $('.orders-table-row').removeClass('orders-filtered');
                $('.orders-table-row').addClass('orders-unfiltered');
            }
        };
        $('.orders-wrapper .orders').click(function(){
            $(this).toggleClass('filter-active');
        });
        $('#filterTotal').click(function () {
            $('.orders').removeClass('filter-active');
            $('#filterTotal').addClass('filter-active');
            tableAPI = tableAPI ? tableAPI : $('#adminTable').dataTable().api();
            filterString = '';
            tableAPI.column(7).search(filterString, true).draw();
        });
        $('#filterPending').click(function () {
            var status='pending';
            filterClick(status, tableID, lastColumn, tableAPI);
        });

        $('#filterHold').click(function () {
            var status='hold';
            filterClick(status, tableID, lastColumn, tableAPI);
        });

        $('#filterProduction').click(function () {
            var status='production';
            filterClick(status, tableID, lastColumn, tableAPI);
        });

        $('#filterShipped').click(function () {
            var status='shipped';
            filterClick(status, tableID, lastColumn, tableAPI);
        });

        $('#filterError').click(function () {
            var status='error';
            filterClick(status, tableID, lastColumn, tableAPI);
        });
        
    }
    /////////////search function
    var searchInput = $('#ordersTable_filter input','#adminTable_filter input');
    function searchCheck() { 
        var search = searchInput.val() ? searchInput.val().toUpperCase() : "";
        function searchValidate(){
            var tableRow = $(this).find('td:not([class^="order-color-"],.orders-row-button)');
            var tableRowText;
            ///////adding delimiter between cols
            tableRow.text(function(i, t){
                tableRowText += i == 0 ? t : '&&' + t;
            });
            tableRowText.toUpperCase();
            if(tableRowText.includes(search)==false){
                $(tableRow).closest('.orders-table-row').addClass('orders-table-row-hidden');
                $(tableRow).closest('.orders-table-row').addClass('search-hidden');
            }        
        };
        if($('#filterTotal').hasClass('filter-active')){
            $('.orders-unfiltered').removeClass('orders-table-row-hidden'); 
            $('.orders-unfiltered').each(searchValidate);
        } else{
            $('.orders-filtered').removeClass('orders-table-row-hidden'); 
            $('.orders-filtered').each(searchValidate);
        }
    }
    /////////////searching orders on input
    $('#searchOrders').on('input', searchCheck);
    ///////changing tables search bar
    function tableView(tableID){
        $(tableID).parent().removeClass('col-md-6');
        $(tableID).parent().addClass('col-md-12');
        $(tableID).parent().parent().find('.col-md-6').remove();
        $(tableID + ' label').addClass('input-search-library');
        $(tableID + ' label input').addClass('input-style');
        $(tableID + ' label input').attr('placeholder','Search Orders');
    };
    ////resetting focus on search orders input at enter press
     $('div.dataTables_filter input').keypress(function(e){
        if (e.keyCode == 13) {
            $(this).blur(); 
        }
    });
});