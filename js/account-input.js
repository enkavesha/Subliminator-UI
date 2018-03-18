$(document).ready(function(){    
///////////inputmask
    $(":input").inputmask();
    //email mask
      $('#accountEmail').inputmask({
        mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}.*{1,6}[.*{1,3}]",
        greedy: false,
        onBeforePaste: function (pastedValue, opts) {
          pastedValue = pastedValue.toLowerCase();
          return pastedValue.replace("mailto:", "");
        },
        definitions: {
          '*': {
            validator: "[0-9A-Za-z-]",
            casing: "lower"
          }
        }
      });
});