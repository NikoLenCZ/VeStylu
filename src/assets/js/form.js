(function ()
{
  "use strict";
  /*
   * Form Validation
   */

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form)
  {
    form.addEventListener(
      "submit",
      function (event)
      {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          form.querySelectorAll(":invalid")[0].focus();
          form.querySelectorAll(".empty-feedback .invalid-feedback").innerHTML = "Toto pole je povinné";
        } else {
          /*
           * Form Submission using fetch()
           */

          const formData = new FormData(form);
          event.preventDefault();
          event.stopPropagation();
          const object = {};
          formData.forEach((value, key) =>
          {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          result.removeAttribute("hidden");
          result.classList.add("result--pending");
          result.innerHTML = "Prosím čekejte...";

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
          })
            .then(async (response) =>
            {
              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = "Email byl úspěšně odeslán";
                result.classList.remove("result--pending");
                result.classList.add("success");
              } else {
                console.log(response);
                result.innerHTML = "Email se nepovedlo odeslat.";
                result.classList.remove("result--pending");
                result.classList.add("error");
              }
            })
            .catch((error) =>
            {
              console.log(error);
              result.innerHTML = "Něco se pokazilo :-(";
            })
            .then(function ()
            {
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() =>
              {
                result.style.display = "none";
              }, 9000);
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
