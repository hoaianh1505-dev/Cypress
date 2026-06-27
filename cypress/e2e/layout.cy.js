describe("GUI Layout Testing", () => {

    const URL = "https://portal.ut.edu.vn/";
    const USERNAME_INPUT = 'input[name="username"]';
    const PASSWORD_INPUT = 'input[name="password"]';
    const LOGIN_BUTTON = 'button[type="submit"]';
    const LOGO = 'a[href="/dashboard"] img';

    beforeEach(() => {
        cy.visit(URL);
    });

    it("TC_LAYOUT_01 - Kiểm tra Logo hiển thị", () => {
        cy.get(LOGO).should("be.visible");
    });

    it("TC_LAYOUT_02 - Kiểm tra tiêu đề Đăng nhập hiển thị", () => {
        cy.contains("ĐĂNG NHẬP HỆ THỐNG").should("be.visible");
    });

    it("TC_LAYOUT_03 - Kiểm tra ô nhập Username hiển thị", () => {
        cy.get(USERNAME_INPUT).should("be.visible");
    });

    it("TC_LAYOUT_04 - Kiểm tra ô nhập Password hiển thị", () => {
        cy.get(PASSWORD_INPUT).should("be.visible");
    });

    it("TC_LAYOUT_05 - Kiểm tra nút Đăng nhập hiển thị", () => {
        cy.get(LOGIN_BUTTON).should("be.visible");
    });

    it("TC_LAYOUT_06 - Kiểm tra nút Quên mật khẩu hiển thị", () => {
        cy.contains("button", "Quên mật khẩu?").should("be.visible");
    });

    it("TC_LAYOUT_07 - Kiểm tra phần danh sách Tin tức/Thông báo hiển thị", () => {
        cy.get('[role="tablist"]').should("be.visible");
    });

    it("TC_LAYOUT_08 - Kiểm tra tab Thông báo chung hiển thị", () => {
        cy.get('[role="tab"]').contains("Thông báo chung").should("be.visible");
    });

    it("TC_LAYOUT_09 - Kiểm tra link Xem tất cả hiển thị", () => {
        cy.contains("Xem tất cả").should("be.visible");
    });

    it("TC_LAYOUT_10 - Kiểm tra chân trang/thông tin liên hệ hiển thị", () => {
        cy.get("body").should("be.visible");
    });

});