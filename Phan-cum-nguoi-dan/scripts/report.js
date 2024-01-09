let report_node;

function get_report(feature) {
  if (report_node) {
    body.removeChild(report_node);
  }
  let report = `
          <div id="report-section-form-container" class ="popup">
          <div id="authentication-close-button" class="authentication-close-button">
            <img
              id="inscreen-report-close"
              src="../assets/images/close.png"
              alt="close button"
            />
          </div>
          <form
            id="inscreen-form-report"
            class="form-container active"
            method="post"
            action="https://static-website-server.vercel.app/report"
          >
            <h2>Báo Cáo</h2>
            <div class="form-section">
              <label for="street">Địa chỉ báo cáo:</label>
              <input id="geometry" name="geometry" type = "hidden" value=${JSON.stringify(
                feature.geometry
              )}>
              <input id="street" name="street" value="${
                feature.properties.place
                  ? feature.properties.place
                  : feature.properties.address_line2
              }" type = "hidden">
              <p style="font-size:.825rem">${
                feature.properties.place
                  ? feature.properties.place
                  : feature.properties.address_line2
              }"</p>
            </div>
            <div class="form-section">
              <label for="name">Họ Tên:</label>
              <input
                type="text"
                name="name"
                id="name"
                value=""
                placeholder="Họ và tên người báo cáo"
              />
            </div>
            <div class="form-section">
              <label for="Lemail">Email:</label>
              <input
                type="email"
                name="email"
                id="Lemail"
                value=""
                placeholder="Email"
              />
            </div>
            <div class="form-section">
              <label for="tel">Điện thoại:</label>
              <input
                type="tel"
                name="tel"
                id="tel"
                value=""
                placeholder="Điện thoại liên lạc"
              />
            </div>
            <div class="form-section file-section">
              <p>Thông tin đính kèm:</p>
              <div class="file-button">
                <label for="attached_files">Chọn</label>
                <input
                  type="file"
                  name="attached_files"
                  id="attached_files"
                />
              </div>
            </div>
            
            <div class="form-section">
              <label for="tel">Thông tin báo cáo:</label>
              <div id="editor"></div>
            </div>
            <div class="form-section">
              <button class="submit-button submit">Gửi</button>
            </div>
          </form>
        </div>`;
  report_node = document.createElement("section");
  report_node.setAttribute("id", "report-popup");
  report_node.classList.add("active");

  report_node.innerHTML += report;
  body.append(report_node);

  var close = $("#inscreen-report-close");
  close.on("click", () => {
    body.removeChild(report_node);
    report_node = null;
  });

  var quill = new Quill("#editor", {
    theme: "snow",
  });

  $("#inscreen-form-report").on("submit", function (e) {
    e.preventDefault();
    hvalue = $(".ql-editor").html();
    $(this).append(
      "<textarea name='details' style='display:none'>" + hvalue + "</textarea>"
    );
    let geometry = $("#geometry").val();
    let street = $("#street").val();
    let name = $("#name").val();
    let email = $("#Lemail").val();
    let tel = $("#tel").val();
    let data = {
      geometry: geometry,
      type: "Feature",
      properties: {
        street: street,
        sender_name: name,
        sender_email: email,
        sender_number: tel,
        detail: hvalue,
      },
      id: Math.floor(Math.random() * 1000),
    };
    console.log(data);
    fetch("https://static-website-server.vercel.app/report", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
        }
      });
  });
}
