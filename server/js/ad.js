window.addEventListener(
  "load",
  function (event) {
    var campaign = "{{campaign}}";
    var postUrl = "//{{hostname}}/ad";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", postUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        alert(JSON.stringify(this.responseText));
      }
    };
    xhr.send(
      JSON.stringify({
        campaign: campaign,
      })
    );
  },
  false
);
