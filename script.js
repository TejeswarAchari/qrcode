//  let url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+user_text;

qr_codeEl = document.getElementById("qr-code");
qr_inputEl = document.getElementById("qr-input");
generate_qr_btn_El = document.getElementById("generate-qr");
get_loading_paraEL = document.getElementById("load");
infoEl = document.getElementById("info");

function getQr(event) {
    let input_value = qr_inputEl.value;
     qr_codeEl.innerHTML = "";
    infoEl.textContent = "";

    let url =
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
        input_value;
    let options = {
        method: "GET",
    };
    get_loading_paraEL.classList.remove("loading-para");

    fetch(url, options)
        .then(function (response) {
            return response;
        })
        .then(function (data) {
            get_loading_paraEL.classList.add("loading-para");
            let image = document.createElement("img");
            image.src = data.url;
            qr_codeEl.appendChild(image);
            console.log(data.url);
            infoEl.textContent = "Generated Qr for the ->" + encodeURI(input_value);
            let whatsappButton = document.createElement("button");
            whatsappButton.textContent = "Share on WhatsApp";
            whatsappButton.classList.add("download-btn");
            qr_codeEl.appendChild(whatsappButton);

            whatsappButton.addEventListener("click", function () {
                // let whatsappURL =
                //     "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                //     encodeURIComponent(qr_inputEl.value);
                let shareLink =
                    "https://wa.me/?text=" +
                    encodeURIComponent("Check out this QR code: " + url);
                window.open(shareLink, "_blank");
            });
            qr_inputEl.value="";
        });
}

generate_qr_btn_El.addEventListener("click", getQr);
