function generateCodes() {
  var numberInput = document.getElementById("numberInput");
  var generateBtn = document.getElementById("generateBtn");
  var timer = document.getElementById("timer");
  var downloadLink = document.getElementById("downloadLink");

  var number = parseInt(numberInput.value);
  
  if (isNaN(number) || number <= 0 || number > 10000) {
    alert("الرجاء إدخال رقم صالح لا يعدي 10آلاف.");
    return;
  }

  generateBtn.disabled = true;
  timer.innerText = "...يتم توليد وفحص الروابط";

  var codes = [];
  var counter = 0;

  var interval = setInterval(function() {
    if (counter < number) {
      var code = generateCode();
      checkCode(code, function(statusCode) {
        if (statusCode === 200) {
          codes.push("discord.gift/" + code + " ✅!!!");
        } else {
          codes.push("discord.gift/" + code + " ❌");
        }
        counter++;
      });
    } else {
      clearInterval(interval);
      timer.innerText = "";
      downloadLink.style.display = "block";
      downloadLink.href = "data:text/plain;charset=utf-8," + encodeURIComponent(codes.join("\n"));
    }
  }, 100);
}

function generateCode() {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var code = "";
  for (var i = 0; i < 16; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

function checkCode(code, callback) {
  var url = "https://discordapp.com/api/v6/entitlements/gift-codes/" + code + "?with_application=false&with_subscription_plan=true";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.status);
    }
  };
  xhr.send();
    }