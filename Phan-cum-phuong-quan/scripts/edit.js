let report_node;

function get_report(feature) {
  if (report_node) {
    body.removeChild(report_node);
  }
  let report = `
    <section class="active popup" id="report-popup">
    <div id="report-section-form-container">
    <div id="inscreen-report-close" class="inscreen-report-close">
      <img
        id="inscreen-authen-close"
        src="../assets/images/close.png"
        alt="close button"
      />
    </div>
    <form
      id="inscreen-form-login"
      class="form-container active"
      method="post"
      action="/login"
    >
      <h2>Yêu cầu Chỉnh sửa</h2>
      <div class="form-section">
        <label for="street">Địa chỉ yêu cầu:</label>
        <p id="street" style="font-size:.825rem">${
          feature.properties.place
            ? feature.properties.place
            : feature.properties.address_line2
        }</p>
      </div>

      <div class="form-section">
        <label for="name">Thời điểm chỉnh sửa:</label>
        <input
          type="date"
          name="date"
          id="date"
          value=""
          placeholder="dd/mm/yyyy"
        />
      </div>
      <div class="form-section">
        <label for="tel">Thông tin chỉnh sửa:</label>
        <div id="editor"></div>
      </div>
      <div class="form-section">
        <button class="submit-button submit">Gửi</button>
      </div>
    </form>
  </div>
  </section> `;
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
}
