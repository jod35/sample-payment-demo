
const form = document.querySelector('form');
const amountfield = document.getElementById('amount')
const emailfield = document.getElementById('email')
const phoneNumberfield = document.getElementById('phone_number')



const formData = new FormData(form);

form.addEventListener('submit',function(e){

    e.preventDefault();

    
    let phone_number= phoneNumberfield.value;
    let amount= amountfield.value;
    let email= emailfield.value;

    makePayment(amount,phone_number,email)

    form.reset()
    
})

function makePayment(amount,phone_number,email) {
    FlutterwaveCheckout({
      public_key: "FLWPUBK-692f1f62e20941cea3dd22aaf2dec9aa-X",
      tx_ref: "titanic-48981487343MDI0NzMx",
      amount: amount,
      currency: "UGX",
      payment_options: "card, mobilemoneyuganda",
      callback: function(payment) {
        // Send AJAX verification request to backend
        verifyTransactionOnBackend(payment.id);
      },
      onclose: function(incomplete) {
        if (incomplete || window.verified === false) {
          document.querySelector("#payment-failed").style.display = 'block';
        } else {
          document.querySelector("form").style.display = 'none';
          if (window.verified == true) {
            document.querySelector("#payment-success").style.display = 'block';
          } else {
            document.querySelector("#payment-pending").style.display = 'block';
          }
        }
      },
      meta: {
        consumer_id: 23,
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: email,
        phone_number: phone_number,
        name: "Rose DeWitt Bukater",
      },
      customizations: {
        title: "Heaven Harvesters Ministry",
        description: "Donate",
        logo: "https://heavenharvesters.org/static/assets/img/logo.png",
      },
    });
  }

  function verifyTransactionOnBackend(transactionId) {
    // Let's just pretend the request was successful
    setTimeout(function() {
      window.verified = true;
    }, 200);
  }