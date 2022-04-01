window.addEventListener('load',
  function (event) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '//{{hostNameAndPort}}/ad', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var script = document.createElement("script");
        script.innerHTML = this.responseText;
        document.body.appendChild(script);
      }
    };
    xhr.send('{{adJsPayloadJSON}}');
  },
  false
);
