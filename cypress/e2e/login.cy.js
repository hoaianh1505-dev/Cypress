
describe("Form Login Testing - Portal UTH", () => {

    const URL = "https://portal.ut.edu.vn/";

    const USERNAME_INPUT = 'input[name="username"]';
    const PASSWORD_INPUT = 'input[name="password"]';
    const LOGIN_BUTTON = 'button[type="submit"]';

    const VALID_USERNAME = "087205006588";
    const VALID_PASSWORD = "anh123456";

    const INVALID_USERNAME = "invalid_user";
    const INVALID_PASSWORD = "invalid_password";

    beforeEach(() => {
        cy.visit(URL);
    });

    // TC_LOGIN_01
    it("TC_LOGIN_01 - Kiểm tra trang Login hiển thị", () => {
        cy.url().should("include", "portal.ut.edu.vn");
        cy.contains("ĐĂNG NHẬP HỆ THỐNG").should("be.visible");

    });

    // TC_LOGIN_02
    it("TC_LOGIN_02 - Kiểm tra ô Username hiển thị", () => {
        cy.get(USERNAME_INPUT).should("be.visible");
    });

    // TC_LOGIN_03
    it("TC_LOGIN_03 - Kiểm tra ô Password hiển thị", () => {
        cy.get(PASSWORD_INPUT).should("be.visible");
    });

    // TC_LOGIN_04
    it("TC_LOGIN_04 - Kiểm tra nút Login hiển thị", () => {
        cy.get(LOGIN_BUTTON).should("be.visible");
    });

    // TC_LOGIN_05
    it("TC_LOGIN_05 - Username để trống", () => {

        cy.get(PASSWORD_INPUT).type(VALID_PASSWORD);

        cy.get(LOGIN_BUTTON).click();

        cy.url().should("include", "portal.ut.edu.vn");
    });

    // TC_LOGIN_06
    it("TC_LOGIN_06 - Password để trống", () => {

        cy.get(USERNAME_INPUT).type(VALID_USERNAME);

        cy.get(LOGIN_BUTTON).click();

        cy.url().should("include", "portal.ut.edu.vn");
    });

    // TC_LOGIN_07
    it("TC_LOGIN_07 - Username và Password đều trống", () => {

        cy.get(LOGIN_BUTTON).click();

        cy.url().should("include", "portal.ut.edu.vn");
    });

    // TC_LOGIN_08
    it("TC_LOGIN_08 - Sai Username", () => {

        cy.get(USERNAME_INPUT).type(INVALID_USERNAME);

        cy.get(PASSWORD_INPUT).type(VALID_PASSWORD);

        cy.get(LOGIN_BUTTON).click();

        cy.url().should("include", "portal.ut.edu.vn");
    });

    // TC_LOGIN_09
    it("TC_LOGIN_09 - Sai Password", () => {

        cy.get(USERNAME_INPUT).type(VALID_USERNAME);

        cy.get(PASSWORD_INPUT).type(INVALID_PASSWORD);

        cy.get(LOGIN_BUTTON).click();

        cy.url().should("include", "portal.ut.edu.vn");
    });

    // TC_LOGIN_10
    it("TC_LOGIN_10 - Đăng nhập thành công", () => {

        cy.get(USERNAME_INPUT).type(VALID_USERNAME);

        cy.get(PASSWORD_INPUT).type(VALID_PASSWORD);

        cy.get(LOGIN_BUTTON).click();

        cy.url().should("not.include", "/login");
    });

});
