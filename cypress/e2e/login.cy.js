describe("GUI Login Page Testing - Portal UTH", () => {

    const URL = "https://portal.ut.edu.vn/";

    const USERNAME_INPUT = 'input[name="username"]';
    const PASSWORD_INPUT = 'input[name="password"]';
    const LOGIN_BUTTON = 'button[type="submit"]';
    const LOGO = 'a[href="/dashboard"] img';
    const TOGGLE_PASSWORD = 'button[aria-label="toggle password visibility"]';

    const INVALID_USERNAME = "invalid_user";
    const INVALID_PASSWORD = "invalid_password";

    beforeEach(() => {
        cy.visit(URL);
    });

    // TC_LOGIN_01
    it("TC_LOGIN_01 - Verify UTH Portal Logo display", () => {
        cy.get(LOGO).should("be.visible");
    });

    // TC_LOGIN_02
    it("TC_LOGIN_02 - Verify Login Title display", () => {
        cy.contains("ĐĂNG NHẬP HỆ THỐNG").should("be.visible");
    });

    // TC_LOGIN_03
    it("TC_LOGIN_03 - Verify Username Label display", () => {
        cy.contains("Tài khoản đăng nhập").should("be.visible");
    });

    // TC_LOGIN_04
    it("TC_LOGIN_04 - Verify Username Input Box display", () => {
        cy.get(USERNAME_INPUT).should("be.visible");
    });

    // TC_LOGIN_05
    it("TC_LOGIN_05 - Verify Password Label display", () => {
        cy.contains("Mật khẩu").should("be.visible");
    });

    // TC_LOGIN_06
    it("TC_LOGIN_06 - Verify Password Input Box display", () => {
        cy.get(PASSWORD_INPUT).should("be.visible");
    });

    // TC_LOGIN_07
    it("TC_LOGIN_07 - Verify Password Visibility Toggle button", () => {
        cy.get(TOGGLE_PASSWORD).should("be.visible");
    });

    // TC_LOGIN_08
    it("TC_LOGIN_08 - Verify Login Button display", () => {
        cy.get(LOGIN_BUTTON).should("be.visible").contains(/đăng nhập/i);
    });

    // TC_LOGIN_09
    it("TC_LOGIN_09 - Verify Forgot Password Link display", () => {
        cy.contains(/quên mật khẩu/i).should("be.visible");
    });

    // TC_LOGIN_10
    it("TC_LOGIN_10 - Verify Error Alert layout and text display", () => {
        cy.get(USERNAME_INPUT).type(INVALID_USERNAME);
        cy.get(PASSWORD_INPUT).type(INVALID_PASSWORD);
        cy.get(LOGIN_BUTTON).click();
        
        // Xác nhận hiển thị thông báo lỗi chính xác
        cy.contains("Sai thông tin đăng nhập").should("be.visible");
    });

});
