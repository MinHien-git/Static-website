let report = `
<section class="active" id="report-popup">
    <div id="authentication-section-form-container">
        <div id="authentication-close-button" class="authentication-close-button">
            <img id ="inscreen-authen-close" src = "../assets/images/close.png" alt = "close button"/>
        </div>
        <div id="authentication-form-button-container">
            <button id= "inscreen-switch-login" class="active">Login</button>
            <button id= "inscreen-switch-register">Register</button>
        </div>
        <form id="inscreen-form-login" class="form-container active" method="post" action="/login">
            <h2>Login</h2>
            <div class="form-section">
                <label for="Lemail">Email:</label>
                <input type="email" name="email" id="Lemail" value="" placeholder ="email">
            </div>
            <div class="form-section">
                <label for="Lpassword">Password:</label>
                <input type="password" name="password" id="Lpassword" value="" placeholder ="password">
            </div>
            <div class="form-section">
                <p><span class="under-line">Forgot password?</span></p>
            </div>
            <div class="form-section">
                <button class="submit-button submit">login</button>
            </div>
            <hr>
            <div class="form-section">
                <button class="submit-button facebook-submit">login with facebook</button>
            </div>
            <div class="form-section">
                <button class="submit-button google-submit">login with google</button>
            </div>
            <hr>
            <div class="form-section">
                <button class="submit-button second-choice">Register</button>
            </div>
        </form>
        <form id="inscreen-form-register" class="form-container"  method="post" action="/register">
            <h2>Register</h2>
            <div class="form-section">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value="" placeholder ="name">
            </div>
            <div class="form-section">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="" placeholder ="email">
            </div>
            <div class="form-section">
                <label for="number">Phone number:</label>
                <input type="tel" name="phone" id="phone" value="" placeholder ="Phone number">
            </div>
            <div class="form-section">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value="" placeholder ="password">
            </div>
            <div class="form-section">
                <button class="submit-button submit">Register</button>
            </div>
            <hr>
            <div class="form-section">
                <button class="submit-button facebook-submit">use facebook</button>
            </div>
            <div class="form-section">
                <button class="submit-button google-submit">use google</button>
            </div>
            <hr>
            <div class="form-section">
                <button class="submit-button second-choice">Login</button>
            </div>
        </form>
    </div>
</section>`;

function get_report(position) {
  console.log(position);
}
